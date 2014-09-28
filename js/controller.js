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
    }

    $scope.add = function(url){

        if($scope.entries.length < 50){
            $scope.entries.push({'url': url});
            $scope.save();
            $scope.resetForm();
        } else {
            $window.alert("There is a maximum of 50 entries. Please remove an entry to add this entry.");
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
