require("dotenv").config()
const {
    validators: { validateId, validateUrl, validateText },
    errors: { ExistenceError }
} = require("com")
const context = require("../context")
const { ObjectId } = require("mongodb")

/**
 * 
 * @param {string} userId The user's id 
 * @param {string} image  The user's image url 
 * @param {string} text  The user's post text 
 * @returns {void} Doesn't return anything
 * 
 * @throws {ContentError } On empty name, email or password (sync)
 * @throws {TypeError} On non-string name, email or password (sync)
 * @throws {FormatError} On wrong format in url (sync)
 * 
 * @throws {ExistenceError} On user not found (async)
 */

module.exports = function createPost(userId, image, text) {
    validateId(userId)
    validateUrl(image)
    validateText(text)

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new ExistenceError("user not found")

            return posts.insertOne({
                author: new ObjectId(userId),
                userName: user.name,
                image,
                text,
                date: new Date,
                likeCounter: [],
                visibility: "public"
            })
        })
}