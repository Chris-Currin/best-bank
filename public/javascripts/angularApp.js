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
                    'current': 50,
					addedAmt: 0,
					adding: false,
					notAdding: true
                }, {
                    goal: "shirt",
                    target: 50,
                    current: 0,
					addedAmt: 0,
					adding: false,
					notAdding: true
                }
            ],
        };
		$scope.addToGoal = function(index){
			$scope.account.goals[index].current += $scope.account.goals[index].addedAmt;
			$scope.account.balance -= $scope.account.goals[index].addedAmt;
			$scope.account.goals[index].adding=false;
			$scope.account.goals[index].notAdding=true;
		};
		
		$scope.showAddBox = function(index){
			$scope.account.goals[index].adding = true;
			$scope.account.goals[index].notAdding = false;
		};
    }]);
