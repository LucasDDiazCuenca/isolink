require("dotenv").config()
const { readFile, writeFile } = require("fs")
const { validators: { validateId } } = require("com")

module.exports = function toggleLikePost(userId, postId, callback) {
    validateId(userId)

    readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
        if (error) {
            callback(error)
            return
        }

        const users = JSON.parse(json)
        const user = users.find(_user => _user.id === userId)

        if (!user) {
            callback(new Error("user not found"))
            return
        }

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
            if (error) {
                callback(error)
                return
            }
            const posts = JSON.parse(json)
            const foundPost = posts.find(post => post.id === postId)

            if (!foundPost) {
                callback(new Error("post not found"))
                return
            }

            if (foundPost.likeCounter.includes(user.id)) {
                const userIndex = foundPost.likeCounter.indexOf(user.id)
                foundPost.likeCounter.splice(userIndex, 1);

            } else {
                foundPost.likeCounter.push(user.id);

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