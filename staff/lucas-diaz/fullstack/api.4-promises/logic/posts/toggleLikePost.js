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


    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError("user not found")

            return Post.findById(postId)
                .then(post => {
                    if (post.likeCounter.some(userId => userId.equals(user._id))) {
                        return Post.updateOne({ _id: postId }, { $pull: { likeCounter: user._id } })

                    } else {
                        return Post.updateOne({ _id: postId }, { $push: { likeCounter: user._id } })
                    }
                })
        })
}