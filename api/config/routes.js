module.exports = function(app){
    var users = require('./../server/routes/api/users');

    app.use('/api/users', users);

    // Catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var error = new Error('Not Found');
        error.status = 404;
        next(error);
    });
};