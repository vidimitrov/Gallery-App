"use strict";

var config = require('./config/config');

// Seneca plugins configuration
var seneca = require('./config/seneca');

// Express configuration
var app = require('./config/express');

// Routes configuration
require('./config/routes');

// Start server
app.listen(config.port, function () {
  console.log('Server listening on port: ', config.port);
});