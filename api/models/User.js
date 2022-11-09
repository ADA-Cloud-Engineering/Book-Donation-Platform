const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String, 
        required: true
    },
    lastname: {
        type: String, 
        required: true
    },
    emailaddress: {
        type: String, 
        required: true
    },
    city: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    refreshtoken: String
});

module.exports = mongoose.model('User', userSchema)