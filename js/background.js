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

        } else {
            alert("No URLs configured for Swift Open! Configure some URLs in the options tab.");
        }

    });

});
