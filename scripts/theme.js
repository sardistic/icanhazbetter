(function () {
    'use strict';

    // ─── CSS ─────────────────────────────────────────────────────────────────────


    // ─── JS ──────────────────────────────────────────────────────────────────────

    document.addEventListener('DOMContentLoaded', () => {
        replaceIcons();
        polishChatButtons();
        watchBroadcasterPanel();
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

    function runInPageContext(source) {
        chrome.runtime.sendMessage({ type: 'ichc-exec', code: source }).catch(() => {});
    }

    function watchBroadcasterPanel() {
        const seen = new WeakSet();

        // When Go Live button is clicked, un-close the panel before the site shows it
        document.addEventListener('click', (e) => {
            if (e.target.closest('.ichc-broadcast-btn')) {
                const panel = document.getElementById('rtc-broadcaster');
                if (panel) { panel.classList.remove('ichc-panel-closed'); }
            }
        }, true);

        const mo = new MutationObserver(() => {
            const panel = document.getElementById('rtc-broadcaster');
            if (!panel || seen.has(panel)) { return; }
            seen.add(panel);

            // Close button
            const btn = document.createElement('button');
            btn.id = 'ichc-broadcaster-close';
            btn.textContent = '✕';
            btn.title = 'Close';
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopImmediatePropagation();
                panel.classList.add('ichc-panel-closed');
                document.dispatchEvent(new CustomEvent('ichc-live-stop'));
            });
            panel.insertBefore(btn, panel.firstChild);

            // Detect "Broadcast!" click → user just went live
            panel.addEventListener('click', (e) => {
                const target = e.target.closest('button, a, input[type="submit"]');
                if (target && target.id !== 'ichc-broadcaster-close' &&
                    /broadcast/i.test(target.textContent.trim())) {
                    document.dispatchEvent(new CustomEvent('ichc-live-start'));
                }
            });

            // Detect "or stop" / stop link click → user stopped broadcasting
            panel.addEventListener('click', (e) => {
                const target = e.target.closest('a');
                if (target && /\bstop\b/i.test(target.textContent.trim())) {
                    document.dispatchEvent(new CustomEvent('ichc-live-stop'));
                }
            });
        });
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
