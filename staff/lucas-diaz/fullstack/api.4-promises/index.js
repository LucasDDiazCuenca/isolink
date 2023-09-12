require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express") 
const  cors  = require("cors")
const bodyParser = require("body-parser")

const { helloApiHandler, registerUserHandler, authenticateUserHandler, retrieveUserHandler, updateUserAvatarHandler, updateUserPasswordHandler, createPostHandler, retrievePostsHandler, retrieveSavedPostsHandler, retrieveUserPostsHandler, retrievePostByPostIdHandler, toggleHidePostHandler, toggleLikePostHandler, toggleSavePostInUserHandler, updatePostHandler, deletePostHandler } = require("./handlers")


mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const api = express()

        const jsonBodyParser = bodyParser.json()

        api.use(cors())
        api.get("/", helloApiHandler)

        //!USERS
        api.post("/users", jsonBodyParser, registerUserHandler)
        api.post("/users/auth", jsonBodyParser, authenticateUserHandler)
        api.get("/users", retrieveUserHandler)
        api.patch("/users/avatar", jsonBodyParser, updateUserAvatarHandler)
        api.patch("/users/password", jsonBodyParser, updateUserPasswordHandler)

        //!POSTS
        api.post("/posts", jsonBodyParser, createPostHandler)
        api.get("/posts", retrievePostsHandler)
        api.get("/posts/saved", retrieveSavedPostsHandler)
        api.get("/posts/users", retrieveUserPostsHandler)
        api.get("/posts/:postId", retrievePostByPostIdHandler)
        api.patch("/posts/hide/:postId", toggleHidePostHandler)
        api.patch("/posts/like/:postId", toggleLikePostHandler)
        api.patch("/users/save/:postId", toggleSavePostInUserHandler)
        api.patch("/posts/update/:postId", jsonBodyParser, updatePostHandler)
        api.delete("/posts/delete/:postId", deletePostHandler)
        
        api.listen(process.env.PORT, () => console.log(`Process running in port ${process.env.PORT}`))

    })
    .catch(console.error)
