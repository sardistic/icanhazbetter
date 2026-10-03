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
        if (btn) {
            btn.classList.toggle('ichc-live', isLive);
            // The header prism follows .ichc-live; plain buttons still need text.
            if (!btn.classList.contains('ichc-rolo-btn')) {
                const label = btn.querySelector('span:not(.ichc-btn-icon-lg)');
                if (label) { label.textContent = isLive ? 'Stop Live' : 'Go Live'; }
            }
        }
        const panel = document.getElementById('rtc-broadcaster');
        panel?.classList.toggle('ichc-is-live', isLive);
        const panelTitle = panel?.querySelector('.ichc-broadcaster-title');
        if (panelTitle) { panelTitle.textContent = isLive ? 'Live camera' : 'Go live'; }
        panel?.querySelector('#publish-toggle')?._ichcRoloSync?.(isLive);
        // Going off live must not refresh the inbound cam list. A global refresh
        // tears down and renegotiates every viewer connection, which makes the
        // remaining cams stutter and can feed protocol list events back into more
        // refresh activity. Manual and per-feed refresh controls handle recovery.
    }

    function mountPublishGlass(panel) {
        const btn = panel.querySelector('#publish-toggle');
        if (!btn || btn.querySelector('.ichc-publish-glass-content')) { return; }
        // The site replaces the button contents when publish state changes. Restore
        // our content while retaining the native button and its click handler.
        if (btn._ichcGlassNode) {
            const nativeLabel = (btn.textContent || '').trim();
            btn.replaceChildren(btn._ichcGlassShadow, btn._ichcGlassNode);
            if (/\bstop\b/i.test(nativeLabel)) { btn._ichcRoloSync?.(true); }
            else if (/\bbroadcast\b/i.test(nativeLabel)) { btn._ichcRoloSync?.(false); }
            return;
        }
        btn._ichcRoloCleanup?.();
        const nativeLabel = (btn.textContent || '').trim();
        const topButton = document.querySelector('a.ichc-broadcast-btn');
        let isLive = /\bstop\b/i.test(nativeLabel) || !!topButton?.classList.contains('ichc-live');
        btn.classList.add('ichc-publish-glass-btn');
        const broadcastIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/></svg>';
        const liveIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/></svg>';
        btn.innerHTML = '<span class="ichc-glass-drop-shadow" aria-hidden="true"></span>' +
            '<span class="ichc-publish-glass-content" aria-hidden="true">' +
            '<span class="ichc-publish-glass-icon"></span>' +
            '<span class="ichc-publish-glass-label"></span></span>';
        btn._ichcGlassNode = btn.querySelector('.ichc-publish-glass-content');
        btn._ichcGlassShadow = btn.querySelector('.ichc-glass-drop-shadow');
        const icon = btn.querySelector('.ichc-publish-glass-icon');
        const label = btn.querySelector('.ichc-publish-glass-label');
        const listeners = new AbortController();
        const listenerOptions = { signal: listeners.signal };
        const paint = () => {
            btn.classList.toggle('ichc-publish-live', isLive);
            btn.setAttribute('aria-label', isLive ? 'Broadcast is live. Close this window to stop.' : 'Start broadcasting');
            icon.innerHTML = isLive ? liveIcon : broadcastIcon;
            label.textContent = isLive ? 'LIVE' : 'BROADCAST';
        };
        paint();
        btn._ichcRoloIsLive = () => isLive;
        btn._ichcRoloSync = nextLive => {
            if (nextLive !== isLive) {
                isLive = nextLive;
                paint();
            }
        };
        btn.addEventListener('pointermove', event => {
            const rect = btn.getBoundingClientRect();
            const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
            const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
            btn.style.setProperty('--ichc-glass-shadow-x', `${Math.round((.5 - x) * 9)}px`);
            btn.style.setProperty('--ichc-glass-shadow-y', `${Math.round((.5 - y) * 9 + 5)}px`);
        }, listenerOptions);
        const resetLight = () => {
            btn.style.removeProperty('--ichc-glass-shadow-x');
            btn.style.removeProperty('--ichc-glass-shadow-y');
        };
        btn.addEventListener('pointerleave', resetLight, listenerOptions);
        btn.addEventListener('pointercancel', resetLight, listenerOptions);
        btn.addEventListener('click', event => {
            if (isLive && event.isTrusted) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        }, { capture: true, signal: listeners.signal });
        btn._ichcRoloCleanup = () => {
            listeners.abort();
            resetLight();
        };
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
        const margin = 8;
        const clamp = (value, low, high) => Math.max(low, Math.min(value, Math.max(low, high)));
        const shown = panel => !!panel && !panel.classList.contains('ichc-panel-closed') &&
            getComputedStyle(panel).display !== 'none';
        const moveTo = (panel, x, y) => {
            panel.style.setProperty('--ichc-popup-x', clamp(x, margin, innerWidth - panel.offsetWidth - margin) + 'px');
            panel.style.setProperty('--ichc-popup-y', clamp(y, margin, innerHeight - panel.offsetHeight - margin) + 'px');
        };
        const keepOnScreen = panel => {
            if (!shown(panel)) { return; }
            const rect = panel.getBoundingClientRect();
            moveTo(panel, rect.left, rect.top);
        };
        const fitBroadcasterPanel = panel => {
            const preview = panel.querySelector('#publisher-video');
            if (!preview) { return; }
            preview.style.removeProperty('height');
            preview.style.removeProperty('max-height');
            const overflow = panel.scrollHeight - (innerHeight - 16);
            if (overflow > 0) {
                const height = Math.max(90, preview.getBoundingClientRect().height - overflow - 8);
                preview.style.setProperty('height', height + 'px', 'important');
                preview.style.setProperty('max-height', height + 'px', 'important');
            }
        };
        const placeUnderButton = (panel, anchor) => {
            if (!shown(panel) || panel._ichcMoved) { return; }
            fitBroadcasterPanel(panel);
            const source = anchor || document.querySelector('a.ichc-broadcast-btn');
            if (!source) { keepOnScreen(panel); return; }
            const rect = source.getBoundingClientRect();
            const width = panel.offsetWidth;
            const height = panel.offsetHeight;
            const below = rect.bottom + 8;
            const above = rect.top - height - 8;
            moveTo(panel, rect.left + rect.width / 2 - width / 2,
                below + height <= innerHeight - margin ? below : above >= margin ? above : below);
        };
        const stopAndClose = panel => {
            if (!shown(panel)) { return; }
            const wasLive = panel.querySelector('#publish-toggle')?._ichcRoloIsLive?.() ||
                document.querySelector('a.ichc-broadcast-btn')?.classList.contains('ichc-live');
            panel._ichcClosing = !!wasLive;
            panel.classList.add('ichc-panel-closed');
            const sample = panel.querySelector('.ichc-glass-sample');
            sample?.getContext('2d')?.clearRect(0, 0, sample.width, sample.height);
            if (wasLive) {
                // Read the publisher's real state in the page realm before using its
                // native toggle. A stale visual Live state must never start a stream.
                runInPageContext(`(() => {
                    const state = window.ichcWebRTCPublish?.getState?.();
                    if (state?.publishing || state?.connectionState === 'connected') {
                        document.getElementById('publish-toggle')?.click();
                    }
                })();`);
                setLiveState(false);
                [400, 1500, 4000].forEach(delay => window.setTimeout(syncLiveFromCams, delay));
            }
        };

        const arrangeControls = panel => {
            const settings = panel.querySelector('#publish-settings');
            if (!settings) { return; }
            const camera = settings.querySelector('#camera-toggle')?.closest('.row');
            const microphone = settings.querySelector('#mute-toggle')?.closest('.row');
            const action = settings.querySelector('#publish-toggle')?.closest('.row');
            if (!camera || !microphone || !action) { return; }
            camera.classList.add('ichc-camera-input-row');
            microphone.classList.add('ichc-mic-input-row');
            action.classList.add('ichc-publish-action-row');
            panel.classList.add('ichc-broadcaster-compact');
            const stage = panel.querySelector('#publish-content > .row');
            const videoContainer = panel.querySelector('#publish-video-container');
            // The site's video container sits inside a Bootstrap column. That
            // column is the grid item; spanning the inner container alone leaves
            // an empty row beneath the preview.
            let previewColumn = videoContainer;
            while (stage && previewColumn && previewColumn.parentElement !== stage) {
                previewColumn = previewColumn.parentElement;
            }
            if (stage && previewColumn) {
                previewColumn.classList.add('ichc-publish-preview-column');
            }
            if (stage && !stage.querySelector(':scope > .ichc-glass-sample')) {
                const sample = document.createElement('canvas');
                sample.className = 'ichc-glass-sample';
                sample.width = 72;
                sample.height = 72;
                sample.setAttribute('aria-hidden', 'true');
                stage.appendChild(sample);
            }
            const devices = [
                [camera, 'Camera', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/></svg>'],
                [microphone, 'Microphone', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4m-4 0h8"/></svg>'],
            ];
            for (const [row, device, iconMarkup] of devices) {
                const select = row.querySelector('select');
                const picker = select?.closest('.col-10') || select?.parentElement;
                if (!select || !picker) { continue; }
                picker.classList.add('ichc-device-picker');
                select.setAttribute('aria-label', `Input ${device.toLowerCase()}`);
                const updateTitle = () => {
                    select.title = `${device}: ${select.selectedOptions[0]?.textContent?.trim() || 'Choose device'}`;
                };
                if (select.dataset.ichcDevicePicker !== '1') {
                    select.dataset.ichcDevicePicker = '1';
                    select.addEventListener('change', updateTitle);
                }
                updateTitle();
                if (!picker.querySelector('.ichc-device-picker-icon')) {
                    const icon = document.createElement('span');
                    icon.className = 'ichc-device-picker-icon';
                    icon.setAttribute('aria-hidden', 'true');
                    icon.innerHTML = iconMarkup;
                    picker.appendChild(icon);
                }
            }
        };

        // Keep the original native open path: clear our closed class on the header
        // click and let the site's handler create or show the broadcaster panel.
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.ichc-broadcast-btn');
            if (!btn) { return; }
            const existing = document.getElementById('rtc-broadcaster');
            if (existing) {
                existing._ichcMoved = false;
                existing._ichcClosing = false;
                existing.classList.remove('ichc-panel-closed');
            }
            const reveal = () => {
                const panel = document.getElementById('rtc-broadcaster');
                if (!panel) { return; }
                panel._ichcClosing = false;
                panel.classList.remove('ichc-panel-closed');
                placeUnderButton(panel, btn);
            };
            requestAnimationFrame(reveal);
            window.setTimeout(reveal, 120);
            window.setTimeout(reveal, 500);
        }, true);

        document.addEventListener('pointerdown', e => {
            const panel = document.getElementById('rtc-broadcaster');
            if (!shown(panel) || panel.contains(e.target) || e.target.closest?.('.ichc-broadcast-btn')) { return; }
            stopAndClose(panel);
        }, true);
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') { stopAndClose(document.getElementById('rtc-broadcaster')); }
        }, true);
        window.addEventListener('resize', () => {
            const panel = document.getElementById('rtc-broadcaster');
            if (shown(panel)) { fitBroadcasterPanel(panel); keepOnScreen(panel); }
        });

        const setupPanel = () => {
            const panel = document.getElementById('rtc-broadcaster');
            if (!panel) { return; }
            mountPublishGlass(panel);
            arrangeControls(panel);
            if (seen.has(panel)) { return; }
            seen.add(panel);
            // A tiny, low-rate copy supplies the preview's colors to the glass
            // column without putting controls over the actual camera image.
            const sampleTimer = window.setInterval(() => {
                if (!panel.isConnected) { window.clearInterval(sampleTimer); return; }
                if (!shown(panel)) { return; }
                const preview = panel.querySelector('#publisher-video');
                const sample = panel.querySelector('.ichc-glass-sample');
                if (!sample) { return; }
                const context = sample.getContext('2d');
                if (!preview || preview.readyState < 2 || !preview.videoWidth) {
                    context?.clearRect(0, 0, sample.width, sample.height);
                    return;
                }
                try {
                    // Continue the preview's right-edge colors into the controls.
                    const sourceX = Math.floor(preview.videoWidth * .68);
                    context?.drawImage(preview, sourceX, 0,
                        preview.videoWidth - sourceX, preview.videoHeight,
                        0, 0, sample.width, sample.height);
                } catch (_) { /* A non-readable native video leaves the neutral glass fallback. */ }
            }, 250);

            let handle = panel.querySelector('.ichc-broadcaster-handle');
            if (!handle) {
                handle = document.createElement('div');
                handle.className = 'ichc-broadcaster-handle';
                handle.title = 'Drag window';
                panel.insertBefore(handle, panel.firstChild);
            }
            handle.addEventListener('pointerdown', e => {
                if (e.button !== 0) { return; }
                const rect = panel.getBoundingClientRect();
                const startX = e.clientX;
                const startY = e.clientY;
                const originalX = rect.left;
                const originalY = rect.top;
                panel._ichcMoved = true;
                handle.setPointerCapture(e.pointerId);
                const move = event => moveTo(panel,
                    originalX + event.clientX - startX,
                    originalY + event.clientY - startY);
                const finish = () => {
                    handle.removeEventListener('pointermove', move);
                    handle.removeEventListener('pointerup', finish);
                    handle.removeEventListener('pointercancel', finish);
                };
                handle.addEventListener('pointermove', move);
                handle.addEventListener('pointerup', finish);
                handle.addEventListener('pointercancel', finish);
            });

            // Guarded on the DOM because the native panel can be rebuilt.
            if (panel.querySelector('#ichc-broadcaster-close')) { return; }
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.id = 'ichc-broadcaster-close';
            btn.textContent = '✕';
            btn.title = 'Close and stop broadcast';
            btn.setAttribute('aria-label', 'Close and stop broadcast');
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopImmediatePropagation();
                stopAndClose(panel);
            });
            panel.insertBefore(btn, handle.nextSibling);
            if (typeof ResizeObserver === 'function') {
                new ResizeObserver(() => keepOnScreen(panel)).observe(panel);
            }
            panel.querySelector('#publisher-video')?.addEventListener('loadedmetadata', () => {
                fitBroadcasterPanel(panel);
                keepOnScreen(panel);
            });
            requestAnimationFrame(() => placeUnderButton(panel));

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
                if (panel._ichcClosing) { scheduleLiveSync(300); return; }
                const el = e.target.closest('button, a, input, [onclick]') || e.target;
                const publishToggle = el.closest?.('#publish-toggle');
                const text = (el.textContent || '').trim() || el.value || '';
                if (publishToggle?._ichcRoloIsLive) {
                    setLiveState(!publishToggle._ichcRoloIsLive());
                } else if (/\bstop\b/i.test(text)) {
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
