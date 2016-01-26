'use strict';

var bankApp = angular.module('bankApp', ['ngRoute', 'ngMaterial', 'ngAnimate']);

bankApp.controller('bankController', ['$scope', function ($scope) {
    $scope.test = "hello world!";
}]);

bankApp.controller('addXPController', ['$scope', function ($scope) {
    $scope.currentXP = 0;
    $scope.xpMult = 10;
    $scope.getRand = function (rand, pIncome) {
        $scope.xp = rand / pIncome * $scope.xpMult;
        return $scope.currentXP + $scope.xp;
    };
}]);

bankApp.controller('xpController', ['$scope', function ($scope, $mdDialog) {
    $scope.currentXP = 20;
    $scope.rand = 0;
    $scope.xpMult = 1;
    $scope.level = 0;
    //showXP function for progress bar
    $scope.showXP = function(){
        $scope.finalXP = 0;
        $scope.finalXP = $scope.currentXP + ($scope.rand*$scope.xpMult);
        var result = 0;
        if ($scope.finalXP / 100 >= 1){
            result = $scope.finalXP % (Math.floor($scope.finalXP / 100)*100);
            
            /*
            alert("Hooray! You have leveled up!");*/
            
        } else {
            result = $scope.finalXP;
        }
        return result;
    };
    //addXP function
    $scope.addXP = function(){
        $scope.finalXP = 0;
        $scope.finalXP = $scope.currentXP + $scope.rand;
        return $scope.finalXP;
    };
    //getLvl function
    $scope.getLvl = function(){
        var lvl = 0;
        lvl = $scope.level + Math.floor(($scope.currentXP + $scope.rand) / 100);
        return lvl;
    };
    
    /*variables user, user.parent, user.parent.money
    $scope.user = "";
    $scope.user.parent = "";
    $scope.user.parent.money = 10000;
    $scope.user.allowance = 10;
    $scope.difference = Math.round($scope.user.allowance / $scope.user.parent.money * 100)
    */
    
    //addChoreXP function
    $scope.addChoreXP = function(){
        
    };
    //addGoalXP function
    $scope.addGoalXP = function(){
        
    };
}]);