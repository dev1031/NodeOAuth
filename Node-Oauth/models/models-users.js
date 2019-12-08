const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : String,
    googleId:String,
    thumbnail:String
    
})
//url of img is string
const User  = mongoose.model('user' , userSchema);
//User is the name of our collection where all the data will be saved

module.exports = User;