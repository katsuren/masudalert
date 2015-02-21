chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getHatenaId") {
        sendResponse({hatenaId: localStorage["hatenaId"]});
    }
    else {
        sendResponse({});
    }
});
