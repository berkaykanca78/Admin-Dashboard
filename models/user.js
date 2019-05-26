const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    imgUrl:String,
    resetToken: String,
    resetTokenExpiration: Date,
    role:{
        type:String,
        default:'User'
    }
});

module.exports = mongoose.model('User', userSchema);