var app = angular.module('bestBank', ['ngMaterial']);
app.controller('MainCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    //FAB
    this.isOpen = false;
    this.hover = true;
    $scope.$watch('main.isOpen', function (isOpen) {
        if (isOpen) {
            $timeout(function () {
                $scope.tooltipVisible = this.isOpen;
            }, 600);
        } else {
            $scope.tooltipVisible = this.isOpen;
        }
    });
    //data
    $scope.account = {
        'name': "Chris",
        'DOB': new Date(1992, 04, 16, 0, 0, 0),
        'balance': 1000,
        'pendingTransactions': [],
        'lastLogin': new Date(2016, 01, 12, 10, 0, 0),
        'goals': [{
                'goal': "bike",
                'image': '../images/bike.jpg',
                'target': 200,
                'current': 50
                }, {
                goal: "shirt",
                target: 50,
                current: 0
                }, {
                'goal': "bike",
                'image': '../images/bike.jpg',
                'target': 200,
                'current': 50
                }, {
                goal: "shirt",
                target: 50,
                current: 0
                }
            ]
    };
    $scope.insertFavouriteIconURL = 'images/icons/favourite.svg';
    $scope.toggleLeft = buildDelayedToggler('left');
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
});
app.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
        $mdSidenav('left').close()
            .then(function () {
                $log.debug("close LEFT is done");
            });
    };
});


app.config(function ($mdIconProvider) {
    $mdIconProvider
        .iconSet('action', 'images/icons/favorite.svg', 24)
        .defaultIconSet('images/icons/favorite.svg', 24);
});
