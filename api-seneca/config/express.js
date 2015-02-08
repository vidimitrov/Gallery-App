'use strict';

var express        = require('express');
var bodyParser     = require('body-parser');
var cookieParser   = require('cookie-parser');
var methodOverride = require('method-override');
var session        = require('express-session');
var argv           = require('optimist').argv;

var seneca = require('./seneca');

module.exports = (function () {
    var app = express();

    app.use(cookieParser());
    app.use(express.query());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(methodOverride());
    app.use(bodyParser.json());
    app.use(session({
        secret:'seneca',
        saveUninitialized: true,
        resave: true
    }));
    app.use(seneca.export('web'));

    return app;
})();