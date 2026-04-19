chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg.type !== 'ichc-exec' || !sender.tab?.id) { return; }
    chrome.scripting.executeScript({
        target: { tabId: sender.tab.id, frameIds: [sender.frameId ?? 0] },
        world: 'MAIN',
        func: (code) => { try { (0, eval)(code); } catch (_) {} },
        args: [msg.code],
    }).catch(() => {});
});
