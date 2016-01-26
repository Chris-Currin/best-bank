'use strict';

var bankApp = angular.module('bankApp', ['ngStorage', 'ngRoute', 'ngMaterial', 'ngAnimate', 'angular-carousel']);

bankApp.config(['$routeProvider', '$httpProvider',
            function ($routeProvider, $httpProvider) {
        $routeProvider.when('/', {
            templateUrl: '/templates/home.html',
            controller: 'MainCtrl'
        }).when('/signin', {
            templateUrl: '/templates/signin.html',
            controller: 'MainCtrl'
        }).when('/missions', {
            templateUrl: '/templates/chores.html',
            controller: 'ChoreCtrl'
        }).when('/chores', {
            templateUrl: '/templates/chores.html',
            controller: 'ChoreCtrl'
        }).when('/xp', {
            templateUrl: '/templates/xp.html',
            controller: 'xpController'
        }).when('/medals', {
            templateUrl: '/templates/medals.html',
            controller: 'MedalsController'
        }).when('/goals', {
            templateUrl: '/templates/goals.html',
            controller: 'GoalController'
        });
        /* .otherwise({
            redirectTo: '/',
            caseInsensitiveMatch: true
        });*/
        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function (response) {
                    if (response.status === 401 || response.status === 403 || response.status === 404) {
                        $location.path('/signin');
                    }
                    console.log('error');
                    return $q.reject(response);
                }
            };
  }]);
}]);

bankApp.controller('MainCtrl', ['$rootScope', '$http', '$scope', '$location', '$localStorage', 'UserService', '$timeout', '$mdSidenav', '$log',
                            function ($rootScope, $http, $scope, $location, $localStorage, UserService, $timeout, $mdSidenav, $log) {
        /*function successAuth(res) {
        $localStorage.token = res.token;
        window.location = "/";
    }
*/
        // login
        $scope.user = {};
        $scope.signin = function () {
            var formData = {
                email: $scope.email,
                password: $scope.password
            };
            //var defer = $q;
            console.log(formData);
            $http.post('http://172.19.144.29:3444/auth', formData).success(function (resp) {
                console.log(resp);
                //defer.resolve(resp);
                $localStorage.token = resp.token;
                $scope.token = $localStorage.token;
                $http.get('http://172.19.144.29:3444/user').success(function (resp) {
                    console.log(resp);
                    //defer.resolve(resp);
                    $scope.user = resp;
                }).error(function (err) {
                    console.log(err);
                    //defer.reject(err);

                });
            }).error(function (err) {
                console.log(err);
                //defer.reject(err);
            });

        };

        $scope.signup = function () {
            var formData = {
                email: $scope.email,
                password: $scope.password
            };

            Auth.signup(formData, successAuth, function (res) {
                $rootScope.error = res.error || 'Failed to sign up.';
            })
        };

        $scope.logout = function () {
            delete $localStorage.token;
            delete $scope.token;
            window.location = "/";
        };
        // $scope.token = $localStorage.token;
        $rootScope.getUser = function () {
            //$scope.user = UserService.getUser();
            //console.log($scope.user);
            //console.log($scope.user.$$state);
            $http.get('http://172.19.144.29:3444/user').success(function (resp) {
                console.log(resp);
                //defer.resolve(resp);
                $scope.user = resp;
            }).error(function (err) {
                console.log(err);
                //defer.reject(err);

            });
        };

        //sidebar
        $scope.toggleLeft = buildDelayedToggler('left');
        $scope.toggleRight = buildToggler('right');
        $scope.isOpenRight = function () {
            return $mdSidenav('right').isOpen();
        };
        /**
         * Supplies a function that will continue to operate until the
         * time is up.
         */
        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function () {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }
        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildDelayedToggler(navID) {
            return debounce(function () {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }

        function buildToggler(navID) {
            return function () {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $log.debug("toggle " + navID + " is done");
                    });
            }
        }
}]);

bankApp.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
        $mdSidenav('left').close()
            .then(function () {
                $log.debug("close LEFT is done");
            });
    };
    $scope.open = function () {
        $mdSidenav('left').open()
            .then(function () {
                $log.debug("close LEFT is done");
            });
    };
})

