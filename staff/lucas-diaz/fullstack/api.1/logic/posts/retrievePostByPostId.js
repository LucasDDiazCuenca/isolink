require("dotenv").config()
const { readFile } = require("fs")
const { validators: {validateId} } = require('com') 

module.exports = function retrievePostByPostId (userId, postId, callback) {
    validateId(userId)
    validateId(postId)

    readFile(`${process.env.DB_PATH}/users.json`,  (error, json) => {
        if (error) {
            callback(error)
            return
        }
        const users = JSON.parse(json)
        //buscar user 
        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error("User not found"))
            return
        }

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
            if(error){
                callback(error)
                return
            }
            
            const posts = JSON.parse(json)
            const post = posts.find(post => post.id === postId)

            if(userId !== post.author){
                callback(new Error("user id diferent than post author"))
                return
            }

            callback(null, post)
        })
    })
} 