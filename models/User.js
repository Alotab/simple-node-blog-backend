const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true,
        unique : true,
        trim: true
    },
    name : {
        type : String,
        required : false,
        unique : false,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase :  true
    },
    password : {
        type : String,
        required : true
    },
    bio : {
        type : String,
        required : false
    },
    role : {
        type : String,
        enum : ['user', 'author', 'admin'],
        default : 'user'
    }
}, {timestamps : true});

module.exports = mongoose.model('User', UserSchema);