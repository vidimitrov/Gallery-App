module.exports = (function () {
    var seneca = require('seneca')();

    seneca.use('mongo-store',{
        //name: 'gallery-app',
        //host: 'admin:admin@ds053090.mongolab.com',
        //port: 53090,
        name: 'gallery-app',
        host: '127.0.0.1',
        port: 27017
    });

    return seneca;
})();

//seneca.ready(function(){
    //var testUser = seneca.make$('user');
    //
    //testUser.name  = 'Pink Lady';
    //testUser.age = 25;
    //
    //testUser.save$(function(err, createdUser){
    //    console.log("Created user: "+ createdUser);
    //})
//});