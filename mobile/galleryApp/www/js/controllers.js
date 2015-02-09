angular.module('starter.controllers', ['ngCordova'])

.controller('AppController', ['$scope', '$ionicModal', '$state', 'identity', 'auth',
        function ($scope, $ionicModal, $state, identity, auth) {
            $scope.identity = identity;

            $scope.loginData = {};
            $scope.registerData = {};

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/login.html', {
                scope: $scope
            }).then(function(modal) {
                $scope.loginModal = modal;
            });

            $ionicModal.fromTemplateUrl('templates/register.html', {
                scope: $scope
            }).then(function(modal) {
                $scope.registerModal = modal;
            });

            // Triggered in the login modal to close it
            $scope.closeLogin = function() {
                $scope.loginModal.hide();
            };

            // Open the login modal
            $scope.login = function() {
                $scope.loginModal.show();
            };

            // Perform the login action when the user submits the login form
            $scope.doLogin = function () {
                auth.login($scope.loginData)
                    .then(function () {
                        $scope.closeLogin();

                        $state.go('app.gallery');
                    });
            };

            $scope.doLogout = function () {
                auth.logout()
                .then(function () {
                    if ($scope.user) {
                        $scope.user.username = '';
                        $scope.user.password = '';
                    }
                    $state.go('app.home');
                });
            };

            // Triggered in the login modal to close it
            $scope.closeSignup = function() {
                $scope.registerModal.hide();
            };

            // Open the login modal
            $scope.signup = function() {
                $scope.registerModal.show();
            };

            $scope.doSignup = function () {
                auth.signup($scope.registerData)
                    .then(function () {
                        $scope.closeSignup();

                        $state.go('app.gallery');
                    });
            };
}])

.controller('GalleryController', ['$scope', 'identity', '$http', '$q',
    function($scope, identity, $http, $q) {
        var currentUser = identity.getCurrentUser();

        if (currentUser) {
            getAllImages(currentUser._id)
                .then(function (images) {
                    $scope.images = images;
                });
        }

        $scope.refreshGallery = function () {
            getAllImages(currentUser._id)
                .then(function (images) {
                    $scope.images = images;
                });
        };

        function getAllImages(userId) {
            var deffered = $q.defer();

            $http.get('http://galleryappapi-vdsystem.rhcloud.com/api/users/' + userId + '/images')
                .success(function(data, status, headers, config) {
                    deffered.resolve(data);
                })
                .error(function(data, status, headers, config) {

                });

            return deffered.promise;
        }
    }
])

.controller('UploadController', ['$scope', 'identity', '$cordovaCamera', '$http',
        function($scope, identity, $cordovaCamera, $http) {
            var currentUser = identity.getCurrentUser();

            $scope.takePicture = function() {
                var options = {
                    quality : 75,
                    destinationType : Camera.DestinationType.DATA_URL,
                    sourceType : Camera.PictureSourceType.CAMERA,
                    allowEdit : true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };

                $cordovaCamera.getPicture(options).then(function(pictureData) {
                    $scope.uploadPicture(pictureData);
                }, function(err) {

                });
            };

            $scope.uploadPicture = function(data) {
                var req = {
                    method: 'POST',
                    url: 'http://galleryappapi-vdsystem.rhcloud.com/api/users/' + currentUser._id + '/uploadImage',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: {
                        src: data
                    }
                };

                $http(req)
                    .success(function () {

                    })
                    .error(function () {

                    });
            };
        }
]);
