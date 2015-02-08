var passport = require('./../../config/passport');

module.exports = (function () {
    var login = function login (req, res, next) {
        passport.authenticate('local-login', function (error, user, info) {
            if (error) {
                return next(error);
            }

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }

                res.json({
                    user: user,
                    info: info
                });
            });

        })(req, res, next);
    };


    var signup = function signup (req, res, next) {
        passport.authenticate('local-signup', function (error, user, info) {
            if (error) {
                return next(error);
            }

            res.json({
                user: user,
                info: info
            });
        })(req, res, next);
    };

    var logout = function logout (req, res) {
        req.logout();
        res.send('Successfully logged out');
    };

    // Route middleware to make sure a user is logged in
    var isAuthenticated = function isAuthenticated (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/');
        }
    }

    // TODO: Authorization middleware

    return {
        login: login,
        signup: signup,
        logout: logout,
        isAuthenticated: isAuthenticated
    };
})();