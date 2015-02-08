var express = require('express');
var router = express.Router();

module.exports = (function () {
    var UsersController = require('./../../controllers/UsersController');

    router.post('/:userId/uploadImage', UsersController.uploadImage);
    router.get('/:userId/images', UsersController.getAllImages);

    return router;
})();