var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

module.exports = (function () {
    var auth = require('./../../libs/auth');

    router.post('/login', auth.login);
    router.post('/signup', auth.signup);
    router.get('/logout', auth.logout);

    return router;
})();