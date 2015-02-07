var environment = process.env.NODE_ENV || 'development';
var config = require('./environments/' + environment);

module.exports = config;