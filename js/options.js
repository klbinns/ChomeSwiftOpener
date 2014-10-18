document.getElementById("optionsA").addEventListener("click", function(){
    // TODO check if options tab is already open. if yes, jump to that tab.
    // if no, do below.
    chrome.tabs.create({url: "html/options.html"});
    return false;
});
