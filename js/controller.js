var phonecatApp = angular.module('chomeSwiftOpen', []);

phonecatApp.controller('SwiftOpenCtrl', function ($scope) {
    $scope.entries = [];
    $scope.newUrl = '';

    $scope.delete = function(index){
        try {
            $scope.entries.splice(index, 1);
            $scope.save();
        } catch(err){
            console.error('Error removing entry!');
        }
    }

    $scope.add = function(url){
        $scope.entries.push({'url': url});
        $scope.newUrl = '';

        $scope.save();
    }

    $scope.restore = function() {

        chrome.storage.sync.get({
            tabs: []
            }, function (items) {

        });

    }

    // Saves options to chrome.storage
    $scope.save = function() {

        chrome.storage.sync.set({
            tabs: $scope.entries
        }, function () {
            setTimeout(function () {

            }, 750);
        });

    }
});
