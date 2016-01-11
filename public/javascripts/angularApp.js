var app = angular.module('bestBank', []);

app.controller('MainCtrl', [
    '$scope',
    function ($scope) {
        $scope.test = 'Hello world!';
    }]);
