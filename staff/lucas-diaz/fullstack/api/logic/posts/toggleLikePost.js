require("dotenv").config()
const {
    validators: { validateId },
    errors: { ExistenceError }
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
 * @throws {ExistenceError} On user not found (async)
 */

module.exports = function toggleLikePost(userId, postId) {
    validateId(userId)

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new ExistenceError("user not found")

        let post = await Post.findById(postId)
        if (!post) throw new ExistenceError("post not found")

        if (post.likeCounter.some(userId => userId.equals(user._id))) {
            await Post.updateOne({ _id: postId }, { $pull: { likeCounter: user._id } })

        } else {
            await Post.updateOne({ _id: postId }, { $push: { likeCounter: user._id } })
        }
    })()
}