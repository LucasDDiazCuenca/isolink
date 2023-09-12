require("dotenv").config()
const {
    validators: { validateId, validateUrl, validateText },
    errors: { ExistenceError, AuthError }
} = require("com")
const { User, Post } = require("../../data/models")


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

    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError("user not found")

            console.log(user._id)
            return Post.findById(postId)
                .then(post => {
                    console.log(post.author)
                    if (!post) throw new ExistenceError("post not found")
                    if (user._id.toString() !== post.author.toString()) throw new AuthError("The current user Id doesnt belong to post Id")

                    return post.updateOne({ image: image, text: text })
                })
        })
}