var express = require('express');
var router = express.Router();

module.exports = (function () {
    var UsersController = require('./../../controllers/UsersController');

    router.route('/')
        .get(UsersController.getAll)
        .post(UsersController.create);

    router.route('/:userId')
        .get(UsersController.getById)
        .put(UsersController.update)
        .delete(UsersController.remove);

    router.route('/:userId/images')
        .get(UsersController.getAllImages)
        .post(UsersController.uploadImage);

    router.get('/:userId/images/:imageId', UsersController.getImageById);

    return router;
})();