bankApp.service('UserService', function ($http, $q) {
    return {
        'getUser': function () {
            console.log("front userService.js");
            $http.get('http://172.19.144.29:3444/user').success(function (resp) {
                console.log(resp);
                return resp;
            }).error(function (err) {
                console.log(err);
                return err;
            });
            return;
        },
        'getUser2': function () {
            console.log("front userService.js");
            var defer = $q.defer();
            $http.get('http://172.19.144.29:3444/user').success(function (resp) {
                defer.resolve(resp);
            }).error(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        },
        'addUser': function (user) {
            console.log("front userService.js", user);
            var defer = $q.defer();
            $http.post('http://172.19.144.29:3444/user', user).success(function (resp) {
                defer.resolve(resp);
            }).error(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        },
        'updateUser': function (user) {
            console.log("front userService.js", user);
            var defer = $q.defer();
            $http.put('http://172.19.144.29:3444/user', user).success(function (resp) {
                defer.resolve(resp);
            }).error(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        }
    }
})
