(function () {
    'use strict';

    // --- Blocked user persistence ---

    function getBlocked() {
        try { return new Set(JSON.parse(localStorage.getItem('ichc_blocked') || '[]')); }
        catch { return new Set(); }
    }

    function saveBlocked(set) {
        localStorage.setItem('ichc_blocked', JSON.stringify([...set]));
    }

    function blockUser(username) {
        const b = getBlocked();
        b.add(username.toLowerCase());
        saveBlocked(b);
    }

    function unblockUser(username) {
        const b = getBlocked();
        b.delete(username.toLowerCase());
        saveBlocked(b);
    }

    function isBlocked(username) {
        return getBlocked().has(username.toLowerCase());
    }

    // --- DOM helpers ---

    function usernameFromCamId(camId) {
        const span = document.getElementById('name-' + camId);
        return span ? span.textContent.trim() : null;
    }

    // Hide/show the videocontainer directly, not the slot.
    // This way the site's slot visibility management is irrelevant.
    function hideVC(vc) {
        vc.style.setProperty('display', 'none', 'important');
    }

    function showVC(vc) {
        vc.style.removeProperty('display');
    }

    function applyBlockToContainer(vc, sessionDisabled) {
        if (vc.style.getPropertyValue('display') === 'none' &&
            vc.style.getPropertyPriority('display') === 'important') {
            return; // already hidden by us, nothing to do
        }
        const camId = vc.id.replace('id-', '');
        if (sessionDisabled?.has(camId)) return;
        const username = usernameFromCamId(camId);
        if (!username || !isBlocked(username)) return;
        hideVC(vc);
    }

    // --- Main init ---

    function init() {
        const camsDiv = document.getElementById('cams');
        if (!camsDiv) return;

        // Cam IDs disabled via the button this session — let the site handle those
        // so its own start button stays accessible. Cleared when the cam is removed.
        const sessionDisabled = new Set();
        let scanTimer = 0;
        let lastScanAt = 0;

        function check(vc) {
            applyBlockToContainer(vc, sessionDisabled);
        }

        function scanAll() {
            scanTimer = 0;
            lastScanAt = Date.now();
            document.querySelectorAll('#cams .videocontainer').forEach(check);
        }

        function scheduleScan(delay = 100) {
            window.clearTimeout(scanTimer);
            scanTimer = window.setTimeout(scanAll, delay);
        }

        // Click handler — capture phase, runs before site's own handlers
        camsDiv.addEventListener('click', (e) => {
            // "disable" button
            const disableBtn = e.target.closest('.cam-button2');
            if (disableBtn) {
                const camId = disableBtn.id.replace('cambtn2-', '');
                const username = usernameFromCamId(camId);
                if (username) {
                    blockUser(username);
                    sessionDisabled.add(camId);
                }
                return;
            }

            // "start" (retry) button — unblock
            const startBtn = e.target.closest('[id$="-retry"]');
            if (startBtn) {
                const camId = startBtn.id.replace('cambtn1-', '').replace('-retry', '');
                const username = usernameFromCamId(camId);
                if (username && isBlocked(username)) {
                    unblockUser(username);
                    sessionDisabled.delete(camId);
                    const vc = document.getElementById('id-' + camId);
                    if (vc) showVC(vc);
                }
                scheduleScan(30);
            }
        }, true);

        // MutationObserver — catches cams being inserted and name spans being populated
        const observer = new MutationObserver(mutations => {
            let shouldRescan = false;
            for (const m of mutations) {
                for (const node of m.addedNodes) {
                    if (node.nodeType !== 1) continue;
                    const containers = node.classList?.contains('videocontainer')
                        ? [node]
                        : [...node.querySelectorAll('.videocontainer')];
                    if (containers.length) {
                        containers.forEach(check);
                        shouldRescan = true;
                        continue;
                    }
                    if (node.id?.startsWith?.('name-') || node.querySelector?.('[id^="name-"]')) {
                        shouldRescan = true;
                    }
                }
                // Clear sessionDisabled when a cam is removed so re-appearing
                // cams get auto-hidden
                for (const node of m.removedNodes) {
                    if (node.nodeType !== 1) continue;
                    const containers = node.classList?.contains('videocontainer')
                        ? [node]
                        : [...node.querySelectorAll('.videocontainer')];
                    if (!containers.length) { continue; }
                    for (const vc of containers) {
                        sessionDisabled.delete(vc.id.replace('id-', ''));
                    }
                    shouldRescan = true;
                }
            }

            if (shouldRescan) {
                scheduleScan(120);
            }
        });

        observer.observe(camsDiv, {
            childList: true,
            subtree: true,
        });

        // Very low-frequency fallback for late-populating names that don't trigger childList changes.
        setInterval(() => {
            if (document.visibilityState === 'hidden') { return; }
            if (Date.now() - lastScanAt < 18000) { return; }
            scanAll();
        }, 20000);

        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                scheduleScan(60);
            }
        });

        // Initial scan
        scanAll();
    }

    document.addEventListener('DOMContentLoaded', init);
})();
