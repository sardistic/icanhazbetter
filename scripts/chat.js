(function () {
    'use strict';

    // ─── Shared utilities (duplicated from ichc-theme) ───────────────────────────

    function runInPageContext(source) {
        chrome.runtime.sendMessage({ type: 'ichc-exec', code: source }).catch(() => {});
    }

    const ogPreviewState = {
        cache: new Map(),
        inflight: new Map(),
        queue: [],
        active: 0,
        timer: null,
    };
    const OG_PREVIEW_MAX_CACHE = 100;
    const OG_PREVIEW_CONCURRENCY = 1;
    const OG_PREVIEW_DELAY = 300;

    function invokeNativeElementAction(element) {
        if (!element || !element.isConnected) { return; }

        const bridgeToken = `ichc-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        element.setAttribute('data-ichc-bridge', bridgeToken);

        const selector = `[data-ichc-bridge="${bridgeToken}"]`;
        const href = element.getAttribute('href') || '';
        const onclick = element.getAttribute('onclick') || '';

        runInPageContext(`
            const el = document.querySelector(${JSON.stringify(selector)});
            if (!el) { return; }

            try {
                ['mousedown', 'mouseup', 'click'].forEach(type => {
                    el.dispatchEvent(new MouseEvent(type, {
                        bubbles: true,
                        cancelable: true,
                        view: window,
                    }));
                });
            } catch (_) {}

            try {
                if (typeof el.click === 'function') { el.click(); }
            } catch (_) {}

            const nativeHref = ${JSON.stringify(href)};
            if (/^\s*javascript:/i.test(nativeHref)) {
                const js = nativeHref.replace(/^\s*javascript:\s*/i, '');
                try { Function(js).call(el); } catch (_) {
                    try { (0, eval)(js); } catch (_) {}
                }
            }

            const nativeOnclick = ${JSON.stringify(onclick)};
            if (nativeOnclick) {
                try { Function(nativeOnclick).call(el); } catch (_) {}
            }
        `);

        element.removeAttribute('data-ichc-bridge');
    }

    function normalizeText(value = '') {
        return value.replace(/\s+/g, ' ').trim().toLowerCase();
    }

    // ─── JS ──────────────────────────────────────────────────────────────────────

    document.addEventListener('DOMContentLoaded', () => {
        initChatScrollSync();

        // Emote ban/unban via event delegation
        document.addEventListener('click', e => {
            const banBtn = e.target.closest('.ichc-emote-ban-btn');
            if (banBtn) {
                e.stopPropagation();
                const wrap = banBtn.closest('.ichc-emote-wrap');
                if (!wrap) { return; }
                const { ichcEmoteUrl: url, ichcEmoteCode: code, ichcEmoteType: type } = wrap.dataset;
                _toggleEmoteDisabled(url, true);
                document.querySelectorAll(`#txt .ichc-emote-wrap[data-ichc-emote-url="${CSS.escape(url)}"]`).forEach(w => {
                    w.replaceWith(_makeEmoteLabel(url, code, type));
                });
                return;
            }
            const label = e.target.closest('.ichc-emote-disabled-label');
            if (label) {
                e.stopPropagation();
                const { ichcEmoteUrl: url, ichcEmoteCode: code, ichcEmoteType: type } = label.dataset;
                _toggleEmoteDisabled(url, false);
                document.querySelectorAll(`#txt .ichc-emote-disabled-label[data-ichc-emote-url="${CSS.escape(url)}"]`).forEach(lbl => {
                    lbl.replaceWith(_makeEmoteWrap(url, code, type, _buildMediaEl(url, type)));
                });
            }
        }, true);

        setInterval(() => {
            document.querySelectorAll('#txt .ichc-ts[data-ichc-ts-epoch]').forEach(el => {
                const epoch = parseInt(el.dataset.ichcTsEpoch, 10);
                if (!isNaN(epoch)) {
                    const next = _relativeTime(epoch);
                    if (el.textContent !== next) { el.textContent = next; }
                }
            });
        }, 5000);
    });

    // ── Chat ──────────────────────────────────────────────────────────────────────

    // `force` is for deliberate "take me to live" actions only (the jump-to-live
    // indicator, pressing Enter, the site's own resume control).
    //
    // Everything else must respect the reader's position. window.cR() does not merely
    // un-pause the site's chat — it also scrolls #txt to the bottom. Console tracing
    // showed cR() being invoked from our injected script over and over while the user
    // was scrolled up (writes like `2188 -> 8642` against a max of 2375), which is what
    // "it instantly drags it back down" was. It happened with no messages arriving
    // because these callers are driven by timers and the site's pause notice, not by
    // incoming chat.
    function resumeNativeChat(force = false) {
        if (!force) {
            // Two independent guards on purpose. The flag says what we believe; the
            // scroll position says what is actually true. Trusting the flag alone was
            // not enough — if anything leaves `auto` set while the reader is parked,
            // cR() fires and yanks them to live. Position cannot lie.
            if (!chatScrollState.auto) { return; }
            const t = getChatScrollTarget();
            if (t && !isNearChatBottom(t, 56)) { return; }
        }
        chatScrollState.sitePaused = false;
        chatScrollState.nativePaused = false;
        runInPageContext(`
            if (typeof window.cR === 'function') {
                window.cR();
            }
            if (typeof window.resumeChatScroll === 'function') {
                window.resumeChatScroll();
            }
        `);

        const notice = getChatPauseNotice();
        const noticeTarget = notice?.querySelector('a') || notice || null;

        if (noticeTarget) {
            invokeNativeElementAction(noticeTarget);
        }

        hideChatPauseNotice();
    }

    function pauseNativeChat() {
        // Guarded on its own flag rather than chatScrollState.nativePaused, which other
        // code assigns directly — a stray assignment used to make this a permanent no-op.
        if (chatScrollState.sitePaused) { return; }
        chatScrollState.sitePaused = true;
        chatScrollState.nativePaused = true;
        runInPageContext(`
            if (typeof window.cP === 'function') {
                window.cP();
            }
            if (typeof window.pauseChatScroll === 'function') {
                window.pauseChatScroll();
            }
        `);
    }

    function extractInlineColor(node) {
        if (!node || node.nodeType !== 1) { return ''; }

        const style = node.getAttribute('style') || '';
        const styleMatch = style.match(/(?:^|;)\s*color\s*:\s*([^;]+)/i);
        if (styleMatch?.[1]) { return styleMatch[1].replace(/\s*!important\s*$/i, '').trim(); }

        const colorAttr = node.getAttribute('color');
        if (colorAttr) { return colorAttr.trim(); }

        return '';
    }

    function parseColorChannels(value) {
        const color = (value || '').trim().toLowerCase();
        if (!color) { return null; }
        if (color === 'black') { return [0, 0, 0]; }

        const hex = color.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
        if (hex) {
            const raw = hex[1];
            if (raw.length === 3) {
                return raw.split('').map(part => Number.parseInt(part + part, 16));
            }
            return [
                Number.parseInt(raw.slice(0, 2), 16),
                Number.parseInt(raw.slice(2, 4), 16),
                Number.parseInt(raw.slice(4, 6), 16),
            ];
        }

        const rgb = color.match(/^rgba?\(([^)]+)\)$/i);
        if (rgb) {
            const parts = rgb[1].split(',').map(part => Number.parseFloat(part.trim()));
            if (parts.length >= 3 && parts.slice(0, 3).every(Number.isFinite)) {
                return parts.slice(0, 3);
            }
        }

        return null;
    }

    function isDarkChatColor(value) {
        const channels = parseColorChannels(value);
        if (!channels) { return false; }
        const [r, g, b] = channels;
        const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        return luminance < 0.28;
    }

    function isThemeManagedChatColor(value) {
        const channels = parseColorChannels(value);
        if (!channels) { return false; }

        const known = [
            [125, 211, 252],
            [219, 234, 254],
            [213, 226, 239],
            [230, 237, 243],
        ];

        return known.some(([r, g, b]) =>
            Math.abs(channels[0] - r) <= 10 &&
            Math.abs(channels[1] - g) <= 10 &&
            Math.abs(channels[2] - b) <= 10,
        );
    }

    function toRgbColor(value) {
        const channels = parseColorChannels(value);
        if (!channels) { return value || ''; }
        return `rgb(${Math.round(channels[0])}, ${Math.round(channels[1])}, ${Math.round(channels[2])})`;
    }

    function makeReadableChatColor(value) {
        const channels = parseColorChannels(value);
        if (!channels) { return value || ''; }

        let [r, g, b] = channels;
        const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        if (luminance >= 0.4) {
            return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
        }

        const mix = Math.min(0.76, 0.2 + ((0.4 - luminance) / 0.4) * 0.48);
        r = Math.round(r + (255 - r) * mix);
        g = Math.round(g + (255 - g) * mix);
        b = Math.round(b + (255 - b) * mix);
        return `rgb(${r}, ${g}, ${b})`;
    }

    // Counterpart of the above for light backgrounds.
    //
    // This replaced a flat "if it isn't already dark, use #1a1d23" rule, which threw the
    // colour away entirely — every bright nick collapsed to the same near-black and the
    // per-user colour looked broken in light mode.
    //
    // It targets a CONTRAST RATIO rather than a luminance threshold, which is the part
    // worth keeping. A threshold cannot promise readability: mid-luminance colours sail
    // under it untouched and still land near 2.5:1 on a cream row (#3ba55c green was the
    // clearest offender). Scaling the channels toward black preserves the hue, and
    // luminance falls monotonically as the factor shrinks, so a short binary search
    // finds the lightest factor that still clears the target.
    //
    // Measured against the DARKEST chat row any light palette uses, not against white.
    // For dark text, white is the easiest possible backdrop — clearing 4.5 there leaves
    // roughly 3.8 on a cream row, i.e. the wrong way round. rgb(206,210,216) is the
    // Light theme's composited row (its translucent row over #dde0e4), which is darker
    // than Rosé Pine Dawn's, so passing here passes on every light theme.
    const LIGHT_CONTRAST_TARGET = 4.5;
    const LIGHT_REF_BG = [206, 210, 216];
    function makeReadableOnLightChatColor(value) {
        const channels = parseColorChannels(value);
        if (!channels) { return value || ''; }

        const [r0, g0, b0] = channels;
        const chan = c => {
            const s = c / 255;
            return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
        };
        const lum = (r, g, b) => 0.2126 * chan(r) + 0.7152 * chan(g) + 0.0722 * chan(b);
        const bgL = lum(LIGHT_REF_BG[0], LIGHT_REF_BG[1], LIGHT_REF_BG[2]);
        const contrast = (r, g, b) => {
            const fgL = lum(r, g, b);
            return (Math.max(fgL, bgL) + 0.05) / (Math.min(fgL, bgL) + 0.05);
        };

        if (contrast(r0, g0, b0) >= LIGHT_CONTRAST_TARGET) {
            return `rgb(${Math.round(r0)}, ${Math.round(g0)}, ${Math.round(b0)})`;
        }
        // Luminance falls monotonically with the factor, so binary search finds the
        // lightest scaling that still clears the target.
        let lo = 0, hi = 1;
        for (let i = 0; i < 16; i++) {
            const mid = (lo + hi) / 2;
            if (contrast(r0 * mid, g0 * mid, b0 * mid) >= LIGHT_CONTRAST_TARGET) { lo = mid; }
            else { hi = mid; }
        }
        return `rgb(${Math.round(r0 * lo)}, ${Math.round(g0 * lo)}, ${Math.round(b0 * lo)})`;
    }

    // ── Per-user text colour registry ─────────────────────────────────────────
    // Each user picks their own text colour on the site, and their messages carry it
    // inline — which is the only place it is exposed, so it is harvested from chat as
    // they speak. modernize.js consumes this to colour userlist names, keeping one
    // identity colour per person across both panels.
    // Content scripts of the same extension share one isolated world, so `window` is
    // a valid channel between chat.js and modernize.js (ichc-pm-alert already relies
    // on this). localStorage carries it across reloads so a name is coloured before
    // its owner says anything.
    const NICK_COLOR_KEY = 'ichc_nick_colors';
    const NICK_COLOR_MAX = 400;
    const nickColors = window.__ichcNickColors || (window.__ichcNickColors = new Map());

    (function _loadNickColors() {
        if (nickColors.size) { return; }
        try {
            const raw = JSON.parse(localStorage.getItem(NICK_COLOR_KEY) || '{}');
            Object.keys(raw).forEach(k => nickColors.set(k, raw[k]));
        } catch (_) {}
    })();

    let _nickColorSaveTimer = null;
    let _nickColorDirty = false;

    function _persistNickColors() {
        _nickColorSaveTimer = null;
        if (!_nickColorDirty) { return; }
        _nickColorDirty = false;
        try {
            // Keep the newest entries only — Map preserves insertion order
            const entries = [...nickColors.entries()].slice(-NICK_COLOR_MAX);
            if (entries.length !== nickColors.size) {
                nickColors.clear();
                entries.forEach(([k, v]) => nickColors.set(k, v));
            }
            localStorage.setItem(NICK_COLOR_KEY, JSON.stringify(Object.fromEntries(entries)));
        } catch (_) {}
        window.dispatchEvent(new CustomEvent('ichc-nick-colors-updated'));
    }

    // `raw` is the colour exactly as the site rendered it. Readability is each
    // consumer's job, since chat and the userlist sit on different backgrounds.
    function recordNickColor(name, raw) {
        const key = (name || '').trim().toLowerCase();
        if (!key || !raw) { return; }
        if (isThemeManagedChatColor(raw)) { return; }   // our own styling, not theirs
        if (nickColors.get(key) === raw) { return; }
        nickColors.delete(key);                          // re-insert to mark as newest
        nickColors.set(key, raw);
        _nickColorDirty = true;
        if (!_nickColorSaveTimer) { _nickColorSaveTimer = setTimeout(_persistNickColors, 1200); }
    }

    // Exposed so modernize.js can record the local user's colour the moment they pick
    // it in the site's picker, instead of waiting for them to post a message.
    window.__ichcRecordNickColor = recordNickColor;

    function extractChatNickColor(anchor) {
        if (!anchor) { return ''; }

        const candidates = [
            anchor,
            anchor.querySelector('[style*="color"], [color]'),
            anchor.parentElement?.matches?.('font, span, b, strong') ? anchor.parentElement : null,
            anchor.closest('font[color], span[style*="color"], b[style*="color"], strong[style*="color"]'),
        ].filter(Boolean);

        for (const candidate of candidates) {
            const color = extractInlineColor(candidate);
            if (color) { return color; }
        }

        const computedCandidates = [
            window.getComputedStyle(anchor).color,
            anchor.parentElement ? window.getComputedStyle(anchor.parentElement).color : '',
        ];

        for (const color of computedCandidates) {
            if (color && !isThemeManagedChatColor(color)) {
                return color;
            }
        }

        return '';
    }

    function isLikelyChatNickAnchor(anchor) {
        if (!anchor || anchor.nodeType !== 1) { return false; }
        if (anchor.matches('.room_footer_links, #ichc-room-links a, #ichc-site-footer a')) { return false; }
        if (anchor.matches('a.userlink')) { return true; }

        const hookText = `${anchor.getAttribute('href') || ''} ${anchor.getAttribute('onclick') || ''}`.toLowerCase();
        if (/javascript:/.test(hookText) && /(user|profile|karma|pu\(|u\(|chatuser)/.test(hookText)) {
            return true;
        }

        const rowText = normalizeText(anchor.closest('tr, table, div, p, li, td, span')?.textContent || '');
        return /has joined|has left|is now broadcasting|stopped broadcasting|rebroadcasting|private message/.test(rowText);
    }

    function isCompactChatEventText(text = '') {
        const value = normalizeText(text);
        if (!value) { return false; }

        return /has joined(?: the room)?|joined the room|has left(?: the room)?|left the room|is now broadcasting|stopped broadcasting|is no longer broadcasting|rebroadcasting|has gone idle|went idle|is idle|is active again|cammed down for/.test(value);
    }

    function getChatRowNodes(log) {
        if (!log) { return []; }

        const rows = new Set();
        [...log.children].forEach(node => {
            if (node instanceof HTMLElement && node.matches('table, div, p, ul')) {
                rows.add(node);
            }
        });
        log.querySelectorAll('.line').forEach(node => rows.add(node));
        return [...rows];
    }

    function getScopedChatElements(scope, selector) {
        if (!scope || !(scope instanceof Element)) { return []; }
        const found = [];
        if (scope.matches(selector)) {
            found.push(scope);
        }
        scope.querySelectorAll(selector).forEach(node => found.push(node));
        return found;
    }

    function getChatRowsInScope(scope) {
        const log = getChatLog();
        if (!log) { return []; }
        if (!scope || scope === log) { return getChatRowNodes(log); }
        if (!(scope instanceof Element)) { return []; }

        const rows = new Set();
        if (scope.matches('table, div, p, ul, .line') && log.contains(scope)) {
            rows.add(scope);
        }
        scope.querySelectorAll('table, div, p, ul, .line').forEach(node => {
            if (log.contains(node)) {
                rows.add(node);
            }
        });
        return [...rows];
    }

    function isLightTheme() {
        // Polarity, not a specific palette: `ichc-theme-is-light` is set by
        // applyTheme() in modernize.js for every light-background theme. The
        // legacy class is still checked so this holds if that marker is ever
        // missed on an early paint.
        const cl = document.documentElement.classList;
        return cl.contains('ichc-theme-is-light') || cl.contains('ichc-light-theme');
    }

    function applyChatTheme(scope = getChatLog()) {
        const log = getChatLog();
        const root = scope || log;
        if (!log || !root || !(root instanceof Element)) { return; }

        const lightMode = isLightTheme();

        getScopedChatElements(root, 'a').forEach(anchor => {
            if (!isLikelyChatNickAnchor(anchor)) { return; }
            const color = extractChatNickColor(anchor);
            // Harvest before any readability adjustment — store what the user chose
            if (color) { recordNickColor(anchor.textContent, color); }
            // First time we style this anchor is the first time we have seen the
            // message, so it doubles as "spoke just now" for ranking.
            if (anchor.dataset.ichcChatNick !== '1') { recordSpoke(anchor.textContent); }
            let resolved;
            if (lightMode) {
                // Darken toward black while keeping the hue, rather than discarding the
                // user's colour for a flat near-black. Falls back to the theme's own
                // text colour so this reads correctly on every light palette, not just
                // the original light theme.
                resolved = color ? makeReadableOnLightChatColor(color) : 'var(--ichc-text-bright)';
            } else {
                resolved = color ? makeReadableChatColor(color) : '#dbeafe';
            }
            anchor.dataset.ichcChatNick = '1';
            anchor.style.setProperty('--ichc-chat-name-color', resolved, 'important');
            anchor.style.setProperty('color', resolved, 'important');
            anchor.style.setProperty('font-weight', '700', 'important');

            if (!lightMode) {
                const parent = anchor.parentElement;
                if (parent) {
                    const parentColor = extractInlineColor(parent);
                    if (parentColor && isDarkChatColor(parentColor)) {
                        parent.style.setProperty('color', '#d5e2ef', 'important');
                    }
                }
            }
        });

        getScopedChatElements(root, 'font[color], [style*="color"]').forEach(node => {
            if (node.matches?.('a.userlink')) { return; }
            const color = extractInlineColor(node);
            if (lightMode) {
                // In light mode: light-colored text → force dark so it's readable.
                if (color && !isDarkChatColor(color)) {
                    node.style.setProperty('color', '#111214', 'important');
                }
            } else {
                if (color && isDarkChatColor(color)) {
                    node.style.setProperty('color', '#d5e2ef', 'important');
                }
            }
        });

        getChatRowsInScope(root).forEach(row => {
            const isEvent = isCompactChatEventText(row.textContent || '');
            row.classList.toggle('ichc-chat-event', isEvent);
            const rowNorm = normalizeText(row.textContent || '');
            const isLive = /\bis now broadcasting\b|\brebroadcasting\b/.test(rowNorm);
            const isStop = /\bstopped broadcasting\b|\bis no longer broadcasting\b/.test(rowNorm);
            row.classList.toggle('ichc-bcast-event', isLive || isStop);
            row.classList.toggle('ichc-bcast-live', isLive);
            row.classList.toggle('ichc-bcast-stop', isStop);
            const isSacrifice = /\bcammed down for\b/.test(rowNorm);
            row.classList.toggle('ichc-cam-sacrifice', isSacrifice);
            // Timestamps. Two bugs used to leave a raw clock time sitting inline in the
            // middle of a message, which also threw off the float placement of the
            // timestamp on the following row:
            //
            //  a) the "already processed" flag was set BEFORE scanning, so a row whose
            //     time had not been inserted yet (the site builds some rows in pieces)
            //     was marked done forever and never got the .ichc-ts class.
            //  b) a time that was a bare text node directly under the row was skipped
            //     outright by the `parent !== row` guard, so it stayed as plain text.
            //
            // Now the flag is only set once a timestamp is actually found, retries are
            // bounded so rows that genuinely have no time are not rescanned forever, and
            // a bare text node gets wrapped in our own span.
            const _tsTries = parseInt(row.dataset.ichcTsTries || '0', 10);
            if (!row.dataset.ichcTsHidden && _tsTries < 6) {
                let tsFound = false;
                const tsPattern = /^\s*[\[(]?\d{1,2}:\d{2}(?::\d{2})?(?:\s*[ap]m)?[\])]?\s*$/i;
                // 1. Walk text nodes — match bare H:MM or [H:MM:SS] style timestamps
                const walker = document.createTreeWalker(row, NodeFilter.SHOW_TEXT);
                const tsTextNodes = [];
                let tnode;
                while ((tnode = walker.nextNode())) {
                    if (tsPattern.test(tnode.textContent)) { tsTextNodes.push(tnode); }
                }
                tsTextNodes.forEach(node => {
                    let parent = node.parentElement;
                    if (parent === row) {
                        // Bare text node — give it a wrapper we can style and position
                        const span = document.createElement('span');
                        row.insertBefore(span, node);
                        span.appendChild(node);
                        parent = span;
                    }
                    if (!parent) { return; }
                    parent.classList.add('ichc-ts');
                    tsFound = true;
                    const epoch = _parseTimestamp(node.textContent);
                    if (epoch !== null) {
                        parent.dataset.ichcTsEpoch = String(epoch);
                        parent.textContent = _relativeTime(epoch);
                    }
                });
                // 2. <small> tags are a common timestamp wrapper in icanhazchat
                row.querySelectorAll('small').forEach(el => {
                    el.classList.add('ichc-ts');
                    tsFound = true;
                    if (tsPattern.test(el.textContent)) {
                        const epoch = _parseTimestamp(el.textContent);
                        if (epoch !== null) {
                            el.dataset.ichcTsEpoch = String(epoch);
                            el.textContent = _relativeTime(epoch);
                        }
                    }
                });
                // 3. Table cells whose entire text looks like a clock time; move to end of row so it sits on the right
                row.querySelectorAll('td').forEach(td => {
                    if (!td.querySelector('a') && tsPattern.test(td.textContent)) {
                        td.classList.add('ichc-ts');
                        tsFound = true;
                        const epoch = _parseTimestamp(td.textContent);
                        if (epoch !== null) {
                            td.dataset.ichcTsEpoch = String(epoch);
                            td.textContent = _relativeTime(epoch);
                        }
                        const tr = td.parentElement;
                        if (tr && tr.tagName === 'TR' && tr.lastElementChild !== td) {
                            tr.appendChild(td);
                        }
                    }
                });

                // A right-floated box is placed on the line it is encountered on, not
                // necessarily the first one — so a timestamp appearing after the message
                // text drops to a lower line and reads as sitting inside the message.
                // Hoisting it to the front of the row pins it to the top right.
                const tsEl = row.querySelector(':scope > .ichc-ts:not(td)');
                if (tsEl && row.firstChild !== tsEl) { row.insertBefore(tsEl, row.firstChild); }

                if (tsFound) {
                    row.dataset.ichcTsHidden = '1';
                    delete row.dataset.ichcTsTries;
                } else {
                    // Nothing to find yet — allow a few more passes as the row fills in
                    row.dataset.ichcTsTries = String(_tsTries + 1);
                }
            }
        });

        // Strip inline colors stamped by the font-color loop above so CSS hues on
        // .ichc-bcast-live / .ichc-bcast-stop are not blocked by !important inline styles.
        getChatRowsInScope(root).forEach(row => {
            if (!row.classList.contains('ichc-bcast-live') && !row.classList.contains('ichc-bcast-stop')) { return; }
            row.querySelectorAll('font[color], [style*="color"]').forEach(el => {
                el.style.removeProperty('color');
                el.removeAttribute('color');
            });
        });

        // Embed image links as inline images, otherwise attach a compact OG preview.
        getScopedChatElements(root, 'a').forEach(anchor => {
            if (anchor.dataset.ichcImgEmbed) { return; }
            if (anchor.closest('.ichc-og-card')) { return; }

            const href = (anchor.getAttribute('href') || '').trim();
            const isJsHref = !href || /^javascript:/i.test(href);

            // Try href first, then visible text (handles javascript: hrefs and redirect wrappers)
            const media = resolveInlineMedia(href) || resolveInlineMedia(anchor.textContent || '');
            if (!media) {
                anchor.dataset.ichcImgEmbed = '1';
                // For OG preview use the real URL: prefer href if it's a proper URL, else try text
                const previewUrl = isJsHref ? (anchor.textContent || '').trim() : href;
                maybeAttachOgPreview(anchor, previewUrl);
                return;
            }

            anchor.dataset.ichcImgEmbed = '1';
            const emoteUrl = media.url;
            const emoteCode = _emoteCodeFromAnchorOrUrl(anchor, emoteUrl);
            const emoteType = media.type;
            const emoteDisabled = _getDisabledEmotes().has(emoteUrl);
            const insertEl = emoteDisabled
                ? _makeEmoteLabel(emoteUrl, emoteCode, emoteType)
                : _makeEmoteWrap(emoteUrl, emoteCode, emoteType, _buildMediaEl(emoteUrl, emoteType));

            anchor.replaceWith(insertEl);
        });

        // Wrap native site emote <img> elements (e.g. id="emot-1") so the × block button appears
        _wrapNativeSiteEmotes(root);

        // Also embed image URLs that weren't wrapped in <a> tags by the site
        _embedPlainImageUrls(root);

        // Full-log call (initial paint): run immediately.
        // Per-row call (new message): defer to next frame so a burst of messages
        // only triggers one bounded tail regroup instead of rescanning every row.
        if (root === log) {
            reGroupChatRows(log);
        } else {
            _scheduleReGroup();
        }
    }

    let _reGroupRAF = null;
    let _reGroupPending = 0;
    function _scheduleReGroup() {
        _reGroupPending++;
        if (_reGroupRAF !== null) { return; }
        _reGroupRAF = requestAnimationFrame(() => {
            _reGroupRAF = null;
            // Two rows of context on each side cover the only group boundaries a
            // newly-appended burst can change. Keep a six-row floor for DOM noise
            // that schedules regrouping without adding a direct chat child.
            const tailCount = Math.max(6, _reGroupPending + 2);
            _reGroupPending = 0;
            reGroupChatRows(getChatLog(), tailCount);
        });
    }

    function _updateGroupNickWrap(row, hide) {
        const existing = row.querySelector('.ichc-nick-repeat');
        if (hide && !existing) {
            const anchor = row.querySelector('a.userlink');
            if (!anchor) { return; }
            const wrap = document.createElement('span');
            wrap.className = 'ichc-nick-repeat';
            anchor.parentNode.insertBefore(wrap, anchor);
            wrap.appendChild(anchor);
            const after = wrap.nextSibling;
            if (after?.nodeType === Node.TEXT_NODE && /^\s*:/.test(after.textContent)) {
                wrap.appendChild(after);
            }
        } else if (!hide && existing) {
            const parent = existing.parentNode;
            if (parent) {
                while (existing.firstChild) { parent.insertBefore(existing.firstChild, existing); }
                existing.remove();
            }
        }
    }

    // ── Reply button + local reply preview (client-side only) ────────────────
    // Adds a hover ↩ button to each chat row. Clicking inserts "@nick " into the
    // native message input (#txtMsg) and shows a local "Replying to…" bar above
    // the input. Nothing is encoded into the sent message — only you see this.
    let _replyContext = null;        // { nick, snippet }
    let _replyInputWired = false;

    function _getMsgInput() {
        return document.getElementById('txtMsg');
    }

    function _rowReplySnippet(row, nick) {
        let text = (row.textContent || '').replace(/\s+/g, ' ').trim();
        // Strip a leading "nick" / "nick:" prefix so the snippet is just the message.
        const lower = text.toLowerCase();
        const idx = lower.indexOf(nick.toLowerCase());
        if (idx !== -1 && idx < 40) {
            text = text.slice(idx + nick.length).replace(/^[\s:]+/, '');
        }
        return text.slice(0, 80);
    }

    function _ensureReplyButton(row, nick) {
        if (row.querySelector(':scope > .ichc-reply-btn')) { return; }
        const btn = document.createElement('button');
        btn.className = 'ichc-reply-btn';
        btn.title = 'Reply to ' + nick;
        btn.textContent = '↩';
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            _startReply(nick, _rowReplySnippet(row, nick));
        });
        // Anchor the absolutely-positioned button to the row.
        row.style.position = row.style.position || 'relative';
        row.appendChild(btn);
    }

    function _wireReplyInput(input) {
        if (_replyInputWired || !input) { return; }
        _replyInputWired = true;
        // The site sends on Enter; clear our local reply context once it's sent.
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) { setTimeout(_clearReply, 0); }
        });
    }

    function _startReply(nick, snippet) {
        _replyContext = { nick, snippet };
        const input = _getMsgInput();
        if (input) {
            _wireReplyInput(input);
            const mention = '@' + nick + ' ';
            const start = input.selectionStart ?? input.value.length;
            const end = input.selectionEnd ?? input.value.length;
            const v = input.value;
            input.value = v.slice(0, start) + mention + v.slice(end);
            const pos = start + mention.length;
            input.focus();
            try { input.setSelectionRange(pos, pos); } catch (_) {}
        }
        _renderReplyBar();
    }

    function _clearReply() {
        _replyContext = null;
        _renderReplyBar();
    }

    function _renderReplyBar() {
        let bar = document.getElementById('ichc-reply-bar');
        const input = _getMsgInput();
        if (!_replyContext || !input) {
            if (bar) { bar.remove(); }
            return;
        }
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'ichc-reply-bar';
            input.parentNode.insertBefore(bar, input);
        }
        bar.textContent = '';

        const label = document.createElement('span');
        label.className = 'ichc-reply-bar-label';
        const who = document.createElement('strong');
        who.textContent = '@' + _replyContext.nick;
        label.append(document.createTextNode('↩ Replying to '), who);
        if (_replyContext.snippet) {
            const snip = document.createElement('span');
            snip.className = 'ichc-reply-bar-snippet';
            snip.textContent = ' — ' + _replyContext.snippet;
            label.appendChild(snip);
        }

        const close = document.createElement('button');
        close.className = 'ichc-reply-bar-close';
        close.textContent = '×';
        close.title = 'Cancel reply';
        close.addEventListener('click', _clearReply);

        bar.append(label, close);
    }

    function reGroupChatRows(log, tailCount = 0) {
        if (!log) { return; }
        const allRows = [...log.children].filter(node =>
            node instanceof HTMLElement &&
            node.matches('table, div, p, ul') &&
            !node.dataset.ichcEventProcessed
        );

        // Initial paint/theme changes still process the whole log. Normal message
        // arrival only changes grouping at the tail, so keep old rows untouched and
        // avoid thousands of querySelector/class operations on every new message.
        const start = tailCount > 0 ? Math.max(0, allRows.length - tailCount) : 0;
        const rows = allRows.slice(start);

        const isBreak = row =>
            row.classList.contains('ichc-chat-event') ||
            row.classList.contains('ichc-bcast-event') ||
            row.classList.contains('ichc-event-collector');
        const explicitNick = row => {
            const nickEl = row.querySelector('a.userlink, a[data-ichc-chat-nick]');
            return nickEl ? nickEl.textContent.trim().toLowerCase() : '';
        };

        // Seed inheritance for a tail-only pass. Native continuation rows can omit
        // the nick anchor, so walk back only until the nearest explicit nick/break.
        let priorNick = null;
        if (start > 0) {
            for (let i = start - 1; i >= 0; i--) {
                if (isBreak(allRows[i])) { break; }
                const nick = explicitNick(allRows[i]);
                if (nick) { priorNick = nick; break; }
            }
        }

        let lastNick = priorNick;
        const nickOf = new Map();
        rows.forEach(row => {
            if (isBreak(row)) {
                lastNick = null;
                nickOf.set(row, null);
                return;
            }
            const nick = explicitNick(row);
            if (nick) { lastNick = nick; }
            nickOf.set(row, lastNick);
        });

        rows.forEach(row => {
            row.classList.remove('ichc-chat-group-first', 'ichc-chat-group-mid', 'ichc-chat-group-last');
        });

        rows.forEach((row, i) => {
            const nick = nickOf.get(row);
            if (!nick) {
                _updateGroupNickWrap(row, false);
                return;
            }
            _ensureReplyButton(row, nick);
            const prevNick = i > 0 ? nickOf.get(rows[i - 1]) : priorNick;
            const nextNick = i < rows.length - 1 ? nickOf.get(rows[i + 1]) : null;
            const sameAsPrev = prevNick === nick;
            const sameAsNext = nextNick === nick;
            if (sameAsPrev && sameAsNext) { row.classList.add('ichc-chat-group-mid'); }
            else if (sameAsPrev) { row.classList.add('ichc-chat-group-last'); }
            else if (sameAsNext) { row.classList.add('ichc-chat-group-first'); }
            _updateGroupNickWrap(row, sameAsPrev);
        });
    }

    const _PLAIN_IMG_RE = /https?:\/\/[^\s<>"']+\.(?:jpe?g|gif|png|webp)(?:\?[^\s<>"']*)?/gi;

    function resolveInlineMedia(value = '') {
        const raw = String(value || '').trim().replace(/[)\].,!?]+$/g, '');
        if (!raw) { return null; }

        let url;
        try {
            url = new URL(raw, window.location.href);
        } catch (_) {
            return null;
        }
        if (!/^https?:$/.test(url.protocol)) { return null; }

        const href = url.href;
        const path = url.pathname;
        const imgurPage = href.match(/^https?:\/\/(?:www\.)?imgur\.com\/([a-zA-Z0-9]+)\/?(?:\?[^#]*)?$/i);
        const imgurDirect = href.match(/^https?:\/\/i\.imgur\.com\/([a-zA-Z0-9]+)(\.[a-z0-9]+)?(?:\?[^#]*)?$/i);

        if (imgurPage) {
            return { url: `https://i.imgur.com/${imgurPage[1]}.jpg`, type: 'img' };
        }
        if (imgurDirect) {
            const ext = (imgurDirect[2] || '').toLowerCase();
            if (ext === '.gifv') {
                return { url: `https://i.imgur.com/${imgurDirect[1]}.mp4`, type: 'video' };
            }
            if (!ext) {
                return { url: `https://i.imgur.com/${imgurDirect[1]}.jpg`, type: 'img' };
            }
        }

        if (/\.(mp4|webm|mov)(?:$|\?)/i.test(path)) {
            return { url: href, type: 'video' };
        }
        if (/\.(jpe?g|gif|png|webp|avif)(?:$|\?)/i.test(path)) {
            return { url: href, type: 'img' };
        }
        return null;
    }

    function normalizeOgUrl(href) {
        try {
            const url = new URL(href, window.location.href);
            if (!/^https?:$/.test(url.protocol)) { return ''; }
            url.hash = '';
            return url.href;
        } catch (_) {
            return '';
        }
    }

    function shouldPreviewLink(anchor, href) {
        if (!anchor || anchor.matches('a.userlink, [data-ichc-chat-nick="1"]')) { return false; }
        if (anchor.closest('#ichc-userlist, #ichc-topbar, #ichc-room-links, .chat_button')) { return false; }
        const url = normalizeOgUrl(href);
        if (!url) { return false; }
        if (/\.(jpe?g|gif|png|webp|mp4|webm)(\?[^#]*)?$/i.test(url)) { return false; }
        try {
            const parsed = new URL(url);
            if (/^(www\.)?icanhazchat\.com$/i.test(parsed.hostname) || parsed.hostname === 'internet.wtf') { return false; }
        } catch (_) {
            return false;
        }
        return true;
    }

    function compactText(value = '', limit = 180) {
        const text = value.replace(/\s+/g, ' ').trim();
        return text.length > limit ? `${text.slice(0, limit - 1).trim()}…` : text;
    }

    function getMetaContent(doc, selectors) {
        for (const selector of selectors) {
            const value = doc.querySelector(selector)?.getAttribute('content') ||
                doc.querySelector(selector)?.getAttribute('href') ||
                '';
            if (value.trim()) { return value.trim(); }
        }
        return '';
    }

    function parseOgPreview(payload, sourceUrl) {
        if (!payload?.ok || !payload.html) { return null; }
        const baseUrl = payload.finalUrl || sourceUrl;
        let doc;
        try {
            doc = new DOMParser().parseFromString(payload.html, 'text/html');
        } catch (_) {
            return null;
        }

        const title = compactText(getMetaContent(doc, [
            'meta[property="og:title"]',
            'meta[name="twitter:title"]',
        ]) || doc.querySelector('title')?.textContent || '', 96);
        const description = compactText(getMetaContent(doc, [
            'meta[property="og:description"]',
            'meta[name="twitter:description"]',
            'meta[name="description"]',
        ]), 180);
        const imageRaw = getMetaContent(doc, [
            'meta[property="og:image:secure_url"]',
            'meta[property="og:image"]',
            'meta[name="twitter:image"]',
            'link[rel~="image_src"]',
        ]);

        let image = '';
        if (imageRaw) {
            try { image = new URL(imageRaw, baseUrl).href; } catch (_) {}
        }

        let site = compactText(getMetaContent(doc, ['meta[property="og:site_name"]']), 48);
        if (!site) {
            try { site = new URL(baseUrl).hostname.replace(/^www\./i, ''); } catch (_) {}
        }

        if (!title && !description && !image) { return null; }
        return { title, description, image, site, url: baseUrl };
    }

    function rememberOgPreview(url, preview) {
        if (ogPreviewState.cache.size >= OG_PREVIEW_MAX_CACHE && !ogPreviewState.cache.has(url)) {
            const drop = Math.ceil(OG_PREVIEW_MAX_CACHE / 4);
            let count = 0;
            for (const key of ogPreviewState.cache.keys()) {
                ogPreviewState.cache.delete(key);
                if (++count >= drop) { break; }
            }
        }
        ogPreviewState.cache.set(url, preview);
    }

    function scheduleOgQueue() {
        if (ogPreviewState.timer) { return; }
        ogPreviewState.timer = window.setTimeout(processOgQueue, OG_PREVIEW_DELAY);
    }

    function processOgQueue() {
        ogPreviewState.timer = null;
        while (ogPreviewState.active < OG_PREVIEW_CONCURRENCY && ogPreviewState.queue.length) {
            const job = ogPreviewState.queue.shift();
            ogPreviewState.active++;
            job().finally(() => {
                ogPreviewState.active = Math.max(0, ogPreviewState.active - 1);
                if (ogPreviewState.queue.length) { scheduleOgQueue(); }
            });
        }
    }

    function enqueueOgFetch(job) {
        const request = new Promise(resolve => {
            ogPreviewState.queue.push(() => job().then(resolve, () => resolve(null)));
        });
        scheduleOgQueue();
        return request;
    }

    function fetchOgPreview(url) {
        if (ogPreviewState.cache.has(url)) { return Promise.resolve(ogPreviewState.cache.get(url)); }
        if (ogPreviewState.inflight.has(url)) { return ogPreviewState.inflight.get(url); }

        const request = enqueueOgFetch(() =>
            chrome.runtime.sendMessage({ type: 'ichc-og-fetch', url })
                .then(payload => parseOgPreview(payload, url))
                .catch(() => null)
        ).then(preview => {
            rememberOgPreview(url, preview);
            ogPreviewState.inflight.delete(url);
            return preview;
        });
        ogPreviewState.inflight.set(url, request);
        return request;
    }

    function buildOgCard(preview, fallbackUrl) {
        if (!preview) { return null; }
        const card = document.createElement('a');
        card.className = 'ichc-og-card';
        card.href = preview.url || fallbackUrl;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';

        if (preview.image) {
            const img = document.createElement('img');
            img.className = 'ichc-og-image';
            img.src = preview.image;
            img.alt = '';
            img.loading = 'lazy';
            img.addEventListener('error', () => img.remove(), { once: true });
            card.appendChild(img);
        }

        const body = document.createElement('span');
        body.className = 'ichc-og-body';
        const site = document.createElement('span');
        site.className = 'ichc-og-site';
        site.textContent = preview.site || '';
        const title = document.createElement('span');
        title.className = 'ichc-og-title';
        title.textContent = preview.title || preview.url || fallbackUrl;
        const desc = document.createElement('span');
        desc.className = 'ichc-og-desc';
        desc.textContent = preview.description || '';
        body.appendChild(site);
        body.appendChild(title);
        if (preview.description) { body.appendChild(desc); }
        card.appendChild(body);
        return card;
    }

    function maybeAttachOgPreview(anchor, href) {
        if (!shouldPreviewLink(anchor, href)) { return; }
        const url = normalizeOgUrl(href);
        if (!url) { return; }
        const row = anchor.closest('table, div, p, ul, .line') || anchor.parentElement;
        if (row?.querySelector('.ichc-og-card')) { return; }

        fetchOgPreview(url).then(preview => {
            if (!preview || !anchor.isConnected || anchor.dataset.ichcOgAttached === '1') { return; }
            const card = buildOgCard(preview, url);
            if (!card) { return; }
            anchor.dataset.ichcOgAttached = '1';

            // Insert after the full chat row in #txt for clean placement below the message
            const log = getChatLog();
            let insertParent = anchor.parentNode;
            let insertBefore = anchor.nextSibling;
            if (log && anchor.parentNode !== log) {
                let node = anchor;
                while (node.parentElement && node.parentElement !== log) {
                    node = node.parentElement;
                }
                if (node.parentElement === log) {
                    insertParent = log;
                    insertBefore = node.nextSibling;
                }
            }
            insertParent?.insertBefore(card, insertBefore || null);
        });
    }

    function _embedPlainImageUrls(scope) {
        if (!scope) { return; }
        const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT, null);
        const nodes = [];
        let n;
        while ((n = walker.nextNode())) {
            if (n.parentElement?.closest('a, img, video')) { continue; }
            _PLAIN_IMG_RE.lastIndex = 0;
            if (_PLAIN_IMG_RE.test(n.textContent)) { nodes.push(n); }
        }
        nodes.forEach(textNode => {
            if (!textNode.parentNode) { return; }
            const text = textNode.textContent;
            _PLAIN_IMG_RE.lastIndex = 0;
            const frag = document.createDocumentFragment();
            let last = 0, m;
            while ((m = _PLAIN_IMG_RE.exec(text)) !== null) {
                if (m.index > last) { frag.appendChild(document.createTextNode(text.slice(last, m.index))); }
                const url = m[0];
                const code = _emoteCodeFromAnchorOrUrl(null, url);
                if (_getDisabledEmotes().has(url)) {
                    frag.appendChild(_makeEmoteLabel(url, code, 'img'));
                } else {
                    const img = document.createElement('img');
                    img.src = url; img.className = 'ichc-chat-inline-img';
                    img.alt = ''; img.loading = 'lazy'; img.dataset.ichcImgEmbed = '1';
                    img.addEventListener('click', () => window.open(url, '_blank', 'noopener,noreferrer'));
                    img.onerror = () => (img.closest('.ichc-emote-wrap') || img).remove();
                    frag.appendChild(_makeEmoteWrap(url, code, 'img', img));
                }
                last = m.index + url.length;
            }
            if (last < text.length) { frag.appendChild(document.createTextNode(text.slice(last))); }
            textNode.parentNode.replaceChild(frag, textNode);
        });
    }

    const chatScrollState = {
        auto: true,
        initialized: false,
        observer: null,
        observedRoot: null,
        clickBound: false,
        timer: null,
        followTicket: 0,
        followTimer: null,
        followRetryTimer: null,
        pendingForce: false,
        nativePaused: false,
        userScrollAt: 0,
        programmaticUntil: 0,
        boundTargets: new WeakSet(),
        pauseCheckTimer: null,
        lastMessageAt: 0,
        newMessageCount: 0,
        savedScrollTop: null,
        lastScrollTop: 0,
        scrollbarHideTimer: null,
        mouseIsDown: false,
        scrollbarFadeDeferred: false,
        _mouseTracking: false,
        scrollRAF: null,
        pendingScrollTarget: null,
    };

    const chatEventCollector = {
        row:        null,
        joinNames:  [],
        leaveNames: [],
        sealTimer:  null,
    };

    // ── Chat retention: survive moderator "clear chat" ──────────────────────────
    // When a mod clears the room, the site empties #txt. We capture the removed
    // rows and re-insert them (after confirming the log stays empty, so a normal
    // cam-refresh refill doesn't trigger a false restore and duplicate content).
    const CHAT_CLEAR_MIN_REMOVED = 6;   // batch must drop at least this many rows
    const CHAT_CLEAR_CONFIRM_MS  = 350; // wait this long to confirm it's a real clear
    const chatRetention = {
        confirmTimer: null,
        pendingRows: null,
    };
    // Live read so a menu toggle takes effect without a reload. Default: on.
    function _chatRetentionEnabled() {
        return localStorage.getItem('ichc_chat_retain') !== 'false';
    }

    function _isRetainableRow(node) {
        if (!(node instanceof HTMLElement)) { return false; }
        if (!node.matches('table, div, p, ul, .line')) { return false; }
        // modernize.js deliberately sheds old live rows to keep long sessions
        // responsive.  A marker survives on the detached mutation-record node so
        // this removal cannot be confused with a moderator silencing a user.
        if (node.dataset.ichcAgePruned === '1') { return false; }
        // Skip our own injected helper nodes — only real chat rows are retained.
        if (node.classList.contains('ichc-event-collector') ||
            node.classList.contains('ichc-chat-inline-img') ||
            node.classList.contains('ichc-og-card') ||
            node.classList.contains('ichc-chat-cleared-divider') ||
            // Our own injected furniture is not live chat. Keeping these out means they
            // never enter the cache or the persisted history, never count toward clear
            // detection, and are never re-salvaged as if they were real messages.
            node.classList.contains('ichc-condensed-bar') ||
            node.classList.contains('ichc-muted-row') ||
            node.classList.contains('ichc-history-row') ||
            node.classList.contains('ichc-history-divider') ||
            node.classList.contains('ichc-history-block') ||
            node.closest?.('.ichc-muted-body, .ichc-history-block')) { return false; }
        return true;
    }

    function _retainableRowCount(log, stopAfter = Infinity) {
        if (!log) { return 0; }
        let count = 0;
        for (const node of log.children) {
            if (_isRetainableRow(node) && ++count >= stopAfter) { break; }
        }
        return count;
    }

    function _restoreClearedChat(log, rows) {
        if (!log || !rows || !rows.length) { return; }
        const observer = chatScrollState.observer;
        // Detach so re-inserting the salvaged rows doesn't re-enter the observer
        // (which would treat them as new messages and force an autoscroll).
        observer?.disconnect();
        try {
            const frag = document.createDocumentFragment();
            rows.forEach(r => frag.appendChild(r));
            const divider = document.createElement('div');
            divider.className = 'line ichc-chat-event ichc-chat-cleared-divider';
            divider.dataset.ichcEventProcessed = '1';
            divider.textContent = '— chat cleared by moderator · history retained —';
            frag.appendChild(divider);
            log.insertBefore(frag, log.firstChild);
        } finally {
            // Drop the mutation records our own insert generated, then re-observe.
            observer?.takeRecords();
            if (observer && chatScrollState.observedRoot) {
                observer.observe(chatScrollState.observedRoot, { childList: true, subtree: true });
            }
        }
    }

    // ── Silenced / removed message reveal ───────────────────────────────────────
    // When a moderator silences someone the site removes that person's rows while the
    // rest of the log stays put, so _handleChatClear ignores it (that needs the log to
    // end up empty) and the rows were being discarded.
    //
    // Each removed row is replaced by a placeholder **in its original position**, which
    // MutationRecord.previousSibling / nextSibling make possible — they describe where
    // the node was when it went. Click it and the original text appears right there,
    // like revealing muted text; click again to re-hide. No aggregated notice, because
    // the position is known and guessing was never necessary.
    const MUTED_MAX = 60;               // cap live placeholders; oldest are dropped

    function _rowAuthor(row) {
        const link = row.querySelector?.('a.userlink');
        const name = (link?.textContent || '').trim();
        if (name) { return name; }
        // A silence can blank the visible nick but leave the onclick intact
        const onclick = link?.getAttribute?.('onclick') || '';
        const m = onclick.match(/userInfoPopup\(\s*["']([^"']+)["']/);
        return m ? m[1].trim() : '';
    }

    function _makeMutedRow(nick, row) {
        const p = document.createElement('p');
        p.className = 'line ichc-muted-row';
        if (nick) { p.dataset.nick = nick; }

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ichc-muted-reveal';
        btn.title = 'Show the removed message';

        const body = document.createElement('span');
        body.className = 'ichc-muted-body';
        body.hidden = true;

        const label = () => {
            btn.textContent = body.hidden
                ? '🔇 ' + (nick || 'message') + ' — removed (show)'
                : '🔇 ' + (nick || 'message') + ' — hide';
        };

        btn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            if (body.hidden && !body.firstChild) {
                // Cached clone, inserted as a node — no innerHTML of chat content
                body.appendChild(row.cloneNode(true));
            }
            body.hidden = !body.hidden;
            p.classList.toggle('ichc-muted-open', !body.hidden);
            label();
        });

        label();
        p.append(btn, body);
        return p;
    }

    function _trimMutedRows(log) {
        const all = log.querySelectorAll('.ichc-muted-row');
        for (let i = 0; i < all.length - MUTED_MAX; i++) { all[i].remove(); }
    }

    // Returns true if it consumed the removal.
    function _handleSilencedRemoval(log, mutations) {
        if (!_chatRetentionEnabled() || !log) { return false; }

        // A batch that also *adds* rows is the site appending and trimming, not a
        // moderator removing anything. Without this guard, routine log trimming would
        // litter the chat with "removed message" placeholders.
        const added = mutations.some(m =>
            [...m.addedNodes].some(n => _isRetainableRow(n)));
        if (added) { return false; }

        let placed = 0;
        mutations.forEach(m => {
            const removed = [...m.removedNodes].filter(_isRetainableRow);
            if (!removed.length) { return; }

            // previousSibling is shared by every node in one removed run, so advance an
            // anchor as we go — otherwise the placeholders come out in reverse order.
            let anchor = (m.previousSibling && m.previousSibling.parentNode === log)
                ? m.previousSibling : null;
            const before = (m.nextSibling && m.nextSibling.parentNode === log)
                ? m.nextSibling : null;

            removed.forEach(node => {
                const nick = _rowAuthor(node);
                const marker = _makeMutedRow(nick, node);
                if (anchor) { anchor.after(marker); }
                else if (before) { log.insertBefore(marker, before); }
                else { log.appendChild(marker); }
                anchor = marker;
                placed++;
            });
        });

        if (!placed) { return false; }
        _trimMutedRows(log);
        return true;
    }

    // Inspect a mutation batch for a mass row removal (a clear). Returns true if it
    // handled a clear (caller should skip its normal new-row processing).
    function _handleChatClear(log, mutations) {
        if (!_chatRetentionEnabled() || !log) { return false; }
        const removed = [];
        mutations.forEach(m => {
            m.removedNodes.forEach(n => { if (_isRetainableRow(n)) { removed.push(n); } });
        });
        if (removed.length < CHAT_CLEAR_MIN_REMOVED) { return false; }
        const remaining = _retainableRowCount(log, 3);
        if (remaining > 2) { return false; }
        _logChatClear('observer', 'removed=' + removed.length + ' remaining=' + remaining);

        // Hold the salvaged rows and confirm the log stays empty before restoring —
        // a cam-refresh that empties then refills #txt should NOT trigger a restore.
        chatRetention.pendingRows = (chatRetention.pendingRows || []).concat(removed);
        if (chatRetention.confirmTimer) { clearTimeout(chatRetention.confirmTimer); }
        chatRetention.confirmTimer = setTimeout(() => {
            chatRetention.confirmTimer = null;
            const liveLog = getChatLog();
            const rows = chatRetention.pendingRows;
            chatRetention.pendingRows = null;
            if (!liveLog || !rows) { return; }
            const now = _retainableRowCount(liveLog, 3);
            if (now > 2) { return; } // site refilled — genuine refresh, not a clear
            // Salvaged rows are the freshest copy — keep them as the cache and reveal
            // the restore button (manual restore; auto-restore proved unreliable).
            if (rows.length >= chatCache.count) {
                const recent = rows.slice(-CHAT_CACHE_MAX);
                chatCache.rows = recent.map(r => r.cloneNode(true));
                chatCache.count = recent.length;
            }
            _showChatRestoreBar();
        }, CHAT_CLEAR_CONFIRM_MS);
        return true;
    }

    // ── Rolling chat cache + restore button ─────────────────────────────────────
    // A debounced snapshot of the live chat survives a moderator clear regardless of
    // HOW the site wipes it (innerHTML, node removal, or replacing #txt). When the log
    // goes empty while we hold a cache, a restore button appears (manual, not auto).
    // ── Cross-refresh chat history ──────────────────────────────────────────────
    // The rolling cache above is DOM clones, so it dies with the page. This persists a
    // *structured* record per message instead and rebuilds rows on the next load, so
    // you come back to what you were reading.
    //
    // Structured, not stored HTML, and that is a security decision rather than a size
    // one: chat rows are authored by other users, so re-inserting their markup through
    // innerHTML on every page load would turn any message that ever slipped past the
    // site's filter into a stored XSS that fires for us forever (see pentest/
    // chat-send-xss.js). Rebuilt rows only ever receive text via textContent, so
    // nothing in a stored message can become active content. It also keeps the payload
    // small enough for localStorage.
    const CHAT_HISTORY_MAX = 600;

    function _historyKey() {
        // Per room — histories from different rooms must never mix
        const room = (location.pathname.split('/').filter(Boolean)[0] || 'root').toLowerCase();
        return 'ichc_chat_history_' + room;
    }

    // Our own injected furniture, stripped before reading the message body
    const HISTORY_STRIP = '.ichc-ts, .ichc-reply-btn, a.userlink, .ichc-chat-inline-img,' +
        ' .ichc-og-card, .ichc-event-collector, .ichc-chat-year-badge, .ichc-nick-block,' +
        ' .ichc-nick-sep, .ichc-emote-disabled-label, .ichc-muted-row';

    function _rowToRecord(row) {
        if (!_isRetainableRow(row)) { return null; }
        const tsEl = row.querySelector('.ichc-ts[data-ichc-ts-epoch]');
        const t = tsEl ? (parseInt(tsEl.dataset.ichcTsEpoch, 10) || 0) : 0;
        const link = row.querySelector('a.userlink');
        const n = (link?.textContent || '').trim();
        // Prefer the harvested identity colour over the readability-adjusted one
        const c = link ? (link.style.getPropertyValue('--ichc-chat-name-color') || '').trim() : '';
        const clone = row.cloneNode(true);
        clone.querySelectorAll(HISTORY_STRIP).forEach(el => el.remove());
        const m = (clone.textContent || '').replace(/\s+/g, ' ').replace(/^[:\s]+/, '').trim();
        if (!n && !m) { return null; }
        return { t, n, c, m };
    }

    const _sig = rec => (rec.t || 0) + '|' + (rec.n || '').toLowerCase() + '|' + (rec.m || '');

    let _lastChatHistorySaveAt = 0;
    function _saveChatHistory() {
        if (!_chatRetentionEnabled()) { return; }
        const log = getChatLog();
        if (!log) { return; }
        const now = Date.now();
        // The in-memory clear cache is refreshed on the normal 1.5s debounce, but
        // cloning/serialising hundreds of rows into localStorage that often creates
        // avoidable main-thread stalls.  Cross-refresh history can safely lag by a
        // few seconds while the live recovery cache remains current.
        if (now - _lastChatHistorySaveAt < 10000) { return; }
        _lastChatHistorySaveAt = now;
        try {
            const recs = [...log.children]
                .filter(_isRetainableRow)
                .slice(-CHAT_HISTORY_MAX)
                .map(_rowToRecord)
                .filter(Boolean);
            if (!recs.length) { return; }   // never clobber a good history with nothing
            localStorage.setItem(_historyKey(), JSON.stringify({ v: 1, at: now, recs }));
        } catch (_) {}   // quota or private mode — history is a nicety, not load-bearing
    }

    function _buildHistoryRow(rec) {
        const p = document.createElement('p');
        p.className = 'line ichc-history-row';
        if (rec.t) {
            const ts = document.createElement('span');
            ts.className = 'ichc-history-ts';
            const d = new Date(rec.t);
            ts.textContent = isNaN(d.getTime())
                ? '' : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            p.appendChild(ts);
        }
        if (rec.n) {
            const nick = document.createElement('span');
            nick.className = 'ichc-history-nick';
            nick.textContent = rec.n;
            if (rec.c && /^(#[0-9a-f]{3,8}|rgba?\([\d.,\s%]+\))$/i.test(rec.c)) {
                nick.style.setProperty('color', rec.c, 'important');
            }
            p.appendChild(nick);
        }
        const body = document.createElement('span');
        body.className = 'ichc-history-body';
        body.textContent = rec.m;    // text only, never innerHTML — see the note above
        p.appendChild(body);
        return p;
    }

    let _historyShown = false;
    function _restoreChatHistory() {
        if (_historyShown || !_chatRetentionEnabled()) { return; }
        const log = getChatLog();
        if (!log) { return; }
        if (log.querySelector('.ichc-history-block')) { _historyShown = true; return; }

        let recs = [];
        try {
            const stored = JSON.parse(localStorage.getItem(_historyKey()) || 'null');
            if (stored && Array.isArray(stored.recs)) { recs = stored.recs; }
        } catch (_) { return; }
        if (!recs.length) { _historyShown = true; return; }

        // Drop anything already on screen — after a quick refresh the site often
        // re-serves the tail of the log, and showing it twice is worse than not at all.
        const live = new Set([...log.children].map(_rowToRecord).filter(Boolean).map(_sig));
        const fresh = recs.filter(r => !live.has(_sig(r)));
        if (!fresh.length) { _historyShown = true; return; }

        const block = document.createElement('div');
        block.className = 'ichc-history-block';
        fresh.forEach(r => block.appendChild(_buildHistoryRow(r)));
        const divider = document.createElement('div');
        divider.className = 'ichc-history-divider';
        divider.textContent = '— ' + fresh.length + ' earlier message' +
            (fresh.length === 1 ? '' : 's') + ' from before the refresh —';
        block.appendChild(divider);

        log.insertBefore(block, log.firstChild);
        _historyShown = true;
    }

    const CHAT_CACHE_MAX = 800;   // was 400 — longer scroll back on restore
    const chatCache = { rows: [], count: 0, snapTimer: null, lossShown: false, lastContentAt: 0, lossCheckTimer: null };

    // Forensics for "the chat cleared itself at random". The two detectors below catch
    // a clear but say nothing about its ORIGIN, and the two origins want opposite fixes:
    //
    //   observer — rows were removed from the log we are watching. The site (or a mod)
    //              cleared it in place.
    //   swap     — the log element we were watching is gone or is no longer the live
    //              one, i.e. the site replaced #txt wholesale and the observer never
    //              saw a mutation. Only the 1s poll catches this.
    //
    // Logged unconditionally: this is a user-visible bug being chased across sessions,
    // and asking someone to flip a debug flag before the thing they cannot predict
    // happens again is not a workable request.
    function _logChatClear(source, extra) {
        try {
            const log = getChatLog();
            console.log(
                '%c[ichc] chat cleared%c source=' + source +
                ' cached=' + chatCache.count +
                ' sinceContent=' + (chatCache.lastContentAt ? (Date.now() - chatCache.lastContentAt) + 'ms' : 'n/a') +
                ' logConnected=' + !!(log && log.isConnected) +
                (extra ? ' ' + extra : ''),
                'color:#f87171;font-weight:bold', 'color:inherit');
        } catch (_) {}
    }

    function _snapshotChatCache() {
        const log = getChatLog();
        if (!log) { return; }
        const rows = [...log.children].filter(_isRetainableRow);
        if (rows.length < 3) { return; }   // nothing worth caching yet
        // Bound before cloning. Previously a 5,000-row room cloned every row on
        // every snapshot and threw most clones away afterward, so the recovery
        // feature itself grew more expensive the longer the tab stayed open.
        const snap = rows.slice(-CHAT_CACHE_MAX).map(r => r.cloneNode(true));
        chatCache.rows = snap;
        chatCache.count = snap.length;
        chatCache.lastContentAt = Date.now();
        _saveChatHistory();   // same debounce as the in-memory snapshot
    }
    function _scheduleChatSnapshot() {
        if (!_chatRetentionEnabled() || chatCache.snapTimer) { return; }
        chatCache.snapTimer = setTimeout(() => {
            chatCache.snapTimer = null;
            _snapshotChatCache();
        }, 1500);
    }

    // Periodic safety net — catches a clear even if the mutation observer missed it
    // (e.g. the site swapped out #txt entirely).
    function _checkChatLoss() {
        if (!_chatRetentionEnabled()) { return; }
        const log = getChatLog();
        // Loss detection only distinguishes 0–2 rows from "healthy" (>2), so do
        // not rescan the entire bounded history once the answer is already known.
        const live = _retainableRowCount(log, 3);
        if (live > 2) {
            if (chatCache.lossShown) { _hideChatRestoreBar(); }   // real content returned
            return;
        }
        // Empty/near-empty: only a clear if we held real content that settled ≥1.2s ago
        // (so a cam-refresh empty→refill doesn't false-fire).
        if (chatCache.count >= CHAT_CLEAR_MIN_REMOVED &&
            Date.now() - chatCache.lastContentAt > 1200 &&
            !chatCache.lossShown) {
            // The observer never fired for this one, so the log we were watching either
            // vanished or was swapped for a fresh element — distinguish the two, since
            // a swap points at the site rebuilding the chat column rather than a clear.
            _logChatClear(log ? 'swap' : 'gone', 'live=' + live);
            _showChatRestoreBar();
        }
    }
    function _startChatLossWatcher() {
        if (chatCache.lossCheckTimer) { return; }
        chatCache.lossCheckTimer = setInterval(_checkChatLoss, 1000);
    }

    // Where the bar belongs right now. #chat_container is the chat column in the
    // modern layout; the fallbacks only matter before it exists.
    function _chatRestoreBarHost() {
        return document.getElementById('chat_container') ||
               getChatLog()?.parentElement ||
               document.body;
    }

    function _ensureChatRestoreBar() {
        let bar = document.getElementById('ichc-chat-restore-bar');
        if (bar) {
            // Re-home if it drifted. The bar can be created before
            // installStageLayout() rebuilds the room, in which case it lands in a
            // wrapper that the rebuild later tags .ichc-retired-shell — which is
            // `display: none`. The bar then sits in the DOM with its label correctly
            // set and never paints, which looks exactly like a styling bug.
            const host = _chatRestoreBarHost();
            if (host && (bar.parentElement !== host || bar.closest('.ichc-retired-shell'))) {
                host.insertBefore(bar, host.firstChild);
            }
            return bar;
        }
        bar = document.createElement('div');
        bar.id = 'ichc-chat-restore-bar';
        bar.className = 'ichc-chat-restore-bar';
        bar.hidden = true;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ichc-chat-restore-btn';
        btn.addEventListener('click', _restoreChatFromCache);
        const dismiss = document.createElement('button');
        dismiss.type = 'button';
        dismiss.className = 'ichc-chat-restore-dismiss';
        dismiss.title = 'Dismiss';
        dismiss.textContent = '✕';
        dismiss.addEventListener('click', _hideChatRestoreBar);
        bar.appendChild(btn);
        bar.appendChild(dismiss);
        const host = _chatRestoreBarHost();
        host.insertBefore(bar, host.firstChild);
        return bar;
    }
    function _showChatRestoreBar() {
        if (!chatCache.count) { return; }
        const bar = _ensureChatRestoreBar();
        const n = chatCache.count;
        bar.querySelector('.ichc-chat-restore-btn').textContent =
            '↺ Restore ' + n + ' cleared message' + (n === 1 ? '' : 's');
        bar.hidden = false;
        chatCache.lossShown = true;
    }
    function _hideChatRestoreBar() {
        const bar = document.getElementById('ichc-chat-restore-bar');
        if (bar) { bar.hidden = true; }
        chatCache.lossShown = false;
    }
    function _restoreChatFromCache() {
        const log = getChatLog();
        if (!log || !chatCache.rows.length) { _hideChatRestoreBar(); return; }
        const observer = chatScrollState.observer;
        observer?.disconnect();
        try {
            // Clone again so the cache survives for repeat restores / further clears.
            const frag = document.createDocumentFragment();
            chatCache.rows.forEach(r => frag.appendChild(r.cloneNode(true)));
            const divider = document.createElement('div');
            divider.className = 'line ichc-chat-event ichc-chat-cleared-divider';
            divider.dataset.ichcEventProcessed = '1';
            divider.textContent = '— restored ' + chatCache.count + ' messages cleared by moderator —';
            frag.appendChild(divider);
            log.insertBefore(frag, log.firstChild);
        } finally {
            observer?.takeRecords();
            if (observer && chatScrollState.observedRoot) {
                observer.observe(chatScrollState.observedRoot, { childList: true, subtree: true });
            }
        }
        _hideChatRestoreBar();
    }

    function _sealChatEvents() {
        // Null out the reference so the next join/leave starts a fresh row at the new position.
        // The existing collector row stays in the DOM where it already is.
        chatEventCollector.sealTimer = null;
        chatEventCollector.row = null;
        chatEventCollector.joinNames = [];
        chatEventCollector.leaveNames = [];
    }

    function _cancelSeal() {
        if (chatEventCollector.sealTimer !== null) {
            clearTimeout(chatEventCollector.sealTimer);
            chatEventCollector.sealTimer = null;
        }
    }

    function _scheduleSeal() {
        _cancelSeal();
        chatEventCollector.sealTimer = setTimeout(_sealChatEvents, 500);
    }

    function _classifyEventRow(row) {
        if (!row) { return null; }
        const text = normalizeText(row.textContent || '');
        if (/has joined(?: the room)?|joined the room/.test(text)) { return 'join'; }
        if (/has left(?: the room)?|left the room/.test(text)) { return 'leave'; }
        return null;
    }

    function _extractEventNick(row) {
        const anchor = row.querySelector('a.userlink');
        if (anchor) { return anchor.textContent.trim(); }
        const text = (row.textContent || '').trim();
        const m = text.match(/^(.+?)\s+(?:has joined|has left|joined the room|left the room)/i);
        return m ? m[1].trim() : '';
    }

    // ── Condensed join/leave mode ───────────────────────────────────────────────
    // Toggled from the userlist more-menu ("Condensed join/leave"). Instead of an
    // inline event row per burst, every join and leave collapses into two lines
    // pinned to the top of the chat log, updating live.
    //
    // Expiry is tied to what the reader can actually see. Each new chat row gets a
    // monotonic line number; an event records the line number current when it landed.
    // On every update the topmost row visible in the viewport is found and anything
    // older than it is dropped — so the pinned lines only ever describe the stretch of
    // conversation on screen. A monotonic counter is used rather than row indices
    // because the site trims rows off the top, which would shift every index.
    const CONDENSED_KEY = 'ichc_condensed_events';
    const CONDENSED_MAX = 40;              // hard cap per line, independent of viewport
    let _lineSeq = 0;
    const condensed = { joins: new Map(), leaves: new Map(), bar: null, raf: 0, expanded: false };

    // How long a join/leave stays in the bar.
    //
    // The default ('view') is the original behaviour: an event lives only while the
    // chat line it arrived next to is still on screen, so the bar describes the stretch
    // of conversation you are looking at. That is deliberately short-lived, which is
    // wrong when you step away and want to know who came and went — hence the timed
    // options, which ignore scroll position entirely and keep everything from the last
    // N minutes. The two rules are mutually exclusive on purpose: applying both would
    // silently re-impose the short window and make "10m" look broken.
    const CONDENSED_RETENTION_KEY = 'ichc_condensed_window';
    const CONDENSED_RETENTIONS = [
        { id: 'view', label: 'View',  ms: 0 },
        { id: '2m',   label: '2m',    ms: 2 * 60 * 1000 },
        { id: '5m',   label: '5m',    ms: 5 * 60 * 1000 },
        { id: '10m',  label: '10m',   ms: 10 * 60 * 1000 },
    ];
    function _condensedRetention() {
        let id = 'view';
        try { id = localStorage.getItem(CONDENSED_RETENTION_KEY) || 'view'; } catch (_) {}
        return CONDENSED_RETENTIONS.find(r => r.id === id) || CONDENSED_RETENTIONS[0];
    }
    function _setCondensedRetention(id) {
        try { localStorage.setItem(CONDENSED_RETENTION_KEY, id); } catch (_) {}
    }

    function _condensedOn() {
        try { return localStorage.getItem(CONDENSED_KEY) === '1'; } catch (_) { return false; }
    }

    // Stamped on every genuinely new chat row so events can be aged against them.
    // Only real chat rows carry line numbers. Stamping our own furniture (the
    // condensed bar especially, which is the log's first child) makes it the topmost
    // "visible line" and expires every event immediately.
    function _stampLine(row) {
        if (!(row instanceof HTMLElement) || row.dataset.ichcLine) { return; }
        if (!_isRetainableRow(row)) { return; }
        row.dataset.ichcLine = String(++_lineSeq);
    }

    // Give genuinely new chat rows a small one-shot entrance cue. The marker is
    // retained after the class is removed so cached/restored clones never replay the
    // motion and make old history look live.
    function _animateChatArrival(row, log) {
        if (!(row instanceof HTMLElement) || !log) { return; }
        let arrival = row;
        if (arrival.parentElement !== log) {
            arrival = arrival.matches('.line') ? arrival : arrival.closest('.line');
        }
        if (!arrival || !log.contains(arrival) || arrival.dataset.ichcInserted ||
            arrival.dataset.ichcArrival || !_isRetainableRow(arrival)) { return; }
        arrival.dataset.ichcArrival = '1';
        arrival.classList.add('ichc-chat-arrival');
        window.setTimeout(() => arrival.classList.remove('ichc-chat-arrival'), 280);
    }

    // Line number of the topmost row currently visible in the scroll viewport.
    // Everything before it has scrolled out of the reader's view.
    function _firstVisibleLine(log) {
        const top = log.scrollTop;
        for (const row of log.children) {
            if (!(row instanceof HTMLElement)) { continue; }
            if (!row.dataset.ichcLine) { continue; }
            if (!_isRetainableRow(row)) { continue; }
            if (row.offsetTop + row.offsetHeight > top) {
                return parseInt(row.dataset.ichcLine, 10) || 0;
            }
        }
        return 0;
    }

    function _condensedBar(log) {
        if (condensed.bar?.isConnected) { return condensed.bar; }
        const bar = document.createElement('div');
        bar.className = 'ichc-condensed-bar';
        bar.id = 'ichc-condensed-bar';

        // Lines live in their own column so the toggle can sit beside them without
        // being caught by the ellipsis clamp on the lines themselves.
        const lines = document.createElement('div');
        lines.className = 'ichc-condensed-lines';
        const j = document.createElement('div');
        j.className = 'ichc-condensed-line ichc-condensed-joins';
        const l = document.createElement('div');
        l.className = 'ichc-condensed-line ichc-condensed-leaves';
        lines.append(j, l);

        // Retention picker — only meaningful once expanded, so it lives inside the
        // lines column and is revealed by the open state.
        const win = document.createElement('div');
        win.className = 'ichc-condensed-window';
        const winLabel = document.createElement('span');
        winLabel.className = 'ichc-condensed-window-label';
        winLabel.textContent = 'Keep';
        win.appendChild(winLabel);
        CONDENSED_RETENTIONS.forEach(r => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'ichc-condensed-window-btn';
            b.dataset.retention = r.id;
            b.textContent = r.label;
            b.title = r.ms
                ? `Keep joins and leaves from the last ${r.label}, regardless of scrolling`
                : 'Keep only events beside chat still on screen';
            b.addEventListener('click', e => {
                // Must not reach the bar's own handler, which would collapse the bar
                // the moment a window was chosen.
                e.preventDefault();
                e.stopPropagation();
                _setCondensedRetention(r.id);
                _updateCondensed();
            });
            win.appendChild(b);
        });

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'ichc-condensed-toggle';
        toggle.hidden = true;

        // `win` is a sibling of `lines`, not a child: when expanded, `lines` becomes a
        // capped scroll box, and a picker inside it would scroll out of reach exactly
        // when the list is long enough to need one. The bar wraps so it lands on its
        // own row underneath.
        bar.append(lines, toggle, win);

        // The whole bar is the hit target — it holds only plain text, so there is
        // nothing else in it a click could be meant for. (The retention buttons stop
        // propagation themselves.)
        bar.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            condensed.expanded = !condensed.expanded;
            _updateCondensed();
        });

        log.insertBefore(bar, log.firstChild);
        condensed.bar = bar;
        return bar;
    }

    function _removeCondensedBar() {
        condensed.bar?.remove();
        condensed.bar = null;
    }

    // The bold figure is a RATE — how many in the last 60s — not the length of the name
    // list beside it, which is scoped to the visible chat instead. Those two numbers
    // legitimately differ, so the tooltip spells both out rather than leaving the reader
    // to wonder why "2" is followed by five names.
    const CONDENSED_WINDOW_MS = 60 * 1000;
    function _renderCondensedLine(el, map, verb) {
        if (!map.size) { el.hidden = true; return; }
        el.hidden = false;
        const names = _rankNames([...map.keys()]);
        const cutoff = Date.now() - CONDENSED_WINDOW_MS;
        const recent = [...map.values()].filter(r => (r?.at ?? 0) >= cutoff).length;

        // Reuse the existing nodes rather than replaceChildren(). This repaints on every
        // scroll event, and a native tooltip needs about a second of unbroken hover — so
        // rebuilding the <b> each time meant the title never had a chance to appear and
        // the number looked like it had only a help cursor and no explanation.
        let count = el.querySelector(':scope > .ichc-condensed-count');
        let rest = count && count.nextSibling;
        if (!count) {
            el.replaceChildren();
            count = document.createElement('b');
            count.className = 'ichc-condensed-count';
            rest = document.createTextNode('');
            el.append(count, rest);
        }
        if (!rest || rest.nodeType !== Node.TEXT_NODE) {
            rest = document.createTextNode('');
            count.after(rest);
        }

        const countText = String(recent);
        if (count.textContent !== countText) { count.textContent = countText; }
        const title =
            recent + ' ' + verb + ' in the last minute.\n' +
            names.length + ' ' + verb + ' listed — everyone who ' + verb +
            ' within the stretch of chat currently on screen.\n' +
            'Names drop off once their moment scrolls out of view.';
        if (count.title !== title) { count.title = title; }
        const restText = ' ' + verb + ': ' + names.join(', ');
        if (rest.textContent !== restText) { rest.textContent = restText; }
    }

    // Drop anything that has scrolled out of view, then repaint both lines.
    // `fromScroll` updates only refresh what is already on screen. Creating or removing
    // the bar changes the content height above the viewport, which shifts scrollTop and
    // fires another scroll event — a feedback loop that yanks the view while reading.
    // Event-driven updates reconcile presence instead.
    function _updateCondensed(fromScroll) {
        condensed.raf = 0;
        const log = getChatLog();
        if (!log) { return; }
        if (!_condensedOn()) { _removeCondensedBar(); return; }

        // Timed retention ignores scroll position entirely; the default expires by it.
        // Never both — see the note on CONDENSED_RETENTIONS.
        const retention = _condensedRetention();
        const floor = retention.ms ? 0 : _firstVisibleLine(log);
        const ageCutoff = retention.ms ? Date.now() - retention.ms : 0;
        [condensed.joins, condensed.leaves].forEach(map => {
            map.forEach((rec, nick) => {
                const drop = retention.ms
                    ? (rec?.at ?? 0) < ageCutoff
                    : (rec?.seq ?? 0) < floor;
                if (drop) { map.delete(nick); }
            });
            while (map.size > CONDENSED_MAX) { map.delete(map.keys().next().value); }
        });

        // Adding or removing the bar changes the content height above the viewport, which
        // shifts scrollTop and fires another scroll event. Presence is therefore only
        // allowed to change while the reader is pinned to live and not mid-scroll —
        // otherwise the view lurches under them, which reads as chat fighting back.
        const canReflow = !fromScroll && chatScrollState.auto !== false;
        if (!condensed.joins.size && !condensed.leaves.size) {
            if (canReflow) { _removeCondensedBar(); }
            return;
        }
        if (!canReflow && !condensed.bar?.isConnected) { return; }
        const bar = _condensedBar(log);
        const jl = bar.querySelector('.ichc-condensed-joins');
        const ll = bar.querySelector('.ichc-condensed-leaves');

        // Overflow can only be measured against the CLAMPED width, so the collapsed
        // state has to be painted first — but only when actually collapsed.
        //
        // This used to strip `ichc-condensed-open` unconditionally, measure, then put it
        // back. Reading scrollWidth forces a style flush between those two lines, so
        // while expanded the class genuinely left and re-entered the DOM on every update
        // — including the 10s repaint and every scroll frame. That restarted the reveal
        // animation continuously: the retention buttons flickered and could not be
        // clicked, because each pointerdown landed on an element mid-animation that was
        // about to be re-laid-out. While expanded the toggle stays visible regardless,
        // so the measurement is not needed at all and is now skipped.
        let clipped;
        if (condensed.expanded) {
            _renderCondensedLine(jl, condensed.joins, 'joined');
            _renderCondensedLine(ll, condensed.leaves, 'left');
            clipped = true;
        } else {
            bar.classList.remove('ichc-condensed-open');
            _renderCondensedLine(jl, condensed.joins, 'joined');
            _renderCondensedLine(ll, condensed.leaves, 'left');
            clipped = [jl, ll].some(el => !el.hidden && el.scrollWidth > el.clientWidth + 1);
        }

        bar.classList.toggle('ichc-condensed-open', condensed.expanded);
        const toggle = bar.querySelector('.ichc-condensed-toggle');
        if (toggle) {
            toggle.hidden = !(clipped || condensed.expanded);
            // Single glyph, rotated by CSS, so the open/close change is animated rather
            // than swapped \u2014 matches how the cog menu's expandable rows behave.
            toggle.textContent = '\u25b8';
            toggle.title = condensed.expanded ? 'Collapse' : 'Show everyone';
            bar.classList.toggle('ichc-condensed-clickable', !toggle.hidden);
        }
        bar.querySelectorAll('.ichc-condensed-window-btn').forEach(b => {
            b.setAttribute('aria-current', String(b.dataset.retention === retention.id));
        });
        // A timed window is a sticky, non-obvious mode \u2014 surface it on the collapsed bar
        // too, so "why is this still listing people who left ages ago" is answerable
        // without expanding.
        bar.classList.toggle('ichc-condensed-timed', !!retention.ms);
        bar.dataset.retention = retention.id;
    }

    function _scheduleCondensed(fromScroll) {
        if (condensed.raf) { return; }
        condensed.raf = requestAnimationFrame(() => _updateCondensed(fromScroll));
    }

    // A per-minute figure has to fall back to 0 on its own, so repaint on a slow timer
    // whenever the bar is on screen. Only runs while there is something to show.
    setInterval(() => {
        if (condensed.bar?.isConnected) { _scheduleCondensed(); }
    }, 10000);

    // Returns true when it has taken ownership of the event.
    function _addCondensedEvent(type, nick, refRow) {
        if (!_condensedOn()) { return false; }
        refRow.dataset.ichcEventProcessed = '1';
        refRow.style.setProperty('display', 'none', 'important');
        const map = type === 'join' ? condensed.joins : condensed.leaves;
        const other = type === 'join' ? condensed.leaves : condensed.joins;
        const key = (nick || '').trim();
        if (!key) { return true; }
        // A join cancels a pending leave for the same person and vice versa — showing
        // someone as both joined and left in the same visible stretch is just noise.
        other.delete(key);
        map.delete(key);
        map.set(key, { seq: _lineSeq, at: Date.now() });
        _scheduleCondensed();
        return true;
    }

    window.addEventListener('ichc-condensed-events-change', () => {
        condensed.joins.clear();
        condensed.leaves.clear();
        condensed.expanded = false;
        _removeCondensedBar();
        _scheduleCondensed();
    });

    // How many names survive before truncation, per join/leave group.
    const EVENT_VISIBLE = 5;

    // Who spoke recently. The room cares more about someone who was just talking than
    // about a stranger with the same karma, and this is the only script that sees
    // messages arrive, so recency is tracked here rather than in the ranker.
    const lastSpoke = window.__ichcLastSpoke || (window.__ichcLastSpoke = new Map());
    function recordSpoke(name) {
        const key = (name || '').trim().toLowerCase();
        if (!key) { return; }
        lastSpoke.set(key, Date.now());
        if (lastSpoke.size > 400) {
            // Map keeps insertion order; drop the oldest quarter in one pass
            const drop = [...lastSpoke.keys()].slice(0, 100);
            drop.forEach(k => lastSpoke.delete(k));
        }
    }

    // Profile stats come from modernize.js (karma, account age, cam/mod/supporter
    // state); the talking bonus is added here. Absent ranker → every name scores 0 and
    // the original arrival order is preserved, so truncation still behaves sensibly.
    function _rankNick(nick) {
        const key = (nick || '').trim().toLowerCase();
        let score = 0;
        try { score = window.__ichcRankUser?.(key) || 0; } catch (_) {}
        const spoke = lastSpoke.get(key);
        if (spoke) {
            const mins = (Date.now() - spoke) / 60000;
            if (mins < 5) { score += 3; }
            else if (mins < 30) { score += 2; }
            else if (mins < 120) { score += 1; }
        }
        return score;
    }

    // Rank descending, ties broken by arrival order so the result is stable between
    // re-renders (this row is rebuilt on every new event).
    function _rankNames(names) {
        return names
            .map((n, i) => ({ n, i, s: _rankNick(n) }))
            .sort((a, b) => (b.s - a.s) || (a.i - b.i))
            .map(o => o.n);
    }

    function _eventGroup(names, cls, verb, expandedKey) {
        const span = document.createElement('span');
        span.className = cls;
        const count = document.createElement('b');
        count.textContent = String(names.length);
        span.appendChild(count);

        const ranked = _rankNames(names);
        const expanded = chatEventCollector[expandedKey];
        const shown = expanded ? ranked : ranked.slice(0, EVENT_VISIBLE);
        const hidden = ranked.length - shown.length;

        span.appendChild(document.createTextNode(' ' + verb + ': ' + shown.join(', ')));

        if (hidden > 0 || expanded) {
            const more = document.createElement('button');
            more.type = 'button';
            more.className = 'ichc-event-more';
            more.textContent = expanded ? ' show less' : ' +' + hidden + ' more';
            more.title = expanded ? 'Show only the most prominent' : 'Show everyone';
            more.addEventListener('click', e => {
                e.preventDefault();
                e.stopPropagation();
                chatEventCollector[expandedKey] = !chatEventCollector[expandedKey];
                if (chatEventCollector.row?.isConnected) {
                    _renderEventCollector(chatEventCollector.row);
                }
            });
            span.appendChild(more);
        }
        return span;
    }

    function _renderEventCollector(row) {
        const { joinNames, leaveNames } = chatEventCollector;
        const frag = document.createDocumentFragment();
        if (joinNames.length) {
            frag.appendChild(_eventGroup(joinNames, 'ichc-event-join-part', 'Joined', 'joinExpanded'));
        }
        if (joinNames.length && leaveNames.length) {
            frag.appendChild(document.createTextNode(' \u00b7 '));
        }
        if (leaveNames.length) {
            frag.appendChild(_eventGroup(leaveNames, 'ichc-event-leave-part', 'Left', 'leaveExpanded'));
        }
        row.replaceChildren(frag);
    }

    function _addToEventCollector(type, nick, refRow) {
        _cancelSeal();
        // Condensed mode replaces the inline collector row entirely
        if (_addCondensedEvent(type, nick, refRow)) { return; }
        refRow.dataset.ichcEventProcessed = '1';
        refRow.style.setProperty('display', 'none', 'important');
        // Always use #txt directly — refRow.parentElement can be a nested tbody/container
        // when the observer fires with subtree:true, which would place the collector row
        // inside an invalid container and cause it to become disconnected.
        const chatLog = getChatLog();

        if (!chatEventCollector.row?.isConnected) {
            // Row left the DOM (log was replaced) — start a fresh accumulator.
            chatEventCollector.row        = document.createElement('div');
            chatEventCollector.row.className = 'ichc-event-collector';
            chatEventCollector.joinNames  = [];
            chatEventCollector.leaveNames = [];
            chatEventCollector.joinExpanded  = false;
            chatEventCollector.leaveExpanded = false;
        }

        if (type === 'join') {
            chatEventCollector.joinNames.push(nick);
        } else {
            chatEventCollector.leaveNames.push(nick);
        }
        // Always move to bottom so new events stay visible.
        if (chatLog) { chatLog.appendChild(chatEventCollector.row); }
        _renderEventCollector(chatEventCollector.row);
        chatScrollState.lastMessageAt = Date.now();
        if (chatScrollState.auto) { scheduleChatFollow(false); }
    }

    function getChatLog() {
        return document.getElementById('txt');
    }

    function getChatScrollTarget() {
        return getChatLog();
    }

    // ── Scroll pause indicator ─────────────────────────────────────────────────
    let _scrollIndicator = null;

    function _ensureScrollIndicator() {
        if (_scrollIndicator && _scrollIndicator.isConnected) { return; }
        _scrollIndicator = document.createElement('div');
        _scrollIndicator.id = 'ichc-scroll-indicator';
        _scrollIndicator.hidden = true;
        document.body.appendChild(_scrollIndicator);
        _scrollIndicator.addEventListener('click', () => {
            chatScrollState.newMessageCount = 0;
            chatScrollState.savedScrollTop = null;
            chatScrollState.auto = true;
            chatScrollState.nativePaused = false;
            _scrollIndicator.hidden = true;
            scheduleChatFollow(true);
            clearNativeChatPause();
        });
    }

    function _updateScrollIndicator() {
        if (!document.body) { return; }
        _ensureScrollIndicator();
        const log = getChatLog();
        if (!log || chatScrollState.auto) {
            if (_scrollIndicator) { _scrollIndicator.hidden = true; }
            return;
        }
        const rect = log.getBoundingClientRect();
        _scrollIndicator.style.setProperty('bottom', (window.innerHeight - rect.bottom + 10) + 'px', 'important');
        _scrollIndicator.style.setProperty('left', (rect.left + rect.width / 2) + 'px', 'important');
        const count = chatScrollState.newMessageCount;
        _scrollIndicator.textContent = count > 0 ? `↓ ${count} new` : '↓ latest';
        _scrollIndicator.hidden = false;
    }

    function bindChatScrollTargets() {
        const target = getChatScrollTarget();
        if (!target || chatScrollState.boundTargets.has(target)) { return; }

        chatScrollState.boundTargets.add(target);

        const markUserScroll = () => {
            chatScrollState.userScrollAt = Date.now();
        };

        ['wheel', 'touchmove', 'pointerdown', 'mousedown'].forEach(type => {
            target.addEventListener(type, markUserScroll, { passive: true });
        });

        // Scrolling changes which lines are on screen, which is what the condensed
        // lines are scoped to — so they have to be recomputed as the view moves.
        target.addEventListener('scroll', () => _scheduleCondensed(true), { passive: true });

        // Track global mouse-button state — the only reliable way to detect a scrollbar
        // thumb hold, since Chrome doesn't fire pointer events for native scrollbar drags.
        if (!chatScrollState._mouseTracking) {
            chatScrollState._mouseTracking = true;
            document.addEventListener('mousedown', () => {
                chatScrollState.mouseIsDown = true;
            }, { passive: true });
            document.addEventListener('mouseup', () => {
                chatScrollState.mouseIsDown = false;
                // If the hide timer already fired while the button was held, fade now.
                if (chatScrollState.scrollbarFadeDeferred) {
                    chatScrollState.scrollbarFadeDeferred = false;
                    if (chatScrollState.scrollbarHideTimer) { clearTimeout(chatScrollState.scrollbarHideTimer); }
                    chatScrollState.scrollbarHideTimer = setTimeout(() => {
                        chatScrollState.scrollbarHideTimer = null;
                        target.classList.remove('ichc-user-scrolling');
                    }, 400);
                }
            }, { passive: true });
        }

        const handleScroll = () => {
            const target = chatScrollState.pendingScrollTarget;
            chatScrollState.pendingScrollTarget = null;
            chatScrollState.scrollRAF = null;
            if (!target || !target.isConnected) { return; }

            // Whether this scroll came from the user has to be decided BEFORE the
            // programmatic guard below, not after. markUserScroll stamps userScrollAt on
            // wheel / touchmove / pointerdown / mousedown, all of which fire before the
            // scroll event, so this is reliable.
            const userInitiated = (Date.now() - chatScrollState.userScrollAt) < 600;

            // Ignore our own scrolling, never the user's. scrollChatToBottom opens a
            // 260ms programmatic window on every follow and its retry re-opens it 110ms
            // later, so in a busy room the window is almost continuously open. Guarding
            // unconditionally meant real wheel scrolls were dropped, the pause branches
            // never ran, auto-follow stayed on, and the next message snapped the view
            // back to the bottom — the "it keeps snapping when I scroll up" report.
            if (!userInitiated && Date.now() < chatScrollState.programmaticUntil) { return; }

            // Rainbow scrollbar hue: violet(300) at bottom → red(0) at top — full spectrum
            const _max = target.scrollHeight - target.clientHeight;
            const _up = _max > 0 ? 1 - (target.scrollTop / _max) : 0;
            target.style.setProperty('--ichc-scroll-hue', Math.round(300 * (1 - _up)));

            if (userInitiated) {
                target.classList.add('ichc-user-scrolling');
                if (chatScrollState.scrollbarHideTimer) { clearTimeout(chatScrollState.scrollbarHideTimer); }
                chatScrollState.scrollbarHideTimer = setTimeout(() => {
                    chatScrollState.scrollbarHideTimer = null;
                    if (chatScrollState.mouseIsDown) {
                        // Mouse still held (e.g. dragging thumb) — defer until mouseup
                        chatScrollState.scrollbarFadeDeferred = true;
                    } else {
                        target.classList.remove('ichc-user-scrolling');
                    }
                }, 1500);
            }

            hideChatPauseNotice();

            // Detect upward intent: a user-initiated scroll that moved the view up
            // (or simply isn't pinned to the very bottom) must pause auto-follow even
            // while still inside the 56px "near bottom" band — otherwise every scroll
            // event re-follows to the bottom and the user can never escape it.
            const prevTop = chatScrollState.lastScrollTop;
            chatScrollState.lastScrollTop = target.scrollTop;

            // Anti-yank. While the reader is parked, any scroll they did not cause is
            // the site pulling the log to the bottom — put it straight back. This used
            // to exist only inside the 56px near-bottom band, so a yank from further up
            // was never undone, which is what "constantly pulling to the bottom" was.
            // Purely local: no site API, so nothing can trip flood protection.
            if (!chatScrollState.auto && !userInitiated &&
                    chatScrollState.savedScrollTop != null &&
                    Math.abs(target.scrollTop - chatScrollState.savedScrollTop) > 2) {
                // Deliberately does NOT open a programmatic window. Doing so made the
                // restore fire once and then give up: the site's next yank landed inside
                // the window, was skipped as non-user, and was never undone — leaving the
                // view pinned at the bottom with no further event to recover from.
                // No window is needed anyway, because the echo scroll this restore
                // generates lands exactly on savedScrollTop, so the diff test below
                // rejects it on its own.
                target.scrollTop = chatScrollState.savedScrollTop;
                chatScrollState.lastScrollTop = chatScrollState.savedScrollTop;
                if (chatScrollState.restoreCount != null) { chatScrollState.restoreCount++; }
                _updateScrollIndicator();
                return;
            }
            if (userInitiated && !isNearChatBottom(target, 4) &&
                    (target.scrollTop < prevTop || !chatScrollState.auto)) {
                chatScrollState.savedScrollTop = target.scrollTop;
                chatScrollState.auto = false;
                // NOTE: do NOT call pauseNativeChat() here. window.cP()/cR() are the
                // site's *server-side* chat pause/resume, and driving them from scroll
                // events trips its flood protection ("don't flood"). Position is held
                // by the anti-yank restore below instead, which is purely local.
                chatScrollState.nativePaused = true;
                chatScrollState.followTicket += 1;
                cancelScheduledChatFollow();
                _updateScrollIndicator();
                return;
            }

            if (isNearChatBottom(target, 56)) {
                if (chatScrollState.auto) {
                    chatScrollState.nativePaused = false;
                    chatScrollState.newMessageCount = 0;
                    chatScrollState.savedScrollTop = null;
                    scheduleChatFollow(false);
                    _updateScrollIndicator();
                } else if (userInitiated && isNearChatBottom(target, 8)) {
                    // User scrolled all the way back to live — re-enable auto
                    chatScrollState.auto = true;
                    chatScrollState.nativePaused = false;
                    chatScrollState.newMessageCount = 0;
                    chatScrollState.savedScrollTop = null;
                    scheduleChatFollow(false);
                    _updateScrollIndicator();
                } else if (!userInitiated && chatScrollState.savedScrollTop != null) {
                    // Site scrolled us to bottom while reading — restore position.
                    // No programmatic window here either, for the same reason as the
                    // anti-yank above: it would swallow the next yank instead of undoing it.
                    target.scrollTop = chatScrollState.savedScrollTop;
                    chatScrollState.lastScrollTop = chatScrollState.savedScrollTop;
                }
                return;
            }

            chatScrollState.savedScrollTop = target.scrollTop;
            chatScrollState.auto = false;
            chatScrollState.nativePaused = true;   // local only — see the note above
            chatScrollState.followTicket += 1;
            cancelScheduledChatFollow();
            _updateScrollIndicator();
        };

        target.addEventListener('scroll', () => {
            chatScrollState.pendingScrollTarget = target;
            if (chatScrollState.scrollRAF !== null) { return; }
            chatScrollState.scrollRAF = requestAnimationFrame(handleScroll);
        }, { passive: true });
    }

    function isNearChatBottom(log, threshold = 48) {
        if (!log) { return true; }
        return (log.scrollHeight - log.scrollTop - log.clientHeight) <= threshold;
    }

    function normalizeText(value = '') {
        return value.replace(/\s+/g, ' ').trim().toLowerCase();
    }

    function _parseTimestamp(rawText) {
        const clean = (rawText || '').replace(/[\[()\]]/g, '').trim();
        const m = clean.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\s*([ap]m))?$/i);
        if (!m) { return null; }
        let h = parseInt(m[1], 10);
        const min = parseInt(m[2], 10);
        const sec = parseInt(m[3] || '0', 10);
        const ampm = (m[4] || '').toLowerCase();
        if (ampm === 'pm' && h < 12) { h += 12; }
        if (ampm === 'am' && h === 12) { h = 0; }
        const now = new Date();
        const ts = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, min, sec, 0);
        if (ts.getTime() > now.getTime() + 60000) { ts.setDate(ts.getDate() - 1); }
        return ts.getTime();
    }

    function _fmt12h(epochMs) {
        const d = new Date(epochMs);
        const ampm = d.getHours() < 12 ? 'am' : 'pm';
        const h12 = d.getHours() % 12 || 12;
        return `${h12}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')} ${ampm}`;
    }

    function _relativeTime(epochMs) {
        const diff = Date.now() - epochMs;
        const mins = Math.floor(diff / 60000);
        if (mins < 1) { return _fmt12h(epochMs); }
        if (mins < 60) { return `${mins}m ago`; }
        const hrs = Math.floor(diff / 3600000);
        if (hrs < 12) { return `${hrs}h ago`; }
        return _fmt12h(epochMs);
    }

    // ── Emote / inline-image disable (persistent) ─────────────────────────────
    function _getDisabledEmotes() {
        try { return new Set(JSON.parse(localStorage.getItem('ichc_disabled_emotes') || '[]')); }
        catch { return new Set(); }
    }
    function _saveDisabledEmotes(set) {
        localStorage.setItem('ichc_disabled_emotes', JSON.stringify([...set]));
    }
    function _toggleEmoteDisabled(url, disabled) {
        const s = _getDisabledEmotes();
        if (disabled) { s.add(url); } else { s.delete(url); }
        _saveDisabledEmotes(s);
    }
    function _emoteCodeFromAnchorOrUrl(anchor, url) {
        const text = (anchor?.textContent || '').trim();
        if (text && text !== url) { return text; }
        try {
            const file = new URL(url).pathname.split('/').pop() || '';
            return file.replace(/\.[^.]+$/, '') || url;
        } catch { return url; }
    }
    function _buildMediaEl(url, type) {
        let el;
        if (type === 'video') {
            el = document.createElement('video');
            el.src = url;
            el.className = 'ichc-chat-inline-img';
            el.autoplay = true; el.loop = true; el.muted = true;
            el.playsInline = true; el.controls = true;
        } else {
            el = document.createElement('img');
            el.src = url;
            el.className = 'ichc-chat-inline-img';
            el.alt = ''; el.referrerPolicy = 'no-referrer';
            el.onerror = () => (el.closest('.ichc-emote-wrap') || el).remove();
        }
        el.addEventListener('click', () => window.open(url, '_blank', 'noopener,noreferrer'));
        return el;
    }
    function _makeEmoteWrap(url, code, type, mediaEl) {
        const wrap = document.createElement('span');
        // True ICHC emotes always have :code: format (e.g. ":doge:").
        // Plain image URLs get a filename-based code — treat those as full-size images.
        const isEmoteCode = /^:.+:$/.test(code);
        wrap.className = isEmoteCode ? 'ichc-emote-wrap' : 'ichc-emote-wrap ichc-inline-image';
        wrap.dataset.ichcEmoteUrl = url;
        wrap.dataset.ichcEmoteCode = code;
        wrap.dataset.ichcEmoteType = type;
        const btn = document.createElement('button');
        btn.className = 'ichc-emote-ban-btn';
        btn.title = 'Hide this emote';
        btn.textContent = '×';
        wrap.appendChild(mediaEl);
        wrap.appendChild(btn);
        return wrap;
    }
    function _makeEmoteLabel(url, code, type) {
        const span = document.createElement('span');
        span.className = 'ichc-emote-disabled-label';
        span.dataset.ichcEmoteUrl = url;
        span.dataset.ichcEmoteCode = code;
        span.dataset.ichcEmoteType = type;
        span.title = 'Click to re-enable';
        span.textContent = code;
        return span;
    }

    // ── @mention highlight ────────────────────────────────────────────────────

    let _myNick = '';

    function _escapeRegex(s) {
        return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Nav/menu links in the page header that are NOT the logged-in username.
    const _NAV_LINK_RE = /^(sign\s?out|sign\s?in|log\s?out|log\s?in|messages?|groups?|post(\s+\w+)?|help|faq|support|store|terms?|privacy|credits?|contact|developers?|directory|safety|status|settings?|emotimemes?|text.?only|dashboard|home|profile|account|report)$/i;

    function _readMyNickFromDom() {
        // modernize.js extracts the logged-in username into this element — use it
        // directly when present.
        const ident = document.getElementById('ichc-userinfo-username');
        if (ident && ident.textContent.trim()) { return ident.textContent.trim(); }
        // Fall back to the native header: the first link that isn't a nav item is
        // the logged-in user's own profile link.
        const links = document.querySelector('.page_header_userlinks');
        if (links) {
            for (const a of links.querySelectorAll('a')) {
                const t = a.textContent.trim();
                if (t && !_NAV_LINK_RE.test(t)) { return t; }
            }
        }
        return '';
    }

    function _fetchMyNick() {
        if (_myNick) { return; }
        function _trySet() {
            const nick = _readMyNickFromDom();
            if (!nick || nick === _myNick) { return !!_myNick; }
            _myNick = nick;
            const log = getChatLog();
            if (log) { _markMentions(log); }
            return true;
        }
        if (_trySet()) { return; }
        // Header can load late — retry a few times, then give up.
        let tries = 0;
        const timer = window.setInterval(() => {
            if (_trySet() || ++tries >= 10) { window.clearInterval(timer); }
        }, 1000);
    }

    function _markMentions(root) {
        if (!_myNick) { return; }
        // Match the nick with an optional leading @, bounded so it doesn't match
        // inside longer words. The author's own name lives in the row's userlink
        // <a>, which _wrapMentionSpans skips — so a match only counts when the name
        // appears in the message body, not when you're the one talking.
        const re = new RegExp('@?\\b' + _escapeRegex(_myNick) + '\\b', 'gi');
        getChatRowsInScope(root).forEach(row => {
            if (row.classList.contains('ichc-chat-event') || row.classList.contains('ichc-bcast-event')) { return; }
            if (row.dataset.ichcMentionNick === _myNick) { return; }
            row.dataset.ichcMentionNick = _myNick;
            const wrapped = _wrapMentionSpans(row, re);
            if (!wrapped) { return; }
            row.classList.add('ichc-mention');
            if (row.dataset.ichcMentionAlerted !== '1') {
                row.dataset.ichcMentionAlerted = '1';
                window.dispatchEvent(new CustomEvent('ichc-mention-alert', {
                    detail: { nick: _myNick, text: (row.textContent || '').trim().slice(0, 240) },
                }));
            }
        });
    }

    function _wrapMentionSpans(row, re) {
        const walker = document.createTreeWalker(row, NodeFilter.SHOW_TEXT);
        const hits = [];
        let n;
        while ((n = walker.nextNode())) {
            if (n.parentElement?.closest('a, .ichc-at-mention')) { continue; }
            re.lastIndex = 0;
            if (re.test(n.textContent)) { hits.push(n); }
        }
        let wrappedCount = 0;
        hits.forEach(textNode => {
            if (!textNode.parentNode) { return; }
            const text = textNode.textContent;
            re.lastIndex = 0;
            const frag = document.createDocumentFragment();
            let last = 0, m;
            while ((m = re.exec(text)) !== null) {
                if (m.index > last) { frag.appendChild(document.createTextNode(text.slice(last, m.index))); }
                const span = document.createElement('span');
                span.className = 'ichc-at-mention';
                span.textContent = m[0];
                frag.appendChild(span);
                last = m.index + m[0].length;
                wrappedCount++;
            }
            if (last < text.length) { frag.appendChild(document.createTextNode(text.slice(last))); }
            textNode.parentNode.replaceChild(frag, textNode);
        });
        return wrappedCount;
    }

    function _wrapNativeSiteEmotes(scope) {
        if (!scope) { return; }
        scope.querySelectorAll('img[id^="emot-"]:not([data-ichc-wrapped])').forEach(img => {
            if (img.closest('.ichc-emote-wrap') || img.closest('.ichc-emote-disabled-label')) { return; }
            const url = img.src;
            if (!url) { return; }
            img.dataset.ichcWrapped = '1';
            const code = (img.alt || img.title || '').trim() || url.split('/').pop().replace(/\.\w+$/, '');
            const parent = img.parentNode;
            const nextSib = img.nextSibling;
            if (!parent) { return; }
            if (_getDisabledEmotes().has(url)) {
                img.replaceWith(_makeEmoteLabel(url, code, 'img'));
            } else {
                const wrap = _makeEmoteWrap(url, code, 'img', img);
                parent.insertBefore(wrap, nextSib || null);
            }
        });
    }

    function getChatPauseNotice() {
        const notice = document.getElementById('errorMessageDiv');
        if (!(notice instanceof HTMLElement)) { return null; }

        const text = normalizeText(notice.textContent || '');
        if (!text) { return null; }
        if (!/scrolling has been paused/.test(text) && !/resume scrolling/.test(text)) {
            return null;
        }

        return notice;
    }

    function hideChatPauseNotice() {
        const notice = document.getElementById('errorMessageDiv');
        if (!(notice instanceof HTMLElement)) { return; }

        notice.style.setProperty('display', 'none', 'important');
        notice.style.setProperty('visibility', 'hidden', 'important');
        notice.style.setProperty('height', '0', 'important');
        notice.style.setProperty('min-height', '0', 'important');
        notice.style.setProperty('margin', '0', 'important');
        notice.style.setProperty('padding', '0', 'important');
        notice.style.setProperty('overflow', 'hidden', 'important');
    }

    function clearNativeChatPause() {
        if (!chatScrollState.auto) { return; }
        // Don't call cR() (which may focus txtMsg) if a non-chat input has focus
        const active = document.activeElement;
        if (active && active.tagName === 'INPUT' && active.id !== 'txtMsg') { return; }
        const notice = getChatPauseNotice();
        if (notice) {
            resumeNativeChat();
            return;
        }
        // If the div has any text we didn't recognise (e.g. a timeout/disconnect
        // message), still call cR() — hiding it silently leaves chat broken.
        const errDiv = document.getElementById('errorMessageDiv');
        if (errDiv instanceof HTMLElement && normalizeText(errDiv.textContent || '')) {
            resumeNativeChat();
            return;
        }
        hideChatPauseNotice();
    }

    function scrollChatToBottom(force = false) {
        if (!force && !chatScrollState.auto) { return; }

        const log = getChatLog();
        const target = getChatScrollTarget();
        if (!target) { return; }

        chatScrollState.programmaticUntil = Date.now() + 260;
        const targets = new Set([target]);
        if (log && log !== target && (log.scrollHeight - log.clientHeight) > 24) {
            targets.add(log);
        }
        targets.forEach(node => {
            node.scrollTop = node.scrollHeight;
        });
    }

    function cancelScheduledChatFollow() {
        if (chatScrollState.followTimer) {
            window.clearTimeout(chatScrollState.followTimer);
            chatScrollState.followTimer = null;
        }
        if (chatScrollState.followRetryTimer) {
            window.clearTimeout(chatScrollState.followRetryTimer);
            chatScrollState.followRetryTimer = null;
        }
        chatScrollState.pendingForce = false;
    }

    function scheduleChatFollow(force = false) {
        if (!force && !chatScrollState.auto) { return; }

        const ticket = ++chatScrollState.followTicket;
        chatScrollState.pendingForce = chatScrollState.pendingForce || force;

        if (chatScrollState.followTimer) {
            return;
        }

        chatScrollState.followTimer = window.setTimeout(() => {
            const useForce = chatScrollState.pendingForce;
            chatScrollState.pendingForce = false;
            chatScrollState.followTimer = null;

            if (ticket !== chatScrollState.followTicket) { return; }
            if (!useForce && !chatScrollState.auto) { return; }

            clearNativeChatPause();
            scrollChatToBottom(useForce);
            hideChatPauseNotice();

            chatScrollState.followRetryTimer = window.setTimeout(() => {
                chatScrollState.followRetryTimer = null;
                if (ticket !== chatScrollState.followTicket) { return; }
                if (!useForce && !chatScrollState.auto) { return; }
                clearNativeChatPause();
                scrollChatToBottom(useForce);
                hideChatPauseNotice();
            }, 110);
        }, 28);
    }

    function bindChatResumeControls() {
        if (chatScrollState.clickBound) { return; }
        chatScrollState.clickBound = true;

        document.addEventListener('click', event => {
            const target = event.target.closest('a, span, div, td');
            if (!target) { return; }

            const control = event.target.closest('.chat_button a');
            if (control) {
                const label = `${control.textContent || ''} ${control.title || ''}`.toLowerCase();
                if (/pause/.test(label) || label.includes('⏸')) {
                    chatScrollState.auto = false;
                    chatScrollState.nativePaused = true;
                    cancelScheduledChatFollow();
                    return;
                }
                if (/play|resume/.test(label) || label.includes('▶')) {
                    chatScrollState.auto = true;
                    chatScrollState.nativePaused = false;
                    resumeNativeChat();
                    scheduleChatFollow(true);
                    return;
                }
            }

            const text = normalizeText(target.textContent || '');
            if (/resume scrolling/.test(text) || /click here to resume scrolling/.test(text)) {
                chatScrollState.auto = true;
                chatScrollState.nativePaused = false;
                resumeNativeChat();
                scheduleChatFollow(true);
                hideChatPauseNotice();
            }
        }, true);
    }

    // Re-process all existing messages when the theme is toggled.
    document.addEventListener('ichc-theme-change', () => {
        const log = getChatLog();
        if (log) { applyChatTheme(log); }
    });

    function initChatScrollSync() {
        const log = getChatLog();
        if (!log) { return; }

        chatScrollState.lastMessageAt = Date.now();

        _fetchMyNick();

        if (log.dataset.ichcThemeReady !== '1') {
            applyChatTheme(log);
            _markMentions(log);
            log.dataset.ichcThemeReady = '1';
        }
        bindChatResumeControls();
        bindChatScrollTargets();
        hideChatPauseNotice();
        clearNativeChatPause();
        // Seed line numbers for rows already loaded, so condensed expiry has a scale
        // to measure against from the first event rather than after the first scroll.
        [...log.children].forEach(_stampLine);
        _scheduleCondensed();
        _restoreChatHistory();       // show what was on screen before the refresh
        _snapshotChatCache();        // seed the cache from whatever is already loaded
        _startChatLossWatcher();     // periodic clear/loss safety net

        const input = document.getElementById('txtMsg');
        if (input && input.dataset.ichcFollowBound !== '1') {
            input.dataset.ichcFollowBound = '1';
            input.addEventListener('keydown', event => {
                if (event.key === 'Enter' && !event.shiftKey) {
                    scheduleChatFollow(true);
                }
            }, true);
        }

        const sendButton = document.getElementById('btn');
        if (sendButton && sendButton.dataset.ichcFollowBound !== '1') {
            sendButton.dataset.ichcFollowBound = '1';
            sendButton.addEventListener('click', () => scheduleChatFollow(true), true);
        }

        if (chatScrollState.observer && chatScrollState.observedRoot !== log) {
            chatScrollState.observer.disconnect();
            chatScrollState.observer = null;
            chatScrollState.observedRoot = null;
        }

        if (!chatScrollState.observer) {
            chatScrollState.observedRoot = log;
            chatScrollState.observer = new MutationObserver(mutations => {
                let sawNewRows = false;

                // Moderator "clear chat" — salvage the wiped rows before anything else.
                if (_handleChatClear(log, mutations)) { return; }
                // A single user's rows vanishing is a silence, not a clear. Checked
                // after the clear handler so a full wipe is never mistaken for one.
                if (_handleSilencedRemoval(log, mutations)) { return; }

                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) {
                            const isInserted = node.classList &&
                                (node.classList.contains('ichc-chat-inline-img') ||
                                 node.classList.contains('ichc-og-card') ||
                                 node.classList.contains('ichc-ts') ||
                                 node.classList.contains('ichc-chat-year-badge') ||
                                 node.classList.contains('ichc-event-collector') ||
                                 node.classList.contains('ichc-year-badge-img') ||
                                 node.classList.contains('ichc-nick-block') ||
                                 node.classList.contains('ichc-nick-sep') ||
                                 node.classList.contains('ichc-emote-wrap') ||
                                 node.classList.contains('ichc-emote-disabled-label') ||
                                 // Our own injected blocks. Without these the observer
                                 // treats them as new chat rows — which stamped the
                                 // condensed bar with a line number and poisoned the
                                 // expiry floor, so no event ever survived to display.
                                 node.classList.contains('ichc-condensed-bar') ||
                                 node.classList.contains('ichc-history-block') ||
                                 node.classList.contains('ichc-history-row') ||
                                 node.classList.contains('ichc-history-divider') ||
                                 node.classList.contains('ichc-muted-row') ||
                                 !!node.closest?.('.ichc-condensed-bar') ||
                                 !!node.closest?.('.ichc-history-block') ||
                                 !!node.closest?.('.ichc-muted-body') ||
                                 !!node.dataset?.ichcEventProcessed ||
                                 !!node.closest?.('.ichc-nick-block') ||
                                 !!node.closest?.('.ichc-event-collector') ||
                                 !!node.closest?.('[data-ichc-event-processed]'));
                            if (!isInserted) {
                                const evType = _classifyEventRow(node);
                                if (evType === 'join' || evType === 'leave') {
                                    const nick = _extractEventNick(node);
                                    if (nick) {
                                        _addToEventCollector(evType, nick, node);
                                    } else {
                                        // Unrecognised event row — theme it but let timer seal
                                        applyChatTheme(node);
                                        sawNewRows = true;
                                    }
                                } else {
                                    // Seal only on real "nick: message" rows — not DOM noise or misclassified events
                                    const a = node.querySelector?.('a.userlink');
                                    if (a) {
                                        const next = a.nextSibling;
                                        if (next?.nodeType === Node.TEXT_NODE && /^\s*:/.test(next.textContent)) {
                                            _scheduleSeal();
                                        }
                                    }
                                    applyChatTheme(node);
                                    _markMentions(node);
                                    _animateChatArrival(node, log);
                                    _stampLine(node);   // line number for condensed expiry
                                    sawNewRows = true;
                                }
                            }
                        } else if (node.nodeType === 3 && mutation.target instanceof Element) {
                            // Skip text updates inside our own inserted elements or processed refRows
                            if (mutation.target.classList.contains('ichc-chat-year-badge') ||
                                mutation.target.classList.contains('ichc-event-collector') ||
                                mutation.target.classList.contains('ichc-ts') ||
                                !!mutation.target.closest?.('[data-ichc-event-processed]')) { return; }
                            applyChatTheme(mutation.target);
                            sawNewRows = true;
                        }
                    });
                });

                if (!sawNewRows) { return; }
                chatScrollState.lastMessageAt = Date.now();
                _scheduleCondensed();   // new lines can push old events out of view
                _scheduleChatSnapshot();
                bindChatScrollTargets();
                if (!chatScrollState.auto) {
                    chatScrollState.newMessageCount++;
                    _updateScrollIndicator();
                    return;
                }
                clearNativeChatPause();
                scheduleChatFollow(false);
            });
            chatScrollState.observer.observe(log, {
                childList: true,
                subtree: true,
            });
        }

        if (chatScrollState.timer) {
            window.clearInterval(chatScrollState.timer);
            chatScrollState.timer = null;
        }

        if (chatScrollState.pauseCheckTimer) {
            window.clearInterval(chatScrollState.pauseCheckTimer);
        }
        chatScrollState.pauseCheckTimer = window.setInterval(() => {
            // Re-attach observer if the site replaced #txt with a new element.
            // This happens during cam refreshes and is the primary cause of chat
            // "freezing" (the observer silently watches a detached element forever).
            const currentLog = getChatLog();
            if (currentLog && currentLog !== chatScrollState.observedRoot) {
                initChatScrollSync();
            }
            // Heartbeat: nudge cR() if no new messages for 12s to keep long-poll alive.
            // When paused, restore scroll position after cR() runs to prevent it jumping to bottom.
            if (chatScrollState.lastMessageAt > 0 &&
                    Date.now() - chatScrollState.lastMessageAt > 12_000) {
                chatScrollState.lastMessageAt = Date.now();
                runInPageContext(`if (typeof window.cR === 'function') { window.cR(); }`);
                if (!chatScrollState.auto && chatScrollState.savedScrollTop != null) {
                    const log = getChatLog();
                    const savedTop = chatScrollState.savedScrollTop;
                    window.setTimeout(() => {
                        if (!chatScrollState.auto && log && log.isConnected) {
                            chatScrollState.programmaticUntil = Date.now() + 300;
                            log.scrollTop = savedTop;
                        }
                    }, 80);
                }
            }
            if (!chatScrollState.auto) { return; }
            // Skip if focus is inside the PM window or on any non-chat input
            // — resumeNativeChat invokes the site's cR() which focuses txtMsg.
            const active = document.activeElement;
            if (active && active.closest?.('#tabs')) { return; }
            if (active && active.tagName === 'INPUT' && active.id !== 'txtMsg') { return; }
            clearNativeChatPause();
        }, 2000);

        if (!chatScrollState.initialized) {
            chatScrollState.initialized = true;
            scheduleChatFollow(true);
        }
    }

    // ─── Auto-dismiss "Support the Site!" modal ──────────────────────────────────

    function dismissSupportModal() {
        const links = document.querySelectorAll('a');
        for (const link of links) {
            if (/not right now/i.test(link.textContent)) {
                link.click();
                return true;
            }
        }
        return false;
    }

    (function initSupportModalDismisser() {
        if (dismissSupportModal()) { return; }
        const obs = new MutationObserver(() => {
            if (dismissSupportModal()) { obs.disconnect(); }
        });
        obs.observe(document.body || document.documentElement, { childList: true, subtree: true });
    })();

    window.addEventListener('ichc-emote-unblocked', e => {
        const url = e.detail?.url;
        if (!url) { return; }
        _toggleEmoteDisabled(url, false);
        document.querySelectorAll(`#txt .ichc-emote-disabled-label[data-ichc-emote-url="${CSS.escape(url)}"]`).forEach(lbl => {
            const code = lbl.dataset.ichcEmoteCode || url;
            const type = lbl.dataset.ichcEmoteType || 'img';
            lbl.replaceWith(_makeEmoteWrap(url, code, type, _buildMediaEl(url, type)));
        });
    });

    window.addEventListener('ichc-emote-blocked', e => {
        const url = e.detail?.url;
        if (!url) { return; }
        _toggleEmoteDisabled(url, true);
        document.querySelectorAll(`#txt .ichc-emote-wrap[data-ichc-emote-url="${CSS.escape(url)}"]`).forEach(w => {
            const code = w.dataset.ichcEmoteCode || url;
            const type = w.dataset.ichcEmoteType || 'img';
            w.replaceWith(_makeEmoteLabel(url, code, type));
        });
    });

    // ── Cam-slot offer: intercept native toasts → inline actionable chat row ──
    const _CAM_OFFER_RE = /offer your cam slot to\s+([^\s,\.!?]+)/i;
    const _seenOfferNodes = new WeakSet();
    const _recentOfferNicks = new Set();

    function _injectCamOfferRow(nick) {
        const key = nick.toLowerCase();
        if (_recentOfferNicks.has(key)) { return; }
        _recentOfferNicks.add(key);
        window.setTimeout(() => _recentOfferNicks.delete(key), 30000);

        const log = getChatLog();
        if (!log) { return; }

        const row = document.createElement('div');
        row.className = 'ichc-slot-offer-row';
        row.dataset.ichcInserted = '1';

        const title = document.createElement('div');
        title.className = 'ichc-slot-offer-title';
        title.textContent = 'Cam slot offer';

        const msg = document.createElement('div');
        msg.className = 'ichc-slot-offer-msg';
        msg.textContent = `Cams are full — offer your slot to ${nick}?`;

        const btns = document.createElement('div');
        btns.className = 'ichc-slot-offer-btns';

        const offerBtn = document.createElement('button');
        offerBtn.type = 'button';
        offerBtn.className = 'ichc-slot-offer-btn ichc-slot-offer-btn-primary';
        offerBtn.textContent = `Offer slot to ${nick}`;
        offerBtn.addEventListener('click', () => {
            runInPageContext(`
                const inp = document.getElementById('txtMsg');
                const snd = document.getElementById('btn');
                if (inp && snd) {
                    inp.value = ${JSON.stringify('/cam offer ' + nick)};
                    snd.click();
                }
            `);
            row.remove();
        });

        const dismissBtn = document.createElement('button');
        dismissBtn.type = 'button';
        dismissBtn.className = 'ichc-slot-offer-btn';
        dismissBtn.textContent = 'Dismiss';
        dismissBtn.addEventListener('click', () => row.remove());

        btns.appendChild(offerBtn);
        btns.appendChild(dismissBtn);
        row.appendChild(title);
        row.appendChild(msg);
        row.appendChild(btns);
        log.appendChild(row);
        log.scrollTop = log.scrollHeight;
    }

    function _tryCamOfferIntercept(node) {
        if (_seenOfferNodes.has(node) || node.nodeType !== 1) { return; }
        // Skip if an ancestor was already handled (avoids duplicate injections for child nodes)
        for (let p = node.parentElement; p; p = p.parentElement) {
            if (_seenOfferNodes.has(p)) { return; }
        }
        const text = node.textContent || '';
        if (!_CAM_OFFER_RE.test(text)) { return; }
        _seenOfferNodes.add(node);
        const match = _CAM_OFFER_RE.exec(text);
        if (!match) { return; }
        node.style.setProperty('display', 'none', 'important');
        _injectCamOfferRow(match[1].trim());
    }

    (function initCamOfferInterceptor() {
        const obs = new MutationObserver(muts => {
            for (const mut of muts) {
                for (const node of mut.addedNodes) {
                    _tryCamOfferIntercept(node);
                }
            }
        });
        obs.observe(document.body || document.documentElement, { childList: true, subtree: true });
    })();

})();
