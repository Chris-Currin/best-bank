'use strict';

var bankApp = angular.module('todoApp', ['ngRoute', 'ngMaterial', 'ngAnimate']);

bankApp.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/index.html',
            controller: 'MainCtrl'
        }).otherwise({
              redirectTo: '/',
              caseInsensitiveMatch: true
          });
          
}]);