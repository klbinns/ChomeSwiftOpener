var swiftOpenOptions = angular.module('swiftOpenOptions', []);

swiftOpenOptions.controller('SwiftOpenCtrl', function ($scope) {
    $scope.entries = [];
    $scope.newUrl = '';

    $scope.delete = function(index){
        try {
            $scope.entries.splice(index, 1);

        } catch(err){
            console.error('Error removing entry!');
        }

        $scope.save();

        if($scope.entries.length > 0){
            chrome.browserAction.setPopup({popup: ""});
            chrome.browserAction.setBadgeBackgroundColor({color: "#1DFF00"});
        } else {
            chrome.browserAction.setPopup({popup: "../html/popup.html"});
            chrome.browserAction.setBadgeBackgroundColor({color: "#F00"});
        }

        chrome.browserAction.setBadgeText({text: $scope.entries.length.toString()});
    }

    $scope.add = function(url){

        if($scope.entries.length < 50){
            $scope.entries.push({'url': url});
            $scope.save();
            $scope.resetForm();

            chrome.browserAction.setBadgeText({text: $scope.entries.length.toString()});
        } else {
            $window.alert("There is a maximum of 50 entries. Please remove an entry to add this entry.");
        }

        if($scope.entries.length > 0){
            chrome.browserAction.setPopup({popup: ""});
            chrome.browserAction.setBadgeBackgroundColor({color: "#1DFF00"});
        }

    }

    $scope.restore = function() {

        chrome.storage.sync.get({
            tabs: []
            }, function (items) {
                $scope.$apply(function(){
                    angular.copy(items.tabs, $scope.entries);
                });
        });

    }

    // Saves options to chrome.storage
    $scope.save = function() {

        chrome.storage.sync.set({
            tabs: $scope.entries
        });

    }

    $scope.resetForm = function() {
        $scope.newUrl = '';
        $scope.form.$setPristine();
    }

    $scope.restore();
});
