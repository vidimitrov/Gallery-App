"use strict";

var config = require('./config/config');

var passport = require('./config/passport');

require('./config/mongoose');

// Express configuration
var app = require('./config/express');

// Routes configuration
require('./config/routes');

// Start server
app.listen(config.port, function () {
    console.log('Server listening on port: ', config.port);
});