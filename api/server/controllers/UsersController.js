var seneca = require('./../../config/mongoose');
//var userEntity = seneca.make$('user');

module.exports = (function () {

    function uploadImage (req, res) {
        var userId = req.params.userId;

        console.log(req.body);

        res.send('Uploading...' + 'User id: ' + userId);
    }

    return {
        uploadImage: uploadImage
    }
})();