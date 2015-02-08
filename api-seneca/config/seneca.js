var seneca = require('seneca')();

seneca.use('mongo-store',{
    name: 'gallery-app',
    host: '127.0.0.1',
    port: 27017
});
seneca.use('user');
seneca.use('auth',{
    restrict: ['/gallery', '/account'],
    redirect:{
        login: {
            win:  '/account',
            fail: '/login#failed'
        },
        register: {
            win:  '/account',
            fail: '/#failed'
        }
    }
});

// Seed
var admin = seneca.pin({
    role: 'user',
    cmd: '*'
});

admin.register({
    nick: 'admin',
    name: 'admin',
    email: 'admin@email.com',
    password: '123123',
    active: true,
    admin: true
});

module.exports = seneca;