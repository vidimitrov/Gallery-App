var app = require('./express');

module.exports = (function () {
    app.get('/', function (req, res) {
        res.send('This is the mobile Gallery app API');
    });

    app.get('/gallery', function (req, res) {
        res.json({
            images: ['picture1', 'picture2', 'picture3'],
            user: req.seneca.user
        });
    });

    app.post('/someUrl', function (req, res) {
        console.log('Params: ', req.body);
        res.send(req.body);
    });

    app.get('/someUrl', function (req, res) {
        console.log('Request:', req);
        res.send('GG');
    });
})();