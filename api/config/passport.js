var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./../server/models/User');

module.exports = (function () {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (error, user) {
            done(error, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, username, password, done) {
        process.nextTick(function () {
            User.findOne({'username': username}, function (error, user) {
                if (error) {
                    return done(error);
                }

                if (user) {
                    return done(null, false, { message: 'Username already exist!' });
                } else {
                    var newUser = new User();

                    newUser.username = username;
                    newUser.password = newUser.generateHash(password);

                    newUser.save(function (error) {
                        if (error) {
                            throw error;
                        }

                        return done(null, newUser, { message: 'Sign up succeeded!' });
                    });
                }
            });
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, username, password, done) {
        User.findOne({'username': username}, function (error, user) {
            if (error) {
                return done(error);
            }

            if (!user) {
                return done(null, false, { message: 'No user found!' });
            }

            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Wrong password!' });
            }
            return done(null, user, { message: 'Login succeeded!' });
        });
    }));

    return passport;
})();