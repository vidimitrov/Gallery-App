var express = require('express');
var router = express.Router();

module.exports = (function () {
    var UsersController = require('./../../controllers/UsersController');

    router.post('/:userId/uploadImage', UsersController.uploadImage);

    return router;
})();