require("dotenv").config()
const { validators: { validateId, validateUrl, validateText } } = require("com")
const context = require("../context")
const { ObjectId } = require("mongodb")

module.exports = function createPost(userId, image, text) {
    validateId(userId)
    validateUrl(image)
    validateText(text)

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error("user not found")

            return posts.insertOne({
                author: userId,
                userName: user.name,
                image,
                text,
                date: new Date,
                likeCounter: [],
                visibility: "public"
            })
                .catch(error => {
                    if (error.message.includes("E11000"))
                        throw new Error("fail on some data in insertOne function")
                    throw error
                })
        })
}