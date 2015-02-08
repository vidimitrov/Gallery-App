var User = require('./../models/User');

module.exports = (function () {

    function getAllImages (req, res) {
        var userId = req.params.userId;

        User.findById(userId, function (error, user) {
            if (error) {
                res.send(404, 'User not found!');
            }

            res.send(user.images);
        });
    }

    function uploadImage (req, res) {
        var userId = req.params.userId;
        var imageEncodedSrc = req.body.src;

        User.findById(userId, function (error, user) {
            if (error) {
                res.send(404, 'User not found!');
            }

            user.images.push(imageEncodedSrc);

            user.save(function (error) {
                if (error) {
                    res.send(500, 'Cannot upload the new picture!');
                }

                res.send('Picture uploaded successfully!');
            });
        });
    }

    return {
        uploadImage: uploadImage,
        getAllImages: getAllImages
    }
})();