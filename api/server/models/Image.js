var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ImageSchema = new Schema({
    src: String
});

module.exports = mongoose.model('Image', ImageSchema);