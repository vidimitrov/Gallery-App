var express = require('express');
var router = express.Router();

module.exports = (function () {
    var UsersController = require('./../controllers/UsersController');

    router.route('/')
        .get(UsersController.getAll)
        .post(UsersController.create);

    router.route('/:id')
        .get(UsersController.getById)
        .put(UsersController.update)
        .delete(UsersController.remove);

    return router;
})();