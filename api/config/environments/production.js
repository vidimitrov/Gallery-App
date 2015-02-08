var	path = require('path');
var	rootPath = path.normalize(__dirname + '/../../');

// Add specific to production environment configurations
module.exports = {
    rootPath : rootPath,
    port: process.env.NODE_ENV || 3000,
    environment: 'production',
    session: {
        resave: true,
        saveUninitialized: true,
        secret: 'somespecialsecret'
    },
    db: 'mongodb://admin:admin@ds053090.mongolab.com:53090/gallery-app'
};