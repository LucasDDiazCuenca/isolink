require("dotenv").config()
const { readFile, writeFile } = require("fs")
const { validators: { validateId, validateUrl, validateText } } = require("com")

module.exports = function createPost(userId, image, text, callback) {
    validateId(userId)
    validateUrl(image)
    validateText(text)

    readFile(`${process.env.DB_PATH}/users.json`, (error, json) => {
        if (error) {
            callback(error)
            return
        }

        const users = JSON.parse(json)
        let user = users.find(user => user.id === userId)

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

            let id = "post-1"

            const lastPost = posts.at(-1)

            if (lastPost)
                id = "post-" + (parseInt(lastPost.id.slice(5)) + 1)

            const post = {
                id,
                author: userId,
                userName: user.name,
                image,
                text,
                date: new Date,
                likeCounter: [],
                visibility: "public"
            }

            posts.push(post)

            json = JSON.stringify(posts, null, 4)
            
            writeFile(`${process.env.DB_PATH}/posts.json`, json, error => {
                if (error){
                    callback(error)
                    return
                }
                callback(null)
            })
        })
    })






}