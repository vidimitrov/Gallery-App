var app = require('./express');

module.exports = (function(){
    var users = require('./../server/routes/api/users');
    var auth = require('./../server/routes/auth');

    app.use('/auth', auth);
    app.use('/api/users', users);
    app.use('/', function (req, res) {
        res.send('This is the Gallery App API');
    });

    // Catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var error = new Error('Not Found');
        error.status = 404;
        next(error);
    });
})();