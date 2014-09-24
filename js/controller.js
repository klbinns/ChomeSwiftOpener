var phonecatApp = angular.module('chomeSwiftOpen', []);

phonecatApp.controller('SwiftOpenCtrl', function ($scope) {
    $scope.entries = [];
    $scope.newUrl = '';

    $scope.delete = function(index){
        try {
            $scope.entries.splice(index, 1);
        } catch(err){
            console.error('Error removing entry!');
        }

        $scope.save();
    }

    $scope.add = function(url){
        $scope.entries.push({'url': url});

        $scope.save();

        // TODO reset form
        $scope.newUrl = '';
    }

    $scope.restore = function() {

        chrome.storage.sync.get({
            tabs: []
            }, function (items) {
                // TODO if items > 0 in length
                $scope.$apply(function(){
                    angular.copy(items.tabs, $scope.entries);
                });

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


    $scope.restore();
});
