function blockUrl(url, tabId) {

    let allUrls = localStorage.aixuexiUrls || '[]'
    allUrls = JSON.parse(allUrls)
    if (url.search('http://') === 0) {
        url = url.substr(7)
    }
    if (url.search('https://') === 0) {
        url = url.substr(8)
    }

    let tmp = url.search('/')
    if (tmp !== -1) {
        url = url.substr(0, tmp)
    }

    if ( allUrls.indexOf(url) !== -1) {
        chrome.tabs.update(tabId, { url: "http://www.baidu.com" });
    }
}

function timeToBlock() {
    let today = new Date()
    let hour = today.getHours()
    return 9 <= hour < 12 || 14 <= hour < 18
}


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (!timeToBlock()) {
        return ;
    }
    blockUrl(tab.url, tabId);
});
