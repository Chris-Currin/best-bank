'use strict';

var todoApp = angular.module('todoApp', ['ngRoute', 'ui.bootstrap', 'ngMaterial', 'ngAnimate']);
todoApp.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/templates/chores.html',
            controller: 'ChoreCtrl'
        }).otherwise({
            redirectTo: '/',
            caseInsensitiveMatch: true
        });
  }]);
//-----------------------------------------------------------------------------------------
//------------------------------------- Chore Controller
//-----------------------------------------------------------------------------------------
todoApp.controller('ChoreCtrl', ['$scope', '$rootScope', '$mdDialog', '$mdMedia', 'ChoreService', function ($scope, $rootScope, $mdDialog, $mdMedia, ChoreService) {
    $scope.chores = [];
    $scope.done_chores = [];

    $scope.newMissionDialog = function (ev) {
        var useFullScreen = $mdMedia('sm') || $mdMedia('xs');
        $mdDialog.show({
                controller: newChoreController,
                templateUrl: '/templates/newmission.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                openFrom: '#new-mission-button'
            })
            .then(function (newchore) {
                $scope.addChore(newchore);
                console.log('You said OK!".');
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        $scope.$watch(function () {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function (wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };
    $scope.updateMissionDialog = function (chore, ev) {
        var useFullScreen = $mdMedia('sm') || $mdMedia('xs');
        $mdDialog.show({
                controller: updateChoreController,
                templateUrl: '/templates/updatemission.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen,
                locals: {
                    updatechore: chore
                }
            })
            .then(function (newchore) {
                delete newchore.open;
                $scope.updateChore(chore.id, newchore);
                console.log('You said OK!".');
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
        $scope.$watch(function () {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function (wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };
    $scope.checkDoneSelected = function () {
        $scope.check_done_selected = false;
        $scope.done_chores.forEach(function (key_chore) {
            console.log(key_chore.selected);
            if (key_chore.selected === true) {
                $scope.check_done_selected = true;
            }
        });
    };
    $scope.checkSelected = function () {
        $scope.check_selected = false;
        $scope.chores.forEach(function (key_chore) {
            console.log(key_chore.selected);
            if (key_chore.selected === true) {
                $scope.check_selected = true;
            }
        });
    };
    $scope.setDone = function (chore) {
        if (typeof (chore) === 'undefined') {
            $scope.chores = $scope.chores.map(function (chore) {
                if (chore.selected) {
                    $scope.updateChore({
                        id: chore.id
                    }, {
                        done: true
                    }, function () {
                        chore.done = true;
                        chore.selected = false;
                        $scope.done_chores.push(chore);
                        $scope.chores.splice($scope.chores.indexOf(chore), 1);
                    });
                }
                return chore;
            });
        } else {
            $scope.updateChore({
                id: chore.id
            }, {
                done: true
            }, function () {
                chore.done = true;
                chore.selected = false;
                $scope.done_chores.push(chore);
                $scope.chores.splice($scope.chores.indexOf(chore), 1);
            });
        }
    };
    $scope.setUndone = function (chore) {
        if (typeof (chore) === 'undefined') {
            $scope.done_chore = $scope.done_chores.map(function (chore) {
                if (chore.selected) {
                    $scope.updateChore({
                        id: chore.id
                    }, {
                        done: false
                    }, function () {
                        chore.done = false;
                        chore.selected = false;
                        $scope.chores.push(chore);
                        $scope.done_chores.splice($scope.done_chores.indexOf(chore), 1);
                    });
                }
                return chore;
            });
        } else {
            $scope.updateChore({
                id: chore.id
            }, {
                done: false
            }, function () {
                chore.done = false;
                chore.selected = false;
                $scope.chores.push(chore);
                $scope.done_chores.splice($scope.done_chores.indexOf(chore), 1);
            });
        }
    };
    //-----------------------------------------------------------------------------------------
    //------------------------------------- Chore CRUD
    //-----------------------------------------------------------------------------------------
    //get all chores
    ChoreService.getChores({
        "done": "false"
    }).then(function (response) {
        console.log("getChores:", response);
        $scope.chores = response.map(function (chore) {
            return angular.extend(chore, {
                selected: false
            });
        });
        console.log($scope.chores);
    });
    //get done chores
    ChoreService.getChores({
        "done": "true"
    }).then(function (response) {
        console.log("getChores:", response);
        $scope.done_chores = response.map(function (chore) {
            return angular.extend(chore, {
                selected: false
            });
        });
    });

    $scope.addSillyChore = function () {
        $scope.addChore({
            name: 'test',
            dueDate: new Date(),
            reward: 10
        });
    };
    $scope.addChore = function (chore) {
        console.log(chore);
        ChoreService.addChore(chore).then(function (response) {
            $scope.chores.push(angular.extend(chore, {
                selected: false
            }));
            console.log(response);
        });
    };
    $scope.updateChore = function (criteria, updatedVals, command) {
        //console.log(chore);
        ChoreService.updateChore(criteria, updatedVals).then(function (response) {
            console.log(response);
        }).then(command); //do other commands on completion
    };
    $scope.removeChore = function (chore) {
        console.log("removing..." + chore.id + "\t" + $scope.chores.indexOf(chore));
        ChoreService.removeChore(chore).then(function (response) {
            $scope.chores.splice($scope.chores.indexOf(chore), 1);
            console.log(response);
        });
    };
    $scope.removeDoneChore = function (chore) {
        console.log("removing..." + chore.id + "\t" + $scope.done_chores.indexOf(chore));
        ChoreService.removeChore(chore).then(function (response) {
            $scope.done_chores.splice($scope.done_chores.indexOf(chore), 1);
            console.log(response);
        });
    };
}]);

//--------------- new Chore Controller
function newChoreController($scope, $mdDialog) {
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        console.log(answer);
        $mdDialog.hide(answer);
    };
    $scope.newchore = {
        name: '',
        dueDate: new Date(),
        reward: 0
    };
}

//--------------- update Chore Controller
todoApp.controller('updateChoreController', updateChoreController);
updateChoreController.$inject = ['$scope', '$mdDialog', 'updatechore'];

function updateChoreController($scope, $mdDialog, updatechore) {
    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        console.log(answer);
        $mdDialog.hide(answer);
    };
    updatechore.dueDate = new Date(updatechore.dueDate);
    $scope.updatechore = updatechore;
};
