var seneca = require('./../../config/database');
var userEntity = seneca.make$('user');

module.exports = (function () {

    function getAll (req, res) {
        userEntity.list$({}, function (error, users) {
            if (error) {
                res.send(500, error);
            }

            res.send(users);
        });
    }

    function getById (req, res) {
        var userId = req.params.userId;

        userEntity.load$({id: userId}, function (error, user) {
            if (error) {
                res.send(404, 'User with this id does not exist');
            }

            res.send(user);
        });
    }

    function create (req, res) {
        var userEntity = seneca.make$('user');
        var data = req.body;

        userEntity.firstName = data.firstName || '';
        userEntity.lastName = data.lastName || '';

        if (data.username) {
            if (data.username.length >= 6) {
                userEntity.username = data.username;
            }
            else {
                res.send(403, 'Username must contain at least 6 symbols');
            }
        }
        else {
            res.send(403, 'You must provide username');
        }

        if (data.password) {
            if (data.password.length >= 6) {
                userEntity.password = data.password;
            }
            else {
                res.send(403, 'Password must contain at least 6 symbols');
            }
        }
        else {
            res.send(403, 'You must provide password');
        }

        userEntity.images = [];

        userEntity.save$(function(error, createdUser){
            if (error) {
                res.send(500, error);
            }

            res.json({
                message: 'New user created successfully',
                createdUser: createdUser
            });
        });
    }

    function update (req, res) {
        var userId = req.params.userId;
        var updates = req.body;

        userEntity.load$({id: userId}, function (error, user) {
            if (error) {
                res.send(404, 'User with this id does not exist');
            }

            if (updates.firstName && updates.firstName !== user.firstName) {
                user.firstName = updates.firstName;
            }

            if (updates.lastName && updates.lastName !== user.lastName) {
                user.lastName = updates.lastName;
            }

            if (updates.username && updates.username !== user.username) {
                user.username = updates.username;
            }

            if (updates.password && updates.password !== user.password) {
                user.password = updates.password;
            }

            user.save$(function (error, updatedUser) {
                if (error) {
                    res.send(500, 'Cannot update user');
                }

                res.json({
                    message: 'User updated successfully',
                    updatedUser: updatedUser
                });
            });
        });
    }

    function remove (req, res) {
        var userId = req.params.userId;

        userEntity.remove$({id: userId}, function (error, removedUser) {
            if (error) {
                res.send(404, 'User with this id does not exist');
            }

            res.json({
                message: 'User deleted successfully',
                removedUser: removedUser
            });
        });
    }

    function uploadImage (req, res) {
        var userId = req.params.userId;

    }

    function getAllImages (req, res) {
        var userId = req.params.userId;

        userEntity.load$({id: userId}, function (error, user) {
            if (error) {
                res.send(404, 'User with this id does not exist');
            }

            res.send(user.images);
        });
    }

    function getImageById (req, res) {
        var userId = req.params.userId;
        var imageId = req.params.imageId;

        userEntity.load$({id: userId}, function (error, user) {
            if (error) {
                res.send(404, 'User with this id does not exist');
            }

            var image = user.images.filter(function (image) {
                return image.id == imageId;
            })[0];

            res.send(image);
        });
    }

    return {
        getAll: getAll,
        getById: getById,
        create: create,
        update: update,
        remove: remove,
        uploadImage: uploadImage,
        getAllImages: getAllImages,
        getImageById: getImageById
    }
})();