var app = angular.module('bestBank', []);

app.controller('MainCtrl', [
    '$scope',
    function ($scope) {
        $scope.account = {
            'name': "Chris",
            'balance': 1000,
            'pendingTransactions': [],
            'lastLogin': new Date(2016,01, 12, 10, 0, 0),
            'goals': [{
                    'goal': "bike",
                    'target': 200,
                    'current': 50
                }, {
                    goal: "shirt",
                    target: 50,
                    current: 0
                }
            ]
        };
    }]);
