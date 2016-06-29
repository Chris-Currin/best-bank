todoApp.service('ChoreService', function ($http, $q) {
    return {
        'getChores': function (where) {
            console.log("front choreService.js", where);
            var defer = $q.defer();
            $http.post('/chore/getChores', where).success(function (resp) {
                defer.resolve(resp);
            }).error(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        },
        'addChore': function (chore) {
            console.log("front choreService.js", chore);
            var defer = $q.defer();
            $http.post('/chore/addChore', chore).success(function (resp) {
                defer.resolve(resp);
            }).error(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        },
        'updateChore': function (criteria, updatedVals) {
            console.log("front choreService.js", criteria);
            var defer = $q.defer();
            $http.put('/chore/updateChore', [criteria, updatedVals]).success(function (resp) {
                defer.resolve(resp);
            }).error(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        },
        'removeChore': function (chore) {
            console.log(chore);
            var defer = $q.defer();
            $http.post('/chore/removeChore', chore).success(function (resp) {
                defer.resolve(resp);
            }).error(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        }
    }
})
