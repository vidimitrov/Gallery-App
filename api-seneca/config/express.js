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

    // Access-Control-Allow-Origin headers configuration
    //app.use(function (req, res, next) {
    //
    //    res.header('Access-Control-Allow-Credentials', true);
    //    res.header('Access-Control-Allow-Origin', '*');
    //    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //    res.header('Access-Control-Allow-Headers', 'X-Custom-Header, Content-Type, Authorization, Content-Length, X-Requested-With');
    //
    //    next();
    //});

    app.use(function(req, res, next) {
        console.log('Request *', req);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    //app.all('*', function (req, res, next) {
    //
    //    res.header('Access-Control-Allow-Credentials', true);
    //    res.header('Access-Control-Allow-Origin', '*');
    //    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //    res.header('Access-Control-Allow-Headers', 'X-Custom-Header, Content-Type, Authorization, Content-Length, X-Requested-With')
    //
    //    next();
    //});

    return app;
})();