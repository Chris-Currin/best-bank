'use strict';
/*global angular */
var bankApp = angular.module('bankApp', ['ngRoute', 'ngMaterial', 'ngAnimate']);

bankApp.controller('MedalsController', ['$scope',  '$mdDialog', '$mdMedia', function ($scope, $mdDialog, $mdMedia) {
    $scope.medals = [
        
        {
            name: 'GLHF',
            desc: 'Be a good sport',
            imgsrc: '../images/badge1.jpg'
        },
        {
            name: 'GFHL',
            desc: 'Be a bad sport',
            imgsrc: '../images/badge2.jpg'
        },
        {
            name: 'GOOAAAAL!',
            desc: 'Complete your first quest',
            imgsrc: '../images/badge3.jpg'
            
        },
        {
            name: 'GOOAAAAL2!',
            desc: 'Complete your second quest',
            imgsrc: '../images/badge3.jpg'
            
        }
    ];
    
    $scope.showAlert = function(ev, index) {
        $mdDialog.show({
          targetEvent: ev,
          template:
            '<md-dialog style=\'text-align:center;\'>' +
            '   <md-dialog-content><h1>' + $scope.medals[index].name + 
            '</h1><img src= \'' + $scope.medals[index].imgsrc + '\' class=\'medalimg\'/>' +
            '<p>' + $scope.medals[index].desc + '</p>' + '</md-dialog-content>' +
            '<md-dialog-actions><md-button ng-click="closeDialog()" class="md-primary">Close</md-button></md-dialog-actions>' +
            '</md-dialog>',
            controller: function DialogController($scope, $mdDialog) {
            $scope.closeDialog = function() {
              $mdDialog.hide();
            }
        }
    });
    };
    
    
}]);

