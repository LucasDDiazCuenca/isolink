require("dotenv").config()
const {
    validators: { validateId },
    errors: { ExistenceError, AuthError }
} = require("com")
const { User, Post } = require("../../data/models")

/**
 * 
 * @param {string} userId The user's id
 * @param {string} postId The post's id
 * @returns {void} Doesn't return anything
 * 
 * @throws {ContentError } On empty id (sync)
 * @throws {TypeError} On non-string id (sync)
 * 
 * @throws {ExistenceError} On user not found (async)
 * @throws {AuthError} On failed correlation on db and provided data in order to authorize this action(async)
 */

module.exports = function toggleHidePost(userId, postId) {
    validateId(userId)
    validateId(postId)

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new ExistenceError("user not found")

        let post = await Post.findById(postId)
        if (!post) throw new ExistenceError("post not found")
        if (user._id.toString() !== post.author.toString()) throw new AuthError("this user has not permition to hide this post")

        if (post.visibility === "public") {
            await post.updateOne({ visibility: "private" })

        } else {
            await post.updateOne({ visibility: "public" })
        }
    })()
}