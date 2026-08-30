(function () {
    'use strict';

    // ─── CSS ─────────────────────────────────────────────────────────────────────


    // ─── JS ──────────────────────────────────────────────────────────────────────

    document.addEventListener('DOMContentLoaded', () => {
        replaceIcons();
        polishChatButtons();
        watchBroadcasterPanel();
        watchOwnCamState();
    });

    // ── Icon replacement ──────────────────────────────────────────────────────────

    const ICON_MAP = {
        'control_pause_blue': '⏸',
        'control_play_blue':  '▶',
        'page_white':         '🗑',
        'style':              'Aa',
        'text_chat_bkgnd':    '≡',
        'information':        '🔔',
        'sound':              '🔊',
        'sound_none':         '🔇',
        'color_wheel':        '🎨',
        'heart_delete':       '🙂',
        'images':             '🖼',
        'telephone':          '💬',
        'help':               '?',
        'eye':                '👁',
        'arrow_refresh':      '↻',
        'cam-logo':           '',
    };

    function replaceIcons() {
        document.querySelectorAll('img.smicon, img.cam-logo').forEach(img => {
            const filename = (img.src || '').split('/').pop().replace(/\.[^.]+$/, '');
            if (!(filename in ICON_MAP)) { return; }
            const glyph = ICON_MAP[filename];
            if (glyph === '') { img.style.display = 'none'; return; }
            const span = document.createElement('span');
            span.className = 'ichc-icon-glyph';
            span.dataset.icon = filename;
            span.textContent = glyph;
            span.title = img.title || img.alt || '';
            span.style.cssText = 'font-size:16px;line-height:1;cursor:pointer;user-select:none;' +
                'display:inline-flex;align-items:center;justify-content:center;';
            img.replaceWith(span);
        });
    }

    function polishChatButtons() {
        document.querySelectorAll('.chat_button a').forEach(anchor => {
            const iconNode = anchor.querySelector('span, font, img, .smicon');
            if (iconNode) {
                [...anchor.childNodes]
                    .filter(node => node.nodeType === Node.TEXT_NODE)
                    .forEach(node => node.remove());
            }
            const label = (anchor.title || anchor.getAttribute('aria-label') || anchor.textContent || '').trim();
            if (label) {
                anchor.setAttribute('aria-label', label);
            }
        });
    }

    function initChatCommandBar() {
        document.querySelectorAll('.room_command_bar').forEach(bar => {
            if (bar.dataset.ichcBound === '1') { return; }
            bar.dataset.ichcBound = '1';

            bar.addEventListener('click', event => {
                const anchor = event.target.closest('.chat_button a');
                if (!anchor) { return; }

                event.preventDefault();
                invokeNativeElementAction(anchor.closest('a, button, [onclick], [href]') || anchor);
            }, true);
        });
    }

    // Runs `source` in the PAGE's own JS realm, via the background service worker.
    //
    // A previous attempt injected a <script> element directly instead. Do not do
    // that: this function is reachable at document_start, when <head> does not yet
    // exist, so the element lands as a child of <html> mid-parse and wrecks the
    // page. It is reverted.
    //
    // What IS kept from that attempt is the engine guard. Firefox's `chrome.*`
    // alias is callback-based, so sendMessage returns undefined there and
    // `.catch()` on the result is a TypeError that aborts the CALLER — the message
    // is dispatched (the call precedes the property access), so the damage is to
    // whatever the caller meant to do next, silently.
    function runInPageContext(source) {
        try {
            const api = (typeof browser !== 'undefined' && browser.runtime) ? browser : chrome;
            const ret = api.runtime.sendMessage({ type: 'ichc-exec', code: source });
            if (ret && typeof ret.catch === 'function') { ret.catch(() => {}); }
        } catch (_) {}
    }

    function setLiveState(isLive) {
        const btn = document.querySelector('a.ichc-broadcast-btn');
        if (!btn) { return; }
        btn.classList.toggle('ichc-live', isLive);
        // When the 3D rolodex prism is mounted, its faces show GO/STOP and it flips
        // itself off the .ichc-live class — writing textContent here would clobber the
        // whole prism with a plain text label. Only update the label on the plain button.
        if (!btn.classList.contains('ichc-rolo-btn')) {
            const label = btn.querySelector('span:not(.ichc-btn-icon-lg)');
            if (label) { label.textContent = isLive ? 'Stop Live' : 'Go Live'; }
        }
        // Going off live must not refresh the inbound cam list. A global refresh
        // tears down and renegotiates every viewer connection, which makes the
        // remaining cams stutter and can feed protocol list events back into more
        // refresh activity. Manual and per-feed refresh controls handle recovery.
    }

    // ── Real broadcast state, instead of guessing from click text ───────────────
    // The live flag used to be inferred purely from what the clicked element said,
    // and the inference was inverted for the stop control. The site sets
    //     $("#dude").html("stop broadcasting")
    // while broadcasting, and the panel's stop control reads similarly — so a
    // /broadcast/i test matches the STOP control and marked us LIVE at the exact
    // moment the user was going down. A second listener corrected it only when the
    // control happened to be an <a>; on a <button> or <div> it stuck on "live",
    // which is the cam-down button then doing the wrong thing on the next click.
    //
    // Click text is now only an optimistic hint. The authoritative signal is
    // whether the local user's own cam is on screen.
    function _selfNick() {
        return document.getElementById('ichc-userinfo-username')?.textContent?.trim().toLowerCase() || '';
    }

    function _selfCamPresent() {
        const me = _selfNick();
        if (!me) { return null; }   // unknown — no opinion
        const cams = document.getElementById('cams');
        if (!cams) { return null; }
        for (const el of cams.querySelectorAll('.name-on-cam')) {
            if ((el.textContent || '').trim().toLowerCase() === me) { return true; }
        }
        return false;
    }

    // Self-calibrating: the "absent" answer is only trusted once a cam for this
    // user has actually been seen at least once. If this site did not render your
    // own cam in the list, absence would otherwise clear the live flag the moment
    // you started broadcasting — worse than the bug being fixed. Presence is always
    // trustworthy: if your cam is up, you are broadcasting.
    let _selfCamEverSeen = false;

    function syncLiveFromCams() {
        const present = _selfCamPresent();
        if (present === null) { return; }
        if (present) {
            _selfCamEverSeen = true;
            setLiveState(true);
        } else if (_selfCamEverSeen) {
            setLiveState(false);
        }
    }

    let _liveSyncTimer = null;
    function scheduleLiveSync(delay) {
        if (_liveSyncTimer) { return; }
        _liveSyncTimer = window.setTimeout(() => {
            _liveSyncTimer = null;
            syncLiveFromCams();
        }, delay || 300);
    }

    function watchOwnCamState() {
        const attach = () => {
            const cams = document.getElementById('cams');
            if (!cams || cams.dataset.ichcLiveWatched === '1') { return !!cams; }
            cams.dataset.ichcLiveWatched = '1';
            // Debounced: cam churn produces bursts of childList records.
            new MutationObserver(() => scheduleLiveSync(300)).observe(cams, { childList: true, subtree: true });
            syncLiveFromCams();
            return true;
        };
        if (!attach()) {
            const wait = new MutationObserver(() => { if (attach()) { wait.disconnect(); } });
            wait.observe(document.documentElement, { childList: true, subtree: true });
        }
    }

    function watchBroadcasterPanel() {
        const seen = new WeakSet();

        // When Go Live/Stop Live button is clicked: clear closed state and sync live flag
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.ichc-broadcast-btn');
            if (!btn) { return; }
            const panel = document.getElementById('rtc-broadcaster');
            if (panel) { panel.classList.remove('ichc-panel-closed'); }
            if (btn.classList.contains('ichc-live')) {
                setLiveState(false);
            }
        }, true);

        const setupPanel = () => {
            const panel = document.getElementById('rtc-broadcaster');
            if (!panel || seen.has(panel)) { return; }
            seen.add(panel);

            // Close button. Guarded on the DOM, not just the `seen` Set: if this setup
            // ever runs twice each pass gets its own Set and the panel ends up with two
            // buttons sharing one id (observed in the live markup).
            if (panel.querySelector('#ichc-broadcaster-close')) { return; }
            const btn = document.createElement('button');
            btn.type = 'button';
        btn.id = 'ichc-broadcaster-close';
            btn.textContent = '✕';
            btn.title = 'Close';
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopImmediatePropagation();
                panel.classList.add('ichc-panel-closed');
                setLiveState(false);
            });
            panel.insertBefore(btn, panel.firstChild);

            // Optimistic hint only — syncLiveFromCams() is the authority and will
            // correct this within a moment either way.
            //
            // "stop" is checked FIRST and wins. The site labels its stop control
            // "stop broadcasting", which matches /broadcast/i just as well as the
            // start control does, so testing for start first marked the user LIVE
            // at the moment they went down. That is the cam-down bug: the button
            // then showed the wrong state and the next click did the opposite of
            // what it said.
            //
            // The stop test is also no longer restricted to <a>: it previously
            // corrected the mistake only when the control happened to be a link.
            panel.addEventListener('click', (e) => {
                if (e.target.closest('#ichc-broadcaster-close')) { return; }
                const el = e.target.closest('button, a, input, [onclick]') || e.target;
                const text = (el.textContent || '').trim() || el.value || '';
                if (/\bstop\b/i.test(text)) {
                    setLiveState(false);
                } else if (/broadcast/i.test(text)) {
                    setLiveState(true);
                }
                // Whatever the label said, confirm against the real cam list. The
                // site takes a moment to bring the stream up or down.
                [400, 1500, 4000].forEach(d => window.setTimeout(syncLiveFromCams, d));
            });
        };
        // Run once up front as well as on mutation. Attaching only from inside the
        // observer meant that if #rtc-broadcaster already existed when this ran, the
        // callback never fired and the panel got no close button and no click
        // handlers at all — so the live state was never updated from it.
        setupPanel();
        const mo = new MutationObserver(setupPanel);
        mo.observe(document.body, { childList: true, subtree: true });
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
            if (/^\\s*javascript:/i.test(nativeHref)) {
                const js = nativeHref.replace(/^\\s*javascript:\\s*/i, '');
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

})();
