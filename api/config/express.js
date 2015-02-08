'use strict';

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = require('./config');
var passport = require('./passport');

module.exports = (function () {
    var app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());

    // Configure session management
    app.use(session(config.session));

    // Initialize passport
    app.use(passport.initialize());
    app.use(passport.session());

    // Access-Control-Allow-Origin headers configuration
    app.use(function (req, res, next) {

        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'X-Custom-Header, Content-Type, Authorization, Content-Length, X-Requested-With');

        next();
    });

    return app;
})();