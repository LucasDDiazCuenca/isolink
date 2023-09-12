require("dotenv").config()
const { readFile, writeFile } = require("fs")
const { validators: { validateId } } = require("com")

module.exports = function deletePost(userId, postId, callback) {
    validateId(userId)
    validateId(postId)

    readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
        if (error) {
            callback(error)
            return
        }

        const users = JSON.parse(json)
        const user = users.find(_user => _user.id === userId)

        if (!user) {
            callback(new Error("User not found"))
            return
        }

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
            if (error) {
                callback(error)
                return
            }

            const posts = JSON.parse(json)
            const foundPost = posts.find(post => post.id === postId)
            const foundPostIndex = posts.findIndex(post => post.id === postId)

            if (!foundPost) {
                callback(new Error("post not found"))
                return
            }

            if (foundPost.author !== userId) {
                callback(new Error("this user has not permition to delete this post"))
                return
            }

            if (foundPostIndex !== -1) {
                posts.splice(foundPostIndex, 1);
            }

            json = JSON.stringify(posts, null, 4)

            writeFile(`${process.env.DB_PATH}/posts.json`, json, error => {
                if (error) {
                    callback(error)
                    return
                }
                callback(null)
            })
        })
    })
}