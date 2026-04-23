(function () {
    'use strict';

    const PM_STATE_KEY = 'ichc_pm_state_v1';

    // Set localStorage.ichcPmLog = '1' in the browser console to enable debug logging.
    const _D = (localStorage.getItem('ichcPmLog') === '1')
        ? (...a) => console.log('[ichc-pm]', ...a)
        : () => {};

    _D('pm.js loaded');

    const pmState = {
        saveTimer: null,
        mountObserver: null,
        tabsObserver: null,
        resizeObserver: null,
        suppressClickUntil: 0,
        syncTimer: null,
        boundRoot: null,
        pointerSaveBound: false,
        resizeHandle: null,
        pollTimer: null,
    };

    // ─── Shared helpers ──────────────────────────────────────────────────────────

    function runInPageContext(source) {
        chrome.runtime.sendMessage({ type: 'ichc-exec', code: source }).catch(() => {});
    }

    function clampValue(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function escapeHtml(value = '') {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function normalizeText(value = '') {
        return value.replace(/\s+/g, ' ').trim().toLowerCase();
    }

    function isCompactChatEventText(text = '') {
        const value = normalizeText(text);
        if (!value) { return false; }
        return /has joined(?: the room)?|joined the room|has left(?: the room)?|left the room|is now broadcasting|stopped broadcasting|is no longer broadcasting|rebroadcasting|has gone idle|went idle|is idle|is active again/.test(value);
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
            if (color && !isThemeManagedChatColor(color)) { return color; }
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

    // ─── PM state persistence ─────────────────────────────────────────────────────

    function loadPmState() {
        try {
            const saved = JSON.parse(localStorage.getItem(PM_STATE_KEY) || '{}');
            return {
                active: typeof saved.active === 'string' ? saved.active : '',
                geometry: saved.geometry && typeof saved.geometry === 'object' ? saved.geometry : null,
                conversations: Array.isArray(saved.conversations) ? saved.conversations : [],
            };
        } catch (_) {
            return { active: '', geometry: null, conversations: [] };
        }
    }

    function savePmState(nextState) {
        const conversations = Array.isArray(nextState?.conversations)
            ? nextState.conversations.slice(0, 12)
            : [];
        if (!conversations.length) {
            if (hasLivePmTabs()) { return; }
            localStorage.removeItem(PM_STATE_KEY);
            return;
        }
        const payload = JSON.stringify({
            active: nextState?.active || conversations[0]?.key || '',
            geometry: nextState?.geometry || null,
            conversations,
        });
        if (localStorage.getItem(PM_STATE_KEY) === payload) { return; }
        localStorage.setItem(PM_STATE_KEY, payload);
    }

    // ─── DOM helpers ─────────────────────────────────────────────────────────────

    function getPmRoot() {
        return document.getElementById('tabs');
    }

    function getPmTabItems(root = getPmRoot()) {
        if (!root) { return []; }
        // Prefer canonical: direct children of #tab_list.
        const byList = [...root.querySelectorAll('#tab_list > li[id^="pm_"]')];
        if (byList.length) { return byList; }
        // Fallback: site may use a ul without id="tab_list".
        const bySubtree = [...root.querySelectorAll('li[id^="pm_"]')];
        if (bySubtree.length) { return bySubtree; }
        // Last resort: any li inside a tabs nav (for non-standard id formats).
        const byNav = [...root.querySelectorAll('.ui-tabs-nav li, #tab_list li')];
        if (byNav.length) {
            _D('getPmTabItems: using nav fallback, ids:', byNav.map(t => t.id));
        }
        return byNav;
    }

    function getPmKeyFromId(id = '', prefix = '') {
        return id.startsWith(prefix) ? id.slice(prefix.length) : '';
    }

    function getPmGeometry(root) {
        const rect = root.getBoundingClientRect();
        return {
            left: Math.round(rect.left),
            top: Math.round(rect.top),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
        };
    }

    function getDefaultPmGeometry() {
        const width = clampValue(Math.round(window.innerWidth * 0.28), 360, Math.min(520, window.innerWidth - 24));
        const height = clampValue(Math.round(window.innerHeight * 0.42), 260, Math.min(460, window.innerHeight - 88));
        return {
            width,
            height,
            left: Math.max(12, window.innerWidth - width - 22),
            top: Math.max(76, window.innerHeight - height - 26),
        };
    }

    function applyPmGeometry(root, geometry = null) {
        if (!root) { return; }
        const fallback = getDefaultPmGeometry();
        const width = clampValue(Number(geometry?.width) || fallback.width, 320, Math.max(320, window.innerWidth - 20));
        const height = clampValue(Number(geometry?.height) || fallback.height, 240, Math.max(240, window.innerHeight - 76));
        const left = clampValue(
            Number(geometry?.left),
            10,
            Math.max(10, window.innerWidth - width - 10),
        );
        const top = clampValue(
            Number(geometry?.top),
            52,
            Math.max(52, window.innerHeight - height - 10),
        );
        const finalLeft = Number.isFinite(left) ? left : fallback.left;
        const finalTop = Number.isFinite(top) ? top : fallback.top;
        root.style.setProperty('position', 'fixed', 'important');
        root.style.setProperty('left', `${finalLeft}px`, 'important');
        root.style.setProperty('top', `${finalTop}px`, 'important');
        root.style.setProperty('width', `${width}px`, 'important');
        root.style.setProperty('height', `${height}px`, 'important');
        root.style.setProperty('right', 'auto', 'important');
        root.style.setProperty('bottom', 'auto', 'important');
        root.style.setProperty('display', 'flex', 'important');
        root.style.setProperty('visibility', 'visible', 'important');
        root.dataset.ichcPmGeometryApplied = '1';

        const handleEl = pmState.resizeHandle;
        if (handleEl) {
            handleEl.style.setProperty('left', `${finalLeft + width - 18}px`, 'important');
            handleEl.style.setProperty('top', `${finalTop + height - 18}px`, 'important');
            handleEl.style.removeProperty('display');
        }
    }

    function hidePmRoot(root) {
        if (!root) { return; }
        _D('hidePmRoot');
        root.style.setProperty('display', 'none', 'important');
        if (pmState.resizeHandle) {
            pmState.resizeHandle.style.setProperty('display', 'none', 'important');
        }
    }

    function showPmRoot(root) {
        if (!root) { return; }
        root.style.setProperty('display', 'flex', 'important');
        root.style.setProperty('visibility', 'visible', 'important');
        if (pmState.resizeHandle) {
            pmState.resizeHandle.style.removeProperty('display');
            syncResizeHandle(root);
        }
    }

    function syncResizeHandle(root) {
        const handle = pmState.resizeHandle;
        if (!handle || !root) { return; }
        const rect = root.getBoundingClientRect();
        handle.style.setProperty('left', `${rect.right - 18}px`, 'important');
        handle.style.setProperty('top', `${rect.bottom - 18}px`, 'important');
    }

    function snapshotPmHtml(container) {
        if (!container) { return ''; }
        const nodes = [...container.childNodes]
            .filter(node => node.nodeType === 1 || normalizeText(node.textContent || ''));
        const kept = nodes.slice(-180);
        return kept.map(node => {
            if (node.nodeType === 1) { return node.outerHTML; }
            return `<div>${escapeHtml(node.textContent || '')}</div>`;
        }).join('');
    }

    function collectPmState(root = getPmRoot()) {
        if (!root) {
            return { active: '', geometry: null, conversations: [] };
        }
        const active = getPmTabItems(root)
            .find(tab => tab.classList.contains('ui-tabs-active'))
            ?.id.replace(/^pm_/, '') || '';
        const conversations = getPmTabItems(root).map(tab => {
            const key = getPmKeyFromId(tab.id, 'pm_');
            const panel = root.querySelector(`#from_${CSS.escape(key)}`);
            const convo = panel?.querySelector(`#msgs_${CSS.escape(key)}`);
            const input = panel?.querySelector(`#txt_to_${CSS.escape(key)}`);
            return {
                key,
                title: tab.querySelector('a')?.textContent.trim() || key,
                html: snapshotPmHtml(convo),
                inputValue: input?.value || '',
                scrollTop: convo?.scrollTop || 0,
            };
        }).filter(item => item.key);
        return {
            active,
            geometry: getPmGeometry(root),
            conversations,
        };
    }

    function schedulePmSave(delay = 320) {
        window.clearTimeout(pmState.saveTimer);
        pmState.saveTimer = window.setTimeout(() => {
            savePmState(collectPmState());
        }, delay);
    }

    function ensurePmPointerSaveBinding() {
        if (pmState.pointerSaveBound) { return; }
        pmState.pointerSaveBound = true;
        document.addEventListener('pointerup', () => {
            if (!getPmRoot()) { return; }
            schedulePmSave(260);
        }, true);
    }

    function ensurePmShell() {
        let root = getPmRoot();
        if (root) { return root; }
        root = document.createElement('div');
        root.id = 'tabs';
        root.className = 'ui-tabs ui-corner-all ui-widget ui-widget-content';
        const list = document.createElement('ul');
        list.id = 'tab_list';
        list.className = 'ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-bottom ui-corner-all';
        root.appendChild(list);
        (document.body || document.documentElement).appendChild(root);
        return root;
    }

    function hasLivePmTabs(root = getPmRoot()) {
        return getPmTabItems(root).length > 0;
    }

    function buildPmPanel(key, title, inputValue = '') {
        const panel = document.createElement('div');
        panel.id = `from_${key}`;
        panel.className = 'ui-tabs-panel ui-corner-bottom ui-widget-content';
        panel.setAttribute('role', 'tabpanel');

        const convo = document.createElement('div');
        convo.id = `msgs_${key}`;
        convo.className = 'pm_convo';
        convo.setAttribute('data-ichc-pm-key', key);

        const outgoing = document.createElement('div');
        outgoing.id = `to_${key}`;
        outgoing.className = 'pm_outgoing';

        const input = document.createElement('input');
        input.type = 'text';
        input.name = `txt_to_${key}`;
        input.id = `txt_to_${key}`;
        input.value = inputValue;
        input.placeholder = 'type message here';
        input.maxLength = 400;
        input.setAttribute('enterkeyhint', 'go');
        input.setAttribute('onfocus', 'return bJ(event);');
        input.setAttribute('onkeyup', 'return processKeyUp(event);');
        input.setAttribute('onkeydown', `return cQ(event,'btnPmSendTo${key}')`);
        input.setAttribute('onclick', '$(this).focus()');

        const button = document.createElement('input');
        button.type = 'button';
        button.id = `btnPmSendTo${key}`;
        button.className = 'btn';
        button.value = '';
        button.setAttribute('onclick', `pm_button_clicked('${key}')`);
        button.style.width = '1px';
        button.style.height = '1px';
        button.style.visibility = 'hidden';

        input.addEventListener('blur', () => {
            setTimeout(() => {
                if (!_userClickedMain && document.activeElement?.id === 'txtMsg') {
                    input.focus();
                }
            }, 0);
        });

        outgoing.appendChild(input);
        outgoing.appendChild(button);
        panel.appendChild(convo);
        panel.appendChild(outgoing);
        panel.dataset.ichcPmKey = key;
        panel.dataset.ichcPmTitle = title;
        return panel;
    }

    function buildPmTab(root, key, title) {
        const li = document.createElement('li');
        li.id = `pm_${key}`;
        li.className = 'ui-tabs-tab ui-corner-top ui-state-default ui-tab';
        li.setAttribute('role', 'tab');
        li.dataset.ichcPmKey = key;

        const anchor = document.createElement('a');
        anchor.href = `#from_${key}`;
        anchor.className = 'ui-tabs-anchor';
        anchor.textContent = title;

        const close = document.createElement('span');
        close.className = 'ui-icon ui-icon-close';
        close.id = `remove_${key}`;
        close.textContent = 'Remove Tab';
        close.setAttribute('role', 'presentation');

        li.appendChild(anchor);
        li.appendChild(close);
        root.querySelector('#tab_list')?.appendChild(li);
        return li;
    }

    function ensurePmConversation(root, convo, options = {}) {
        if (!root || !convo?.key) { return; }
        const key = convo.key;
        let tab = root.querySelector(`#pm_${CSS.escape(key)}`);
        if (!tab) { tab = buildPmTab(root, key, convo.title || key); }
        let panel = root.querySelector(`#from_${CSS.escape(key)}`);
        if (!panel) {
            panel = buildPmPanel(key, convo.title || key, convo.inputValue || '');
            root.appendChild(panel);
        }
        const msgs = panel.querySelector(`#msgs_${CSS.escape(key)}`);
        const input = panel.querySelector(`#txt_to_${CSS.escape(key)}`);
        const title = convo.title || key;
        tab.querySelector('a')?.replaceChildren(document.createTextNode(title));
        panel.dataset.ichcPmTitle = title;
        if (msgs && convo.html && (!msgs.innerHTML.trim() || options.forceContent)) {
            msgs.innerHTML = convo.html;
            msgs.dataset.ichcPmRestored = '1';
        }
        if (input && !input.value && convo.inputValue) {
            input.value = convo.inputValue;
        }
        if (msgs && Number.isFinite(Number(convo.scrollTop))) {
            window.setTimeout(() => {
                msgs.scrollTop = Number(convo.scrollTop) || msgs.scrollHeight;
            }, 0);
        }
    }

    function activatePmTab(root, key) {
        if (!root || !key) { return; }
        _D('activatePmTab', key);
        showPmRoot(root);
        getPmTabItems(root).forEach(tab => {
            const active = getPmKeyFromId(tab.id, 'pm_') === key;
            tab.classList.toggle('ui-tabs-active', active);
            tab.classList.toggle('ui-state-active', active);
            tab.setAttribute('aria-selected', active ? 'true' : 'false');
            tab.setAttribute('aria-expanded', active ? 'true' : 'false');
        });
        // Show active panel: resolve via anchor href first (most reliable),
        // then fall back to key-based id matching.
        const activeTab = getPmTabItems(root).find(t => getPmKeyFromId(t.id, 'pm_') === key);
        const targetHref = (activeTab?.querySelector('a')?.getAttribute('href') || '').replace(/^#/, '');
        [...root.querySelectorAll('.ui-tabs-panel, [id^="from_"]')].forEach(panel => {
            const active = (targetHref && panel.id === targetHref) ||
                (!targetHref && getPmKeyFromId(panel.id, 'from_') === key);
            panel.classList.toggle('ichc-pm-active', active);
            panel.style.setProperty('display', active ? 'flex' : 'none', 'important');
            panel.setAttribute('aria-hidden', active ? 'false' : 'true');
        });
        schedulePmSave(80);
    }

    function removePmConversation(root, key) {
        if (!root || !key) { return; }
        root.querySelector(`#pm_${CSS.escape(key)}`)?.remove();
        root.querySelector(`#from_${CSS.escape(key)}`)?.remove();
        const next = getPmTabItems(root)[0];
        if (next) {
            activatePmTab(root, getPmKeyFromId(next.id, 'pm_'));
            schedulePmSave(60);
            return;
        }
        savePmState({ active: '', geometry: getPmGeometry(root), conversations: [] });
        hidePmRoot(root);
        delete root.dataset.ichcPmGeometryApplied;
    }

    function fmtTime() {
        const d = new Date();
        const h = d.getHours(), m = d.getMinutes();
        return (h % 12 || 12) + ':' + String(m).padStart(2, '0') + (h < 12 ? 'am' : 'pm');
    }

    function stampPmRow(row) {
        if (!(row instanceof HTMLElement)) { return; }
        if (row.querySelector('.ichc-pm-ts')) { return; }
        const ts = document.createElement('span');
        ts.className = 'ichc-pm-ts';
        ts.textContent = fmtTime();
        row.appendChild(ts);
    }

    const _watchedConvos = new WeakSet();
    function watchPmConvo(convo) {
        if (_watchedConvos.has(convo)) { return; }
        _watchedConvos.add(convo);
        [...convo.children].forEach(stampPmRow);
        new MutationObserver(mutations => {
            mutations.forEach(m => m.addedNodes.forEach(n => stampPmRow(n)));
        }).observe(convo, { childList: true });
    }

    function applyPmTheme(root = getPmRoot()) {
        if (!root) { return; }
        root.querySelectorAll('.pm_convo').forEach(convo => {
            watchPmConvo(convo);
            convo.querySelectorAll('a').forEach(anchor => {
                if (!(anchor.matches('a.userlink') || isLikelyChatNickAnchor(anchor))) { return; }
                const color = extractChatNickColor(anchor);
                const resolved = color ? makeReadableChatColor(color) : '#dbeafe';
                anchor.dataset.ichcPmNick = '1';
                anchor.style.setProperty('--ichc-pm-name-color', resolved, 'important');
                anchor.style.setProperty('color', resolved, 'important');
                anchor.style.setProperty('font-weight', '700', 'important');
            });
            convo.querySelectorAll('font[color], [style*="color"]').forEach(node => {
                if (node.matches?.('a.userlink')) { return; }
                const color = extractInlineColor(node);
                if (color && isDarkChatColor(color)) {
                    node.style.setProperty('color', '#d5e2ef', 'important');
                }
            });
            [...convo.children].forEach(row => {
                if (!(row instanceof HTMLElement)) { return; }
                row.classList.toggle('ichc-pm-event', isCompactChatEventText(row.textContent || ''));
            });
        });
    }

    let _pmClickGuardInstalled = false;
    function ensurePmClickGuard() {
        if (_pmClickGuardInstalled) { return; }
        _pmClickGuardInstalled = true;
        const guard = (e) => {
            const root = getPmRoot();
            if (!root) { return; }
            if (e.target !== root) { return; }
            e.stopImmediatePropagation();
        };
        document.addEventListener('mousedown', guard, true);
        document.addEventListener('click', guard, true);
    }

    // Track deliberate user clicks on the main chat input so we don't
    // redirect focus when the user intentionally switches back to it.
    let _userClickedMain = false;
    function _bindMainClick() {
        const el = document.getElementById('txtMsg');
        if (!el || el._ichcMainClickBound) { return; }
        el._ichcMainClickBound = true;
        el.addEventListener('mousedown', () => {
            _userClickedMain = true;
            setTimeout(() => { _userClickedMain = false; }, 300);
        }, true);
    }
    document.addEventListener('focusin', (e) => {
        if (e.target.id !== 'txtMsg' || _userClickedMain) { return; }
        setTimeout(() => {
            if (document.activeElement?.id !== 'txtMsg' || _userClickedMain) { return; }
            const pmInput = document.querySelector('.ichc-pm-active input[id^="txt_to_"]')
                         || document.querySelector('input[id^="txt_to_"]');
            if (pmInput) { pmInput.focus(); }
        }, 0);
    }, true);
    document.addEventListener('DOMContentLoaded', () => {
        _bindMainClick();
        const obs = new MutationObserver(() => { _bindMainClick(); });
        obs.observe(document.body, { childList: true, subtree: true });
    });

    // Wrap #txtMsg.focus so the site's own JS can't steal focus away from a
    // PM input that the user is actively typing in.
    function installPmFocusGuard() {
        runInPageContext(`
            if (window._ichcPmFocusGuard) { return; }
            window._ichcPmFocusGuard = true;
            var el = document.getElementById('txtMsg');
            if (!el) { return; }
            var _origFocus = el.focus;
            el.focus = function() {
                var active = document.activeElement;
                if (active && active.tagName === 'INPUT' &&
                    active.id && active.id.indexOf('txt_to_') === 0) {
                    return; // PM input has focus — don't steal it
                }
                return _origFocus.apply(this, arguments);
            };
        `);
    }

    function bindPmWindow(root) {
        if (!root || root.dataset.ichcPmBound === '1') { return; }
        root.dataset.ichcPmBound = '1';
        root.classList.remove('ui-tabs-collapsible');

        installPmFocusGuard();
        window.setTimeout(installPmFocusGuard, 500);

        function disableJquiOnTabs() {
            runInPageContext(`
                try {
                    var $t = window.jQuery && window.jQuery('#tabs');
                    if (!$t || !$t.length) { return; }
                    if ($t.data('ui-resizable')) { $t.resizable('destroy'); }
                    if ($t.data('ui-draggable')) { $t.draggable('destroy'); }
                    if ($t.data('ui-tabs')) { $t.tabs('option', 'collapsible', false); }
                } catch (_) {}
            `);
        }
        disableJquiOnTabs();
        window.setTimeout(disableJquiOnTabs, 200);
        window.setTimeout(disableJquiOnTabs, 600);
        window.setTimeout(disableJquiOnTabs, 1400);

        // javascript: links inside .pm_convo are blocked when the element was
        // created by a content script.  Intercept the click and run the code
        // in page context instead.
        root.addEventListener('click', e => {
            const link = e.target.closest('a[href^="javascript:"]');
            if (!link || !link.closest('.pm_convo')) { return; }
            const code = (link.getAttribute('href') || '').replace(/^javascript:\s*/i, '');
            if (!code.trim()) { return; }
            e.preventDefault();
            e.stopPropagation();
            runInPageContext(code);
        }, true);

        root.addEventListener('click', e => {
            if (e.target.closest('.ui-resizable-handle')) {
                e.stopImmediatePropagation();
                e.preventDefault();
            }
        }, true);
        root.addEventListener('mousedown', e => {
            if (e.target.closest('.ui-resizable-handle')) {
                e.stopPropagation();
            }
        }, true);

        ensurePmClickGuard();
        ensurePmPointerSaveBinding();

        root.addEventListener('click', event => {
            if (Date.now() < pmState.suppressClickUntil) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
            const close = event.target.closest('.ui-icon-close');
            if (close && root.contains(close)) {
                event.preventDefault();
                event.stopPropagation();
                removePmConversation(root, getPmKeyFromId(close.id, 'remove_'));
                return;
            }
            const anchor = event.target.closest('.ui-tabs-anchor');
            if (anchor && root.contains(anchor)) {
                event.preventDefault();
                event.stopPropagation();
                const href = anchor.getAttribute('href') || '';
                const key = getPmKeyFromId(href.replace(/^#/, ''), 'from_');
                activatePmTab(root, key);
            }
        }, true);

        root.addEventListener('input', event => {
            if (event.target.matches('.pm_outgoing input[type="text"]')) {
                schedulePmSave(120);
            }
        }, true);

        root.addEventListener('scroll', event => {
            if (event.target instanceof HTMLElement && event.target.matches('.pm_convo')) {
                schedulePmSave(120);
            }
        }, true);

        // Drag — pointerdown on #tab_list
        const tabList = root.querySelector('#tab_list');
        if (tabList) {
            // Block jQuery UI draggable (which listens on mousedown) from competing
            // with our pointer-based drag handler.
            tabList.addEventListener('mousedown', event => {
                if (event.button !== 0) { return; }
                if (event.target.closest('.ui-icon-close, .ui-tabs-anchor, input, button, textarea, a')) { return; }
                event.stopImmediatePropagation();
            }, true);

            tabList.addEventListener('pointerdown', event => {
                if (event.button !== 0) { return; }
                if (event.target.closest('.ui-icon-close, .ui-tabs-anchor, input, button, textarea, a')) { return; }

                const rect = root.getBoundingClientRect();
                const offsetX = event.clientX - rect.left;
                const offsetY = event.clientY - rect.top;
                const startX = event.clientX;
                const startY = event.clientY;
                let dragging = false;
                tabList.setPointerCapture?.(event.pointerId);

                const move = moveEvent => {
                    if (!dragging && (Math.abs(moveEvent.clientX - startX) > 4 || Math.abs(moveEvent.clientY - startY) > 4)) {
                        dragging = true;
                        document.body.style.setProperty('user-select', 'none', 'important');
                    }
                    if (!dragging) { return; }
                    const width = root.getBoundingClientRect().width;
                    const height = root.getBoundingClientRect().height;
                    const left = clampValue(moveEvent.clientX - offsetX, 8, Math.max(8, window.innerWidth - width - 8));
                    const top = clampValue(moveEvent.clientY - offsetY, 48, Math.max(48, window.innerHeight - height - 8));
                    root.style.setProperty('left', `${left}px`, 'important');
                    root.style.setProperty('top', `${top}px`, 'important');
                    root.style.setProperty('right', 'auto', 'important');
                    root.style.setProperty('bottom', 'auto', 'important');
                    syncResizeHandle(root);
                };

                const finish = () => {
                    tabList.releasePointerCapture?.(event.pointerId);
                    document.removeEventListener('pointermove', move, true);
                    document.removeEventListener('pointerup', finish, true);
                    document.removeEventListener('pointercancel', finish, true);
                    document.body.style.removeProperty('user-select');
                    if (dragging) {
                        pmState.suppressClickUntil = Date.now() + 180;
                        schedulePmSave(60);
                    }
                };

                document.addEventListener('pointermove', move, true);
                document.addEventListener('pointerup', finish, true);
                document.addEventListener('pointercancel', finish, true);
            }, true);
        }

        // Resize handle
        let resizeHandle = pmState.resizeHandle;
        if (!resizeHandle) {
            root.querySelector('.ichc-pm-resize-handle')?.remove();
            resizeHandle = document.createElement('div');
            resizeHandle.className = 'ichc-pm-resize-handle';
            document.body.appendChild(resizeHandle);
            pmState.resizeHandle = resizeHandle;
        }
        syncResizeHandle(root);
        window.addEventListener('resize', () => syncResizeHandle(root));

        resizeHandle.addEventListener('pointerdown', event => {
            if (event.button !== 0) { return; }
            event.preventDefault();
            event.stopPropagation();

            const startX = event.clientX;
            const startY = event.clientY;
            const rect = root.getBoundingClientRect();
            const startWidth = rect.width;
            const startHeight = rect.height;
            const startLeft = rect.left;
            const startTop = rect.top;

            resizeHandle.setPointerCapture?.(event.pointerId);

            const move = moveEvent => {
                const dx = moveEvent.clientX - startX;
                const dy = moveEvent.clientY - startY;
                const newWidth = clampValue(startWidth + dx, 320, Math.max(320, window.innerWidth - startLeft - 10));
                const newHeight = clampValue(startHeight + dy, 240, Math.max(240, window.innerHeight - startTop - 10));
                root.style.setProperty('width', `${newWidth}px`, 'important');
                root.style.setProperty('height', `${newHeight}px`, 'important');
                syncResizeHandle(root);
            };

            const finish = () => {
                resizeHandle.releasePointerCapture?.(event.pointerId);
                document.removeEventListener('pointermove', move, true);
                document.removeEventListener('pointerup', finish, true);
                document.removeEventListener('pointercancel', finish, true);
                schedulePmSave(60);
            };

            document.addEventListener('pointermove', move, true);
            document.addEventListener('pointerup', finish, true);
            document.addEventListener('pointercancel', finish, true);
        }, true);
    }

    // ─── Core PM show logic ───────────────────────────────────────────────────────
    //
    // syncPmVisibility is the single source of truth for whether #tabs should be
    // visible and which panel should be active.  Every code path that might need
    // to show/hide the PM window calls this (or schedulePmSync which debounces it).

    // User-requested hide state.  When true, syncPmVisibility won't re-show #tabs
    // even if the MutationObserver fires.  Toggled via 'ichc-pm-user-toggle' event.
    let _userHiddenPm = false;

    // modernize.js PM toggle button dispatches this event.
    window.addEventListener('ichc-pm-user-toggle', () => {
        _userHiddenPm = !_userHiddenPm;
        const root = getPmRoot();
        if (!root) { return; }
        if (_userHiddenPm) {
            hidePmRoot(root);
        } else {
            syncPmVisibility(root);
        }
    });

    function syncPmVisibility(root = getPmRoot()) {
        if (!root || !root.isConnected) { return; }
        // Respect user-requested hide — don't fight the toggle button.
        if (_userHiddenPm) { hidePmRoot(root); return; }
        const tabs = getPmTabItems(root);
        _D('syncPmVisibility tabs:', tabs.length, tabs.map(t => t.id),
            'display:', root.style.getPropertyValue('display'), root.style.getPropertyPriority('display'));

        if (!tabs.length) {
            // No PM tabs — hide only if there are no saved conversations to restore.
            const saved = loadPmState();
            if (!saved.conversations.length) {
                hidePmRoot(root);
            }
            return;
        }

        // Ensure window is visible with correct geometry.
        if (root.dataset.ichcPmGeometryApplied !== '1') {
            applyPmGeometry(root, loadPmState().geometry);
        } else {
            showPmRoot(root);
        }

        // Find active tab: prefer site-marked active, fall back to first.
        const activeTab = tabs.find(t =>
            t.classList.contains('ui-tabs-active') || t.classList.contains('ui-state-active'),
        ) || tabs[0];

        // Determine which panel to show using the anchor href (most reliable),
        // with a key-based fallback.
        const targetHref = (activeTab.querySelector('a')?.getAttribute('href') || '').replace(/^#/, '');
        const activeKey = getPmKeyFromId(activeTab.id, 'pm_');
        _D('syncPmVisibility activeTab:', activeTab.id, 'targetHref:', targetHref);

        const allPanels = [
            ...root.querySelectorAll('.ui-tabs-panel'),
            ...root.querySelectorAll('[id^="from_"]'),
        ].filter((el, i, arr) => arr.indexOf(el) === i);

        let shownPanel = false;
        allPanels.forEach(panel => {
            const isActive = (targetHref && panel.id === targetHref) ||
                (!targetHref && (
                    getPmKeyFromId(panel.id, 'from_') === activeKey ||
                    panel.id === activeKey
                ));
            panel.classList.toggle('ichc-pm-active', isActive);
            panel.style.setProperty('display', isActive ? 'flex' : 'none', 'important');
            panel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
            if (isActive) { shownPanel = true; }
        });

        if (!shownPanel && allPanels.length) {
            // Fallback: show first panel if nothing matched.
            const first = allPanels[0];
            first.classList.add('ichc-pm-active');
            first.style.setProperty('display', 'flex', 'important');
            first.setAttribute('aria-hidden', 'false');
        }
    }

    let _pmSyncTimer = null;
    function schedulePmSync(delay = 120) {
        window.clearTimeout(_pmSyncTimer);
        _pmSyncTimer = window.setTimeout(() => {
            _pmSyncTimer = null;
            const root = getPmRoot();
            if (root) {
                if (root.dataset.ichcPmBound !== '1') {
                    initPmWindows();
                } else {
                    syncPmVisibility(root);
                    applyPmTheme(root);
                }
            }
        }, delay);
    }

    // ─── Polling fallback ─────────────────────────────────────────────────────────
    //
    // Runs every 600 ms to catch anything the observers or event bridge missed.
    // This is the safety net that guarantees the window eventually shows even if
    // every other mechanism fails.

    function startPmPoll() {
        if (pmState.pollTimer) { return; }
        pmState.pollTimer = window.setInterval(() => {
            const root = getPmRoot();
            if (!root || !root.isConnected) { return; }

            const hasTabs = hasLivePmTabs(root);

            if (!hasTabs) { return; }

            if (root.dataset.ichcPmBound !== '1') {
                initPmWindows();
                return;
            }

            // If the window has PM tabs but isn't flex-displayed with !important,
            // something overrode our style — fix it.
            const disp = root.style.getPropertyValue('display');
            const prio = root.style.getPropertyPriority('display');
            if (disp !== 'flex' || prio !== 'important') {
                _D('poll: fixing root display, was', disp, prio);
                syncPmVisibility(root);
                return;
            }

            // Also ensure the active panel is visible.  jQuery UI re-init can
            // set all .ui-tabs-panel to display:none after our syncPmVisibility runs.
            const activeTab = getPmTabItems(root).find(t =>
                t.classList.contains('ui-tabs-active') || t.classList.contains('ui-state-active'),
            ) || getPmTabItems(root)[0];
            if (activeTab) {
                const key = getPmKeyFromId(activeTab.id, 'pm_');
                const panel = key ? root.querySelector(`#from_${CSS.escape(key)}`) : null;
                if (panel) {
                    const pDisp = panel.style.getPropertyValue('display');
                    const pPrio = panel.style.getPropertyPriority('display');
                    if (pDisp !== 'flex' || pPrio !== 'important') {
                        _D('poll: fixing panel display, was', pDisp, pPrio);
                        syncPmVisibility(root);
                    }
                }
            }
        }, 600);
    }

    // ─── Observers ────────────────────────────────────────────────────────────────

    function bindPmObservers(root) {
        if (!root) { return; }
        if (pmState.boundRoot === root && root.dataset.ichcPmObserved === '1') { return; }

        pmState.tabsObserver?.disconnect();
        pmState.resizeObserver?.disconnect();
        pmState.resizeObserver = null;
        pmState.boundRoot = root;
        root.dataset.ichcPmObserved = '1';

        pmState.tabsObserver = new MutationObserver(() => {
            // Any mutation inside #tabs: re-sync soon.
            schedulePmSync(100);
        });

        pmState.tabsObserver.observe(root, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style'],
        });
    }

    function restorePmStateIntoRoot(root, saved = loadPmState()) {
        if (!root || !saved.conversations?.length) { return; }
        saved.conversations.forEach(convo => ensurePmConversation(root, convo));
        const activeKey = saved.active && root.querySelector(`#pm_${CSS.escape(saved.active)}`)
            ? saved.active
            : getPmKeyFromId(getPmTabItems(root)[0]?.id || '', 'pm_');
        if (activeKey) { activatePmTab(root, activeKey); }
        applyPmTheme(root);
    }

    function isRoomPage() {
        return !!(document.getElementById('cams') || document.getElementById('chat_container'));
    }

    function liftPmRootToBody(root) {
        if (root && document.body && root.parentElement !== document.body) {
            document.body.appendChild(root);
        }
    }

    function initPmWindows() {
        _D('initPmWindows isRoom=', isRoomPage());
        if (!isRoomPage()) {
            const root = getPmRoot();
            if (root) { hidePmRoot(root); }
            return;
        }

        const saved = loadPmState();
        let root = getPmRoot();

        if (!root && saved.conversations.length) { root = ensurePmShell(); }
        if (!root) {
            _D('initPmWindows: no root, bailing');
            return;
        }

        liftPmRootToBody(root);
        bindPmWindow(root);
        bindPmObservers(root);

        const hadLiveTabs = hasLivePmTabs(root);
        _D('initPmWindows: hadLiveTabs=', hadLiveTabs, 'saved=', saved.conversations.length);

        if (!hadLiveTabs && saved.conversations.length && root.dataset.ichcPmHydrated !== '1') {
            restorePmStateIntoRoot(root, saved);
            root.dataset.ichcPmHydrated = '1';
        }

        const hasTabsNow = hasLivePmTabs(root);
        if (!hasTabsNow && !saved.conversations.length) {
            hidePmRoot(root);
            return;
        }

        syncPmVisibility(root);
        applyPmTheme(root);
        schedulePmSave(220);

        startPmPoll();
    }

    // ─── WebSocket PM parser ─────────────────────────────────────────────────────

    function extractPmNickFromWs(data) {
        if (typeof data !== 'string' || !data) { return null; }

        // Socket.io event frames: 42["eventName",{...}] or 42["eventName",[...]]
        const sioMatch = data.match(/^42\["([^"\\]{1,40})",([\s\S]+)\]$/);
        if (sioMatch) {
            const evtName = sioMatch[1].toLowerCase();
            if (/pm|private|whisper|privmsg|direct/.test(evtName)) {
                try {
                    const payload = JSON.parse(sioMatch[2]);
                    const obj = Array.isArray(payload) ? payload[0] : payload;
                    if (obj && typeof obj === 'object') {
                        const nick = obj.from || obj.sender || obj.nick || obj.user || obj.name;
                        return nick ? String(nick).trim() || null : null;
                    }
                } catch (_) {}
            }
        }

        // Raw JSON: {"type":"pm","from":"nick",...}
        if (data.charAt(0) === '{') {
            try {
                const obj = JSON.parse(data);
                const type = String(obj?.type || obj?.cmd || obj?.event || obj?.action || '').toLowerCase();
                if (/^(pm|private|private_message|whisper|privmsg|direct_message)$/.test(type)) {
                    const nick = String(obj?.from || obj?.sender || obj?.nick || obj?.user || '').trim();
                    return nick || null;
                }
            } catch (_) {}
        }

        // IRC PRIVMSG: ":nick!user@host PRIVMSG target :message"
        const ircMatch = data.match(/^:([^!@\s]{1,32})(?:![^\s]+)? PRIVMSG [^:\r\n]+ :/i);
        if (ircMatch) { return ircMatch[1].trim() || null; }

        // Simple text formats: "pm|nick|msg", "pm nick msg", "PM:nick:msg"
        const simpleMatch = data.match(/^(?:pm|private|whisper)[|: ,]+([^|: ,\r\n]{1,32})/i);
        if (simpleMatch) { return simpleMatch[1].trim() || null; }

        return null;
    }

    // ─── XHR PM parser ───────────────────────────────────────────────────────────

    function extractPmNickFromXhr(resp) {
        if (typeof resp !== 'string' || !resp) { return null; }

        // JSON array of messages: [{type:"pm",from:"nick",...},...]
        if (resp.charAt(0) === '[' || resp.charAt(0) === '{') {
            try {
                const data = JSON.parse(resp);
                const messages = Array.isArray(data) ? data :
                    (data.messages || data.msgs || data.data || [data]);
                for (const msg of (Array.isArray(messages) ? messages : [messages])) {
                    if (!msg || typeof msg !== 'object') { continue; }
                    const type = String(msg.type || msg.cmd || msg.event || '').toLowerCase();
                    if (/^(pm|private|private_message|whisper|privmsg)$/.test(type)) {
                        const nick = String(msg.from || msg.sender || msg.nick || msg.user || '').trim();
                        if (nick) { return nick; }
                    }
                }
            } catch (_) {}
        }

        // HTML: site injected a PM tab (<li id="pm_nick"> or <div id="from_nick">)
        const tabMatch = resp.match(/\bid=["']pm_([^"'<>\s]{1,32})["']/i);
        if (tabMatch) { return tabMatch[1].trim() || null; }

        // HTML text patterns: "PM from nick", "private message from nick"
        const textMatch = resp.match(/(?:pm from|private message from|whispered to you)[:\s<>b]*([^<"\s,]{1,32})/i);
        if (textMatch) { return textMatch[1].trim() || null; }

        return null;
    }

    // ─── bO hook ─────────────────────────────────────────────────────────────────

    // Opens (or activates) the PM window for a specific nick.
    // Called when bO fires with a 5-arg PM-open call, and also from the
    // _pmArrivalObserver when the site adds PM nodes on its own.
    function openPmForNick(nick) {
        if (!nick || !isRoomPage()) { return; }
        _D('openPmForNick:', nick);

        // Ensure the PM shell exists.
        const root = ensurePmShell();
        liftPmRootToBody(root);
        if (root.dataset.ichcPmBound !== '1') {
            bindPmWindow(root);
            bindPmObservers(root);
        }

        // Create the conversation panel + tab if not already present.
        ensurePmConversation(root, { key: nick, title: nick });

        // Show the window unless the user has manually hidden PMs via the toggle button.
        if (!_userHiddenPm) {
            if (root.dataset.ichcPmGeometryApplied !== '1') {
                applyPmGeometry(root, loadPmState().geometry);
            } else {
                showPmRoot(root);
            }
        }

        // Activate the correct tab and panel.
        getPmTabItems(root).forEach(tab => {
            const active = getPmKeyFromId(tab.id, 'pm_') === nick;
            tab.classList.toggle('ui-tabs-active', active);
            tab.classList.toggle('ui-state-active', active);
            tab.setAttribute('aria-selected', String(active));
            tab.setAttribute('aria-expanded', String(active));
        });
        const allPanels = [...root.querySelectorAll('.ui-tabs-panel, [id^="from_"]')]
            .filter((el, i, arr) => arr.indexOf(el) === i);
        let shownAny = false;
        allPanels.forEach(panel => {
            const active = panel.id === `from_${nick}`;
            panel.classList.toggle('ichc-pm-active', active);
            panel.style.setProperty('display', active ? 'flex' : 'none', 'important');
            panel.setAttribute('aria-hidden', active ? 'false' : 'true');
            if (active) { shownAny = true; }
        });
        if (!shownAny && allPanels.length) {
            allPanels[0].classList.add('ichc-pm-active');
            allPanels[0].style.setProperty('display', 'flex', 'important');
            allPanels[0].setAttribute('aria-hidden', 'false');
        }

        applyPmTheme(root);
        schedulePmSave(200);
        startPmPoll();
        _D('PM window ready for nick=', nick);
    }

    // Adds a received PM message line to an existing (or newly created) PM panel.
    function handleIncomingPmMessage(nick, color, messageHtml) {
        if (!nick || !isRoomPage()) { return; }
        _D('incoming PM nick=', nick, 'msg=', (messageHtml || '').slice(0, 80));

        openPmForNick(nick);

        const root = getPmRoot();
        if (!root) { return; }
        const msgs = root.querySelector(`#msgs_${CSS.escape(nick)}`);
        if (!msgs) { return; }

        const line = document.createElement('div');
        line.className = 'line';

        const nickColor = makeReadableChatColor(
            /^[0-9a-f]{6}$/i.test(color || '') ? `#${color}` : (color || '#dbeafe'),
        );
        const nickA = document.createElement('a');
        nickA.className = 'userlink';
        nickA.dataset.ichcPmNick = '1';
        nickA.style.setProperty('color', nickColor, 'important');
        nickA.style.setProperty('font-weight', '700', 'important');
        nickA.textContent = nick;

        const msgSpan = document.createElement('span');
        msgSpan.innerHTML = messageHtml || '';

        line.appendChild(nickA);
        line.appendChild(document.createTextNode(': '));
        line.appendChild(msgSpan);
        msgs.appendChild(line);
        msgs.scrollTop = msgs.scrollHeight;

        applyPmTheme(root);
        schedulePmSave(200);
    }

    function hookSitePmOpen() {
        if (window._ichcBoBound) { return; }
        window._ichcBoBound = true;

        // Listen for our own ichc-pm-open event (carries nick in detail).
        window.addEventListener('ichc-pm-open', (e) => {
            const nick = typeof e.detail?.nick === 'string' ? e.detail.nick.trim() : null;
            _D('ichc-pm-open event: nick=', nick);
            if (nick) {
                openPmForNick(nick);
            } else {
                // Generic show (e.g. incoming PM from arrival observer)
                window.setTimeout(() => {
                    const root = getPmRoot();
                    if (!root) { return; }
                    liftPmRootToBody(root);
                    if (root.dataset.ichcPmBound !== '1') { initPmWindows(); return; }
                    syncPmVisibility(root);
                    applyPmTheme(root);
                }, 100);
            }
        });

        // Fired by the bO wrapper when a 3-arg bO call comes in from a real user nick.
        // This is the site's signal for an incoming PM message.
        window.addEventListener('ichc-pm-incoming', (e) => {
            const { nick, color, html } = e.detail || {};
            _D('ichc-pm-incoming event: nick=', nick);
            if (nick) {
                handleIncomingPmMessage(nick, color, html);
            }
        });

        // Firefox: wrappedJSObject lets content scripts access page-context globals
        // directly without needing to inject a <script> tag (which CSP can block).
        // Chrome: wrappedJSObject doesn't exist, so fall back to script injection.
        const pageWin = (typeof window.wrappedJSObject !== 'undefined')
            ? window.wrappedJSObject
            : null;

        if (pageWin) {
            // ── WebSocket interception (Firefox path) ────────────────────────────
            // Incoming PMs do NOT call bO — they arrive via WebSocket.
            // Wrap WebSocket.prototype.addEventListener NOW (document_start, before
            // the site creates any connections) to intercept all message events.
            if (pageWin.WebSocket?.prototype && !pageWin._ichcWsHooked) {
                pageWin._ichcWsHooked = true;
                try {
                    const _origWsAEL = pageWin.WebSocket.prototype.addEventListener;
                    pageWin.WebSocket.prototype.addEventListener = exportFunction(
                        function (type, fn, opts) {
                            if (type === 'message' && typeof fn === 'function') {
                                const _origFn = fn;
                                const _wrapped = exportFunction(function (ev) {
                                    try {
                                        const data = ev.data;
                                        if (typeof data === 'string' && data) {
                                            // Log ALL messages unconditionally (first 60) so the
                                            // raw format can be identified from the console.
                                            if (!pageWin._ichcWsMsgCount) { pageWin._ichcWsMsgCount = 0; }
                                            if (pageWin._ichcWsMsgCount < 60) {
                                                pageWin._ichcWsMsgCount++;
                                                _D('WS #' + pageWin._ichcWsMsgCount + ':', data.slice(0, 400));
                                            }
                                            const nick = extractPmNickFromWs(data);
                                            if (nick) {
                                                _D('WS incoming PM from:', nick);
                                                window.dispatchEvent(new CustomEvent('ichc-pm-open',
                                                    { detail: { nick } }));
                                            }
                                        }
                                    } catch (_wsErr) {}
                                    return _origFn.apply(this, arguments);
                                }, pageWin);
                                return _origWsAEL.call(this, type, _wrapped, opts);
                            }
                            return _origWsAEL.call(this, type, fn, opts);
                        }, pageWin,
                    );
                    // Also intercept onmessage property (some sites use ws.onmessage = fn
                    // instead of addEventListener).  Define getter/setter on the prototype
                    // so every instance inherits it.
                    try {
                        const _onMsgDesc = Object.getOwnPropertyDescriptor(
                            pageWin.WebSocket.prototype, 'onmessage');
                        if (_onMsgDesc?.set) {
                            const _origOnMsgSet = _onMsgDesc.set;
                            const _origOnMsgGet = _onMsgDesc.get;
                            Object.defineProperty(pageWin.WebSocket.prototype, 'onmessage', {
                                configurable: true,
                                enumerable: true,
                                get: exportFunction(function () {
                                    return _origOnMsgGet.call(this);
                                }, pageWin),
                                set: exportFunction(function (fn) {
                                    if (typeof fn !== 'function') {
                                        _origOnMsgSet.call(this, fn);
                                        return;
                                    }
                                    _origOnMsgSet.call(this, exportFunction(function (ev) {
                                        try {
                                            const data = ev.data;
                                            if (typeof data === 'string' && data) {
                                                if (!pageWin._ichcWsMsgCount) { pageWin._ichcWsMsgCount = 0; }
                                                if (pageWin._ichcWsMsgCount < 60) {
                                                    pageWin._ichcWsMsgCount++;
                                                    _D('WS(om) #' + pageWin._ichcWsMsgCount + ':', data.slice(0, 400));
                                                }
                                                const nick = extractPmNickFromWs(data);
                                                if (nick) {
                                                    _D('WS(om) incoming PM from:', nick);
                                                    window.dispatchEvent(new CustomEvent('ichc-pm-open',
                                                        { detail: { nick } }));
                                                }
                                            }
                                        } catch (_omErr) {}
                                        return fn.apply(this, arguments);
                                    }, pageWin));
                                }, pageWin),
                            });
                        }
                    } catch (_omDefErr) {
                        _D('WS onmessage defineProperty error:', _omDefErr);
                    }

                    _D('WebSocket hook installed');
                } catch (_wsHookErr) {
                    _D('WebSocket hook error:', _wsHookErr);
                }
            }

            // ── XHR interception (Firefox path) ──────────────────────────────────
            // Chat messages (including incoming PMs) arrive via XHR polling, not WS.
            // Hook send() to intercept every response.  Use responseURL (standard)
            // instead of tracking the URL ourselves to avoid Xray property issues.
            if (pageWin.XMLHttpRequest?.prototype && !pageWin._ichcXhrHooked) {
                pageWin._ichcXhrHooked = true;
                try {
                    const _XHRP = pageWin.XMLHttpRequest.prototype;
                    const _origXhrSend = _XHRP.send;
                    const _origXhrAEL  = _XHRP.addEventListener;

                    _XHRP.send = exportFunction(function (...sendArgs) {
                        _origXhrAEL.call(this, 'load', exportFunction(function () {
                            try {
                                const resp = this.responseText;
                                if (!resp) { return; }
                                const url = String(this.responseURL || '');
                                const path = url.replace(/^https?:\/\/[^/]+/, '').slice(0, 60);
                                // Log all XHR responses so we can find the PM delivery endpoint.
                                if (!pageWin._ichcXhrAll) { pageWin._ichcXhrAll = 0; }
                                if (pageWin._ichcXhrAll < 40) {
                                    pageWin._ichcXhrAll++;
                                    _D('XHR', path, ':', resp.slice(0, 300));
                                }
                                // Log SendMessage d-field lines (PM detection via bO).
                                if (url.includes('/SendMessage') && resp.length > 5) {
                                    try {
                                        const d = JSON.parse(resp)?.d || '';
                                        for (const ln of d.split('\n')) {
                                            if (ln) { _D('SM:', ln.slice(0, 400)); }
                                        }
                                    } catch (_) {}
                                }
                                // Scan every XHR response for cam-list lines — these may arrive on
                                // any polling endpoint (not just /SendMessage).
                                // [c+] = a new broadcaster came online
                                // [c~] = server's full cam-list snapshot
                                if (resp.length > 3) {
                                    try {
                                        // Support both raw text and JSON {d: "..."} wrapping.
                                        let body = resp;
                                        if (resp.trimStart().startsWith('{')) {
                                            try { body = JSON.parse(resp)?.d || resp; } catch (_) {}
                                        }
                                        let hasCamEvent = false;
                                        let camListCount = 0;
                                        for (const ln of body.split('\n')) {
                                            if (ln.startsWith('[c+]')) {
                                                hasCamEvent = true;
                                                _D('[c+] new cam on', path, ln.slice(0, 200));
                                            }
                                            if (ln.startsWith('[c~]')) {
                                                // entries are pipe-separated: streamId-letter-userId-nick-|...
                                                const entries = ln.slice(4).split('|').filter(Boolean);
                                                camListCount = Math.max(camListCount, entries.length);
                                                _D('[c~] cam list on', path, 'count=', camListCount);
                                            }
                                        }
                                        // Only dispatch on an explicit [c+] new-cam event.
                                        // [c~] is a snapshot that arrives every poll — using its count
                                        // to trigger reloads causes false fires during loading states
                                        // (domCount=0 right after refreshCams clears the DOM).
                                        if (hasCamEvent) {
                                            window.dispatchEvent(new CustomEvent('ichc-cam-list-updated', {
                                                detail: { newCam: true, count: camListCount },
                                            }));
                                        }
                                    } catch (_) {}
                                }
                            } catch (_xhrCbErr) {}
                        }, pageWin));
                        return _origXhrSend.call(this, ...sendArgs);
                    }, pageWin);
                    _D('XHR hook installed');
                } catch (_xhrHookErr) {
                    _D('XHR hook error:', _xhrHookErr);
                }
            }

            // Firefox path — wrap bO AFTER page scripts have run.
            //
            // Key insight from log analysis: the site's bO does NOT add li#pm_* /
            // div#from_* nodes to #tabs.  Our extension must create the PM panel
            // itself when bO fires in its 5-argument "open PM" form:
            //   bO(color, nick, img, karma, 1)
            // The 5th argument (=1) is the PM-open flag.  3-argument calls are
            // notifications (not PMs) and should be ignored.
            let _boWrapped = false;

            const tryWrapBo = (when) => {
                if (_boWrapped) { return; }
                const fn = pageWin.bO;
                _D('tryWrapBo(' + when + '): bO type=', typeof fn);
                if (typeof fn !== 'function') { return; }
                try {
                    pageWin.bO = exportFunction(function (...args) {
                        _D('bO called:', JSON.stringify(Array.from(args)));

                        if (args.length >= 5 && args[1] && typeof args[1] === 'string') {
                            // 5-arg: bO(color, nick, img, karma, pmFlag) — user clicked PM button.
                            const nick = String(args[1]).trim();
                            if (nick) {
                                window.dispatchEvent(new CustomEvent('ichc-pm-open', {
                                    detail: { nick, color: String(args[0] || '000000') },
                                }));
                            }
                        } else if (args.length === 3 &&
                                   args[1] && typeof args[1] === 'string') {
                            // 3-arg: bO(color, nick, message) — private message directed at you.
                            // This includes system messages from "icanhazchat" (e.g. /cam from
                            // success + "cam down" link) as well as PMs from real users.
                            const nick = String(args[1]).trim();
                            if (nick) {
                                window.dispatchEvent(new CustomEvent('ichc-pm-incoming', {
                                    detail: {
                                        nick,
                                        color: String(args[0] || ''),
                                        html:  String(args[2] || ''),
                                    },
                                }));
                            }
                        }

                        let result;
                        try { result = fn.apply(this, args); }
                        catch (err) { result = undefined; }
                        return result;
                    }, pageWin);
                    _boWrapped = true;
                    _D('bO wrapped at', when);
                } catch (e) {
                    _D('bO wrap error at', when, ':', e);
                }
            };

            // Try at several points after page scripts have run.
            document.addEventListener('DOMContentLoaded', () => {
                tryWrapBo('DCL');
                window.setTimeout(() => tryWrapBo('DCL+300'), 300);
                window.setTimeout(() => tryWrapBo('DCL+800'), 800);
            }, true);
            window.addEventListener('load', () => {
                tryWrapBo('load');
                window.setTimeout(() => tryWrapBo('load+500'), 500);
            }, true);
        } else {
            // Chrome / non-Firefox path.
            runInPageContext(`
                (() => {
                    var _wrap = function(fn) {
                        return function() {
                            var args = Array.prototype.slice.call(arguments);
                            var result;
                            try { result = fn && fn.apply(this, args); } catch(e) {}
                            // 5-arg form: bO(color, nick, img, karma, pmFlag) = open PM
                            if (args.length >= 5 && args[1] && typeof args[1] === 'string') {
                                var nick = String(args[1]).trim();
                                if (nick) {
                                    window.dispatchEvent(new CustomEvent('ichc-pm-open', {
                                        detail: { nick: nick, color: String(args[0] || '000000') }
                                    }));
                                }
                            }
                            return result;
                        };
                    };
                    if (typeof window.bO === 'function') {
                        window.bO = _wrap(window.bO);
                    } else {
                        var _bOFn;
                        Object.defineProperty(window, 'bO', {
                            configurable: true,
                            get: function() { return _bOFn; },
                            set: function(fn) { _bOFn = _wrap(fn); },
                        });
                    }
                })();
            `);
        }
    }

    // ─── Init ─────────────────────────────────────────────────────────────────────

    hookSitePmOpen();

    document.addEventListener('DOMContentLoaded', initPmWindows);

    document.addEventListener('DOMContentLoaded', () => {
        if (!pmState.mountObserver) {
            pmState.mountObserver = new MutationObserver(() => {
                const root = getPmRoot();
                if (!root) { return; }
                liftPmRootToBody(root);
                if (root.dataset.ichcPmBound === '1') { return; }
                initPmWindows();
            });
            pmState.mountObserver.observe(document.body || document.documentElement, {
                childList: true,
                subtree: true,
            });
        }
        startPmPoll();
    });

    // PM-tab arrival detector — watches for the site adding PM DOM nodes.
    // Covers incoming PMs (bO is NOT called for those).
    (() => {
        let _arrivalTimer = null;

        function isPmNode(node) {
            if (node.nodeType !== 1) { return false; }
            const id = node.id || '';
            // PM tab: li#pm_xxx with an anchor pointing to #from_xxx
            if (id.startsWith('pm_') && node.tagName === 'LI') {
                return !!node.querySelector('a[href^="#from_"]');
            }
            // PM panel: div#from_xxx with pm_convo/pm_outgoing structure inside
            if (id.startsWith('from_')) {
                return !!(node.querySelector('.pm_convo, .pm_outgoing') ||
                          node.classList.contains('pm_panel') ||
                          node.classList.contains('ui-tabs-panel'));
            }
            // Container: has the full PM tab structure within it
            return !!node.querySelector?.('li[id^="pm_"] a[href^="#from_"]');
        }

        new MutationObserver(mutations => {
            let saw = false;
            for (const m of mutations) {
                for (const node of m.addedNodes) {
                    if (isPmNode(node)) { saw = true; break; }
                }
                if (saw) { break; }
            }
            if (!saw) { return; }
            _D('_pmArrivalObserver: PM node added');
            window.clearTimeout(_arrivalTimer);
            _arrivalTimer = window.setTimeout(() => {
                _arrivalTimer = null;
                const root = getPmRoot();
                if (!root) { return; }
                liftPmRootToBody(root);
                if (root.dataset.ichcPmBound !== '1') {
                    initPmWindows();
                    return;
                }
                syncPmVisibility(root);
                applyPmTheme(root);
            }, 80);
        }).observe(document.documentElement, { childList: true, subtree: true });
    })();

})();
