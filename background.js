chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'ichc-exec' && sender.tab?.id) {
        // Guarded rather than `.catch()`-chained: Firefox's `chrome.*` alias is
        // callback-based, so executeScript returns undefined there and calling
        // .catch() on it throws inside this listener.
        try {
            const ret = chrome.scripting.executeScript({
                target: { tabId: sender.tab.id, frameIds: [sender.frameId ?? 0] },
                world: 'MAIN',
                func: (code) => { try { (0, eval)(code); } catch (_) {} },
                args: [msg.code],
            });
            if (ret && typeof ret.catch === 'function') { ret.catch(() => {}); }
        } catch (_) {}
        return;
    }

    if (msg.type === 'ichc-og-fetch') {
        fetchOgDocument(msg.url).then(sendResponse);
        return true;
    }
});

async function fetchOgDocument(url) {
    let parsed;
    try {
        parsed = new URL(url);
    } catch (_) {
        return { ok: false };
    }

    if (!/^https?:$/.test(parsed.protocol)) {
        return { ok: false };
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);
    try {
        const response = await fetch(parsed.href, {
            method: 'GET',
            credentials: 'omit',
            redirect: 'follow',
            signal: controller.signal,
        });
        const contentType = response.headers.get('content-type') || '';
        if (!response.ok || !/text\/html|application\/xhtml\+xml/i.test(contentType)) {
            return { ok: false, finalUrl: response.url || parsed.href, contentType };
        }

        const text = await response.text();
        return {
            ok: true,
            finalUrl: response.url || parsed.href,
            contentType,
            html: text.slice(0, 250000),
        };
    } catch (_) {
        return { ok: false };
    } finally {
        clearTimeout(timeout);
    }
}
