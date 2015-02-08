var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        default: ''
    },
    lastName: {
        type: String,
        trim: true,
        default: ''
    },
    email: {
        type: String,
        trim: true,
        default: '',
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    username: {
        type: String,
        unique: 'Username already exists',
        required: 'Please fill in a username',
        trim: true
    },
    password: {
        type: String,
        default: ''
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    images: [Schema.Types.Image]
});

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);