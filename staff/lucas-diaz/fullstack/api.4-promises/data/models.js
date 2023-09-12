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
        type: String,
        default: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
    },
    savedPosts: {
        type: [ObjectId],
        ref: 'Post',
        default: []
    }
})

const post = new Schema({
    author: {
        type: ObjectId,
        ref: "User",  
        required: true
    },
    userName: {
        type: String,
        ref: "User",
        required: true
    },
    image: {
        type: String,
        required: true
    },
    text: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    likeCounter: {
        type: [ObjectId],
        ref: 'User',
        default: []
    },
    visibility: {
        type: String,
        default: "public"
    }
})

const User = model("User", user)
const Post = model("Post", post)


module.exports = {
    User,
    Post
}