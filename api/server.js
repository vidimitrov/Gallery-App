var express = require('express');

var app = express();
var config = require('./config/config');

var seneca = require('seneca')();

seneca.use('mongo-store',{
    name: 'gallery-app',
    host: '127.0.0.1',
    port: 27017
});

seneca.use('user');

seneca.use('auth', {
    restrict:['/api/users/'],
    redirect:{
        login: {
            win:  '/',
            fail: '/login#failed'
        },
        register: {
            win:  '/',
            fail: '/#failed'
        }
    }
});

// add seneca middleware
app.use( seneca.export('web') )

var u = seneca.pin({
    role: 'user',
    cmd: '*'
});

u.register({
    nick:'u1',
    name:'nu1',
    email:'u1@example.com',
    password:'u1',
    active:true
});

require('./config/express')(app);
require('./config/routes')(app);

//Server init
var server = app.listen(config.port, function () {
	console.log('Server running on port : ' + config.port);
});
