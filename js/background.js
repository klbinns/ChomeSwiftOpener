chrome.browserAction.onClicked.addListener(function (activeTab) {

    chrome.storage.sync.get({
        tabs: []
    }, function (items) {

        var tabs = items.tabs;

        if (tabs.length > 0) {

            var i = 0;
            for (i; i < tabs.length; i++) {
                chrome.tabs.create({url: tabs[i].url});
            }

        }

    });

});


chrome.storage.sync.get({
        tabs: []
}, function (items) {

    var tabs = items.tabs;

    if (tabs.length > 0) {
        chrome.browserAction.setPopup({popup: ""});
        chrome.browserAction.setBadgeBackgroundColor({color: "#1DFF00"});
    } else {
        chrome.browserAction.setPopup({popup: "../html/popup.html"});
        chrome.browserAction.setBadgeBackgroundColor({color: "#F00"});
    }

    chrome.browserAction.setBadgeText({text: tabs.length.toString()});

});
