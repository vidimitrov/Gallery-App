module.exports = function(app){
    var users = require('./../server/routes/users');
    var galleries = require('./../server/routes/galleries');

    app.use('/users', users);
    app.use('/gallery', galleries);

    // Catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var error = new Error('Not Found');
        error.status = 404;
        next(error);
    });
};