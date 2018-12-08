const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
        max:20
    },
    email:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = User = mongoose.model('user', userSchema)