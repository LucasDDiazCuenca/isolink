require("dotenv").config()
const { 
    validators: { validateId, validateUrl, validateText },
    errors: {ExistenceError, AuthError} 
} = require("com")
const context = require("../context")
const { ObjectId } = require("mongodb")

/**
 * 
 * @param {string} userId The user's id
 * @param {string} postId The post's id
 * @param {string} image The post's image url
 * @param {string} text The post's text 
 * @returns {void} Doesn't return anything
 * 
 * @throws {ContentError } On empty id, image or text (sync)
 * @throws {TypeError} On non-string id, image or text (sync)
 * @throws {FormatError} On wrong format in image's url (sync)
 * 
 * @throws {ExistenceError} On user not found (async)
 * @throws {AuthError} On failed correlation on db and provided data in order to authorize this action(async)
 * 
 */


module.exports = function updatePost(userId, postId, image, text) {
    validateId(userId);
    validateId(postId)
    validateUrl(image);
    validateText(text);

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new ExistenceError("user not found")

            return posts.findOne({ _id: new ObjectId(postId) })
                .then(post => {
                    if (!post) throw new ExistenceError("post not found")
                    if (user._id.toString() !== post.author.toString()) throw new AuthError("The current user Id doesnt belong to post Id")

                    return posts.updateOne({ _id: new ObjectId(postId) }, { $set: { image: image, text: text } })
                })
        })
}