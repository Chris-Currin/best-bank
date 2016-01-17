
var myApp = angular.module("myModule", []);
var goals = [{ name: "guitar", target: 2800, current: 1000 },
      { name: "xbox 3", target: 8000, current: 1400 },
      { name: "bmw car", target: 750000, current: 65000 },
      { name: "laptop", target: 6200, current: 420 }
];

var myController = function ($scope) {
    var employee = {
        firstName: "Jake",
        lastName: "Jones",
        gender: "Male"
    };
    var country = {
        name: "USA",
        capital: "Washington, DC",
        flag: "resources/images/church.JPG"
    };

    var user = {
        name: "Michael", ageGroup: "adult", balance: 50000

    };

    //appending to scope
    $scope.goals = goals;
    $scope.user = user;
    $scope.goalName = "";
    $scope.goalTarget = "";
    $scope.goalCurrent = "";

    $scope.ClearGoalTemp = function () {
        $scope.goalName = "";
        $scope.goalTarget = "";
        $scope.goalCurrent = "";
    }

    $scope.ClearGoal = function () {
        
        $scope.ClearGoalTemp();
    }

    $scope.AddToGoals = function () {
        $scope.goals.push({ name: $scope.goalName, target: $scope.goalTarget, current: $scope.goalCurrent });
        $scope.ClearGoalTemp();
    }
    
};
myApp.controller("myController", myController);