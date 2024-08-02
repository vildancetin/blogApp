"use strict";
/*
    BLOG API MODELS
*/
const mongoose = require("mongoose")

// import hashing password function
const passwordEncrypt = require("../helpers/passwordEncrypt")

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true
    },
    lastName:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required: [true, 'Email field must be required'],
        unique: [true, 'There is this email. Email field must be unique'],
    },
    password:{
        type:String,
        required:true,
        set:(password)=>passwordEncrypt(password)
    },
    profilePicture:{
        type:String,
    },
    bio:{
        type:String
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"BlogPost"
    }]
},{
    collection:"user",
    timestamps:true
})
module.exports = mongoose.model("User", UserSchema)