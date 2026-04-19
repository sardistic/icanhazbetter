(function () {
    'use strict';

    // ─── Shared utilities (duplicated from ichc-theme) ───────────────────────────

    function runInPageContext(source) {
        chrome.runtime.sendMessage({ type: 'ichc-exec', code: source }).catch(() => {});
    }

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
    });

    // ── Chat ──────────────────────────────────────────────────────────────────────

    function resumeNativeChat() {
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
        if (chatScrollState.nativePaused) { return; }
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
        if (styleMatch?.[1]) { return styleMatch[1].trim(); }

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

        return /has joined(?: the room)?|joined the room|has left(?: the room)?|left the room|is now broadcasting|stopped broadcasting|is no longer broadcasting|rebroadcasting|has gone idle|went idle|is idle|is active again/.test(value);
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
        return document.documentElement.classList.contains('ichc-light-theme');
    }

    function applyChatTheme(scope = getChatLog()) {
        const log = getChatLog();
        const root = scope || log;
        if (!log || !root || !(root instanceof Element)) { return; }

        const lightMode = isLightTheme();

        getScopedChatElements(root, 'a').forEach(anchor => {
            if (!isLikelyChatNickAnchor(anchor)) { return; }
            const color = extractChatNickColor(anchor);
            let resolved;
            if (lightMode) {
                // In light mode keep the nick color as-is if it's dark enough,
                // otherwise darken it so it's readable on a light background.
                resolved = color ? (isDarkChatColor(color) ? color : '#1a1d23') : '#1a1d23';
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
            if (isEvent && !row.dataset.ichcTsHidden) {
                row.dataset.ichcTsHidden = '1';
                // 1. Walk text nodes — match H:MM, HH:MM, HH:MM:SS, with optional AM/PM
                const walker = document.createTreeWalker(row, NodeFilter.SHOW_TEXT);
                let tnode;
                while ((tnode = walker.nextNode())) {
                    if (/^\s*\d{1,2}:\d{2}(?::\d{2})?(?:\s*[ap]m)?\s*$/i.test(tnode.textContent)) {
                        const parent = tnode.parentElement;
                        if (parent && parent !== row) { parent.classList.add('ichc-ts'); }
                    }
                }
                // 2. <small> tags are a common timestamp wrapper in icanhazchat
                row.querySelectorAll('small').forEach(el => el.classList.add('ichc-ts'));
                // 3. Table cells with no links and short text are almost always timestamps
                row.querySelectorAll('td').forEach(td => {
                    if (!td.querySelector('a') && td.textContent.trim().length <= 12) {
                        td.classList.add('ichc-ts');
                    }
                });
            }
        });

        // Embed image links as inline images
        getScopedChatElements(root, 'a').forEach(anchor => {
            if (anchor.dataset.ichcImgEmbed) { return; }
            const href = (anchor.getAttribute('href') || '').trim();
            if (!href || /^javascript:/i.test(href)) { return; }

            // Resolve imgur page URLs and gifv to embeddable media
            let embedUrl = null;
            let embedType = 'img'; // 'img' or 'video'

            const imgurPage = href.match(/^https?:\/\/(?:www\.)?imgur\.com\/([a-zA-Z0-9]+)\/?(?:\?[^#]*)?$/i);
            const imgurDirect = href.match(/^https?:\/\/i\.imgur\.com\/([a-zA-Z0-9]+)(\.[a-z0-9]+)?(?:\?[^#]*)?$/i);

            if (imgurPage) {
                embedUrl = 'https://i.imgur.com/' + imgurPage[1] + '.jpg';
                embedType = 'img';
            } else if (imgurDirect) {
                const ext = (imgurDirect[2] || '').toLowerCase();
                if (ext === '.gifv') {
                    embedUrl = 'https://i.imgur.com/' + imgurDirect[1] + '.mp4';
                    embedType = 'video';
                } else if (/^\.(jpe?g|gif|png|webp|mp4)$/.test(ext)) {
                    embedUrl = href;
                    embedType = ext === '.mp4' ? 'video' : 'img';
                }
            } else if (/\.(jpe?g|gif|png|webp)(\?[^#]*)?$/i.test(href)) {
                embedUrl = href;
                embedType = 'img';
            }

            if (!embedUrl) { return; }
            anchor.dataset.ichcImgEmbed = '1';

            let el;
            if (embedType === 'video') {
                el = document.createElement('video');
                el.src = embedUrl;
                el.className = 'ichc-chat-inline-img';
                el.autoplay = true;
                el.loop = true;
                el.muted = true;
                el.playsInline = true;
                el.addEventListener('click', () => { window.open(href, '_blank', 'noopener,noreferrer'); });
            } else {
                el = document.createElement('img');
                el.src = embedUrl;
                el.className = 'ichc-chat-inline-img';
                el.alt = '';
                el.loading = 'lazy';
                el.addEventListener('click', () => { window.open(href, '_blank', 'noopener,noreferrer'); });
            }
            const ref = anchor.nextSibling;
            anchor.parentNode.insertBefore(el, ref || null);
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
        mutationTimer: null,
        pauseCheckTimer: null,
    };

    function getChatLog() {
        return document.getElementById('txt');
    }

    function getChatScrollTarget() {
        return getChatLog();
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

        target.addEventListener('scroll', () => {
            if (Date.now() < chatScrollState.programmaticUntil) { return; }
            hideChatPauseNotice();

            if (isNearChatBottom(target, 56)) {
                chatScrollState.auto = true;
                chatScrollState.nativePaused = false;
                scheduleChatFollow(false);
                return;
            }

            chatScrollState.auto = false;
            chatScrollState.nativePaused = true;
            chatScrollState.followTicket += 1;
            cancelScheduledChatFollow();
        }, { passive: true });
    }

    function isNearChatBottom(log, threshold = 48) {
        if (!log) { return true; }
        return (log.scrollHeight - log.scrollTop - log.clientHeight) <= threshold;
    }

    function normalizeText(value = '') {
        return value.replace(/\s+/g, ' ').trim().toLowerCase();
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
        const notice = getChatPauseNotice();
        if (!notice) {
            hideChatPauseNotice();
            return;
        }
        resumeNativeChat();
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

        if (log.dataset.ichcThemeReady !== '1') {
            applyChatTheme(log);
            log.dataset.ichcThemeReady = '1';
        }
        bindChatResumeControls();
        bindChatScrollTargets();
        hideChatPauseNotice();
        clearNativeChatPause();

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
            const pendingMutations = [];
            chatScrollState.observer = new MutationObserver(mutations => {
                pendingMutations.push(...mutations);
                window.clearTimeout(chatScrollState.mutationTimer);
                chatScrollState.mutationTimer = window.setTimeout(() => {
                    const batch = pendingMutations.splice(0);
                    let sawNewRows = false;

                    batch.forEach(mutation => {
                        mutation.addedNodes.forEach(node => {
                            if (node.nodeType === 1) {
                                applyChatTheme(node);
                                sawNewRows = true;
                            } else if (node.nodeType === 3 && mutation.target instanceof Element) {
                                applyChatTheme(mutation.target);
                                sawNewRows = true;
                            }
                        });
                    });

                    if (!sawNewRows) { return; }
                    bindChatScrollTargets();
                    if (!chatScrollState.auto) { return; }
                    clearNativeChatPause();
                    scheduleChatFollow(false);
                }, 50);
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

})();
