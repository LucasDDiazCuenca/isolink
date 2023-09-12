const mongoose = require("mongoose")

const { Schema, Schema: { Types: { ObjectId } }, model } = mongoose

const user = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true,  
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8
    },
    avatar: {
        type: Boolean ,
        default: false
    }, 
    friends:{
        type: [ObjectId],
        reqired: true,
        default: [],
        ref: "user"
    },
    friendRequests: {
        type: [ObjectId],
        required: true, 
        ref: "User",
        default: []
    },
    connected:{
        type: Boolean,
        required: true,
        default: false
    }
})

const User = model("User", user)

const avatar = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: "User"
    }, 
    model:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,  
    },
    personality: {
        type: String,
        required: true,  
    },
    age: {
        type: String,
        required: true,  
    }, 
    hair:{
        type: String,
        required: true,
    },
    skin:{
        type: String,
        required: true,
    },
    shirt:{
        type: String,
        required: true,
    },
    trousers:{
        type: String,
        required: true,
    },
    shoes:{
        type: String,
        required: true,
    },
    emotions:{
        type: Array,
        required: true, 
        default: []
    }
})

const Avatar = model("Avatar", avatar)

module.exports = {
    User,
    Avatar
}