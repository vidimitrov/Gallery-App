var express = require('express');

var app = express();
var config = require('./config/config');

/** Express Config */
require('./config/express')(app);

/** Routes Config */
require('./config/routes')(app);

//Server init
var server = app.listen(config.port, function () {
	console.log('Server running on port : ' + config.port);
});
