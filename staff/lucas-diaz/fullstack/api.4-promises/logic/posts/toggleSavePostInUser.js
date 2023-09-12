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

module.exports = function toggleSavePostInUser(userId, postId) {
    validateId(userId)
    validateId(postId)


    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError("user not found")

            return Post.findById(postId)
                .then(post => {

                    if (user.savedPosts.some(postId => postId.equals(post._id))) {

                        return User.updateOne({ _id: userId }, { $pull: { savedPosts: post._id } })

                    } else {
                        return User.updateOne({ _id: userId }, { $push: { savedPosts: post._id } })
                    }
                })
        })
}