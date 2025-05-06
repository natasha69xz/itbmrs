chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension Installed');
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'executeAutofill') {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const tabId = tabs[0].id;
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                func: performAutofill,
                args: [request.bin]
            }, (results) => {
                sendResponse(results[0].result);
            });
        });
        return true;  // Keep the message channel open
    }
});