bankApp.controller('ChoreCtrl', ['$scope', '$rootScope', '$mdDialog', '$mdMedia', 'UserService', function ($scope, $rootScope, $mdDialog, $mdMedia, UserService) {

    $scope.chores = [];
    $scope.done_chores = [];
    $scope.user.chores = [];
    UserService.getUser2().then(function (resp) {
        console.log(resp.chores);

        $scope.user.chores = resp.chores;

        //get done chores
        console.log("chores" + $scope.user.chores.length);
        //delete $scope.user.chores;
        //$scope.updateChores();
        //$scope.user.chores.map(function (chore) {
        //    $scope.removeChore(chore);
        //});
        console.log("chores" + resp.chores);
        /*$scope.chores = $scope.user.chores.map(function (chore) {
            if (typeof (chore.done) == 'undefined' || chore.done == 'false') {
                //return angular.extend(chore, {
                //   selected: false
                // });
                return chore;
            }
        });
        $scope.done_chores = $scope.user.chores.map(function (chore) {
            if (chore.done == 'true') {
                //return angular.extend(chore, {
                //   selected: false
                // });
                return chore;
            }
        });
        */
        if (Array.isArray($scope.user.chores) == false) {
            $scope.user.chores = [];
        } else {
            $scope.user.chores.forEach(function (chore) {
                if (typeof (chore.done) == 'undefined' || chore.done == 'false') {
                    $scope.chores.push(chore);
                } else {
                    $scope.done_chores.push(chore);
                }
            });
        }
        console.log($scope.chores);
        console.log($scope.done_chores);
    });
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
                $scope.updateChores();
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
                    chore.done = true;
                    delete chore.selected;
                    $scope.updateChores({
                        function () {
                            chore.done = true;
                            chore.selected = false;
                            $scope.done_chores.push(chore);
                            $scope.chores.splice($scope.chores.indexOf(chore), 1);
                        }
                    });
                }
                return chore;
            })
        } else {
            chore.done = true;
            delete chore.selected;
            $scope.updateChores({
                function () {
                    chore.done = true;
                    chore.selected = false;
                    $scope.done_chores.push(chore);
                    $scope.chores.splice($scope.chores.indexOf(chore), 1);
                }
            });
        }
        $scope.check_selected = false;
    };
    $scope.setUndone = function (chore) {
        if (typeof (chore) === 'undefined') {
            $scope.done_chore = $scope.done_chores.map(function (chore) {
                if (chore.selected) {
                    chore.done = false;
                    delete chore.selected;
                    $scope.updateChores({
                        function () {
                            chore.done = false;
                            chore.selected = false;
                            $scope.chores.push(chore);
                            $scope.done_chores.splice($scope.done_chores.indexOf(chore), 1);
                        }
                    });
                    return chore;
                };
            })
        } else {
            chore.done = false;
            delete chore.selected;
            $scope.updateChores({
                function () {
                    chore.done = false;
                    chore.selected = false;
                    $scope.chores.push(chore);
                    $scope.done_chores.splice($scope.done_chores.indexOf(chore), 1);
                }
            });
        }
        $scope.check_done_selected = false;
    };
    //-----------------------------------------------------------------------------------------
    //------------------------------------- Chore CRUD
    //-----------------------------------------------------------------------------------------


    $scope.addSillyChore = function () {
        $scope.addChore({
            name: 'test',
            dueDate: new Date(),
            reward: 10
        });
    };

    $scope.addChore = function (chore) {
        console.log(chore);
        $scope.user.chores.push(chore);
        $scope.chores.push(chore);
        UserService.updateUser($scope.user).then(function (response) {
            console.log(response);
        });
    };
    $scope.updateChores = function (command) {
        $scope.choressubmit = [];
        console.log("chores for update chores" + $scope.chores);
        console.log("chores for update done_chores" + $scope.done_chores);
        //$scope.choressubmit = $scope.chores;
        //for (var i = 0; i < $scope.done_chores.length; i++) {
        //    $scope.choressubmit.push($scope.done_chores[i]);
        //}
        //$scope.user.chores = $scope.choressubmit;
        console.log("chores for update user.chores" + $scope.user.chores);
        console.log("chores for update user" + $scope.user);
        console.log("chores for update chores" + $scope.chores);
        console.log("chores for update done_chores" + $scope.done_chores);
        UserService.updateUser($scope.user).then(function (response) {
            console.log(response);
        }).then(command); //do other commands on completion
    };
    $scope.removeChore = function (chore) {
        console.log("removing..." + chore);
        $scope.user.chores.splice($scope.user.chores.indexOf(chore), 1);
        $scope.chores.splice($scope.chores.indexOf(chore), 1);
        UserService.updateUser($scope.user).then(function (response) {
            console.log(response);
        });
    };
    $scope.removeDoneChore = function (chore) {
        console.log("removing..." + chore.id + "\t" + $scope.done_chores.indexOf(chore));
        $scope.user.chores.splice($scope.user.chores.indexOf(chore), 1);
        $scope.done_chores.splice($scope.done_chores.indexOf(chore), 1);
        UserService.updateUser($scope.user).then(function (response) {
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
bankApp.controller('updateChoreController', updateChoreController);
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
//---------------------------------------------------------------------------------
//------------------------------XP Controller
//---------------------------------------------------------------------------------
bankApp.controller('xpController', ['$scope', function ($scope) {
    $scope.currentXP = 20;
    $scope.rand = 0;
    $scope.xpMult = 1;
    $scope.level = 0;
    $scope.showXP = function () {
        $scope.finalXP = 0;
        $scope.finalXP = $scope.currentXP + $scope.rand;
        var result = 0;
        if ($scope.finalXP / 100 >= 1) {
            result = $scope.finalXP % (Math.floor($scope.finalXP / 100) * 100);
        } else {
            result = $scope.finalXP;
        }
        return result;
    };
    $scope.addXP = function () {
        $scope.finalXP = 0;
        $scope.finalXP = $scope.currentXP + $scope.rand;
        return $scope.finalXP;
    };
    $scope.getLvl = function () {
        var lvl = 0;
        lvl = $scope.level + Math.floor(($scope.currentXP + $scope.rand) / 100);
        return lvl;
    };
}]);

//---------------------------------------------------------------------------------
//------------------------------Medals Controller
//---------------------------------------------------------------------------------
bankApp.controller('MedalsController', ['$scope', '$mdDialog', '$mdMedia', function ($scope, $mdDialog, $mdMedia) {
    $scope.medals = [

        {
            name: 'GLHF',
            desc: 'Be a good sport',
            imgsrc: '/images/badge1.jpg'
    },
        {
            name: 'GFHL',
            desc: 'Be a bad sport',
            imgsrc: '/images/badge2.jpg'
    },
        {
            name: 'GOOAAAAL!',
            desc: 'Complete your first quest',
            imgsrc: '/images/badge3.jpg'

    },
        {
            name: 'GOOAAAAL2!',
            desc: 'Complete your second quest',
            imgsrc: '/images/badge3.jpg'

    }
];

    $scope.showAlert = function (ev, index) {
        $mdDialog.show({
            targetEvent: ev,
            template: '<md-dialog style=\'text-align:center;\'>' +
                '   <md-dialog-content><h1>' + $scope.medals[index].name +
                '</h1><img src= \'' + $scope.medals[index].imgsrc + '\' class=\'medalimg\'/>' +
                '<p>' + $scope.medals[index].desc + '</p>' + '</md-dialog-content>' +
                '<md-dialog-actions><md-button ng-click="closeDialog()" class="md-primary">Close</md-button></md-dialog-actions>' +
                '</md-dialog>',
            controller: function DialogController($scope, $mdDialog) {
                $scope.closeDialog = function () {
                    $mdDialog.hide();
                }
            }
        });
    };


}]);
//---------------------------------------------------------------------------------
//------------------------------Goal Controller
//---------------------------------------------------------------------------------
bankApp.controller('GoalController', ['$scope', function ($scope) {
    $scope.goalList = [{
            goalDescription: 'Bike',
            //image:"../images/small-zebra-icon.png",
            image: null,
            dateCreated: new Date(),
            targetAmount: 100,
            currentAmount: 0,
            priority: 3
},
        {
            goalDescription: 'Shirt',
            image: null,
            dateCreated: new Date(),
            targetAmount: 150,
            currentAmount: 50,
            priority: 2
                   }];
}]);
