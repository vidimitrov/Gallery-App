var express = require('express');
var router = express.Router();

module.exports = (function () {
    var GalleriesController = require('./../controllers/GalleriesController');

    router.route('/')
        .get(GalleriesController.getAll)
        .post(GalleriesController.create);

    router.route('/:id')
        .get(GalleriesController.getById)
        .put(GalleriesController.update)
        .delete(GalleriesController.remove);

    return router;
})();