angular.module('starter.services', ['ngCookies'])

.factory('identity', ['$cookieStore', function($cookieStore) {
    var cookieStorageUserKey = 'currentApplicationUser';

    var currentUser;
    return {
        getCurrentUser: function() {
            var savedUser = $cookieStore.get(cookieStorageUserKey);
            if (savedUser) {
                return savedUser;
            }

            return currentUser;
        },
        setCurrentUser: function(user) {
            if (user) {
                $cookieStore.put(cookieStorageUserKey, user);
            }
            else {
                $cookieStore.remove(cookieStorageUserKey);
            }

            currentUser = user;
        },
        isAuthenticated: function() {
            var result;

            try {
                result = !!this.getCurrentUser();
            }
            catch (err) {
                result = false;
            }

            return result;
        }
    }
}])

.factory('auth', ['$http', '$q', 'identity', function($http, $q, identity) {
    return {
        signup: function(user) {
            var deferred = $q.defer();

            var req = {
                method: 'POST',
                url: 'http://127.0.0.1:3350/auth/signup',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: user
            };

            $http(req)
                .success(function (data, status, headers, config) {
                    console.log('Success: ', data);

                    identity.setCurrentUser(data.user);

                    deferred.resolve(true);
                })
                .error(function (data, status, headers, config) {
                    console.log('Error: ', data);
                    deferred.reject();
                });

            return deferred.promise;
        },
        login: function(user){
            var deferred = $q.defer();

            var req = {
                method: 'POST',
                url: 'http://127.0.0.1:3350/auth/login',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: user
            };

            $http(req)
                .success(function (data, status, headers, config) {
                    console.log('Success: ', data);

                    identity.setCurrentUser(data.user);

                    deferred.resolve(true);
                })
                .error(function (data, status, headers, config) {
                    console.log('Error: ', data);

                    deferred.reject();
                });

            return deferred.promise;
        },
        logout: function() {
            var deferred = $q.defer();

            $http.get('http://127.0.0.1:3350/auth/logout')
                .success(function() {
                    identity.setCurrentUser(undefined);
                    deferred.resolve();
                });

            return deferred.promise;
        },
        isAuthenticated: function() {
            if (identity.isAuthenticated()) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        },
        isAdmin: function(role) {
            if (identity.isAdmin()) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        }
    }
}]);