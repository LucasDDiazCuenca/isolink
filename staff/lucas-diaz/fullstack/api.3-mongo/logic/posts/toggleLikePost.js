require("dotenv").config()
const { 
    validators: { validateId },
    errors: {ExistenceError} 
} = require("com")
const context = require("../context")
const { ObjectId } = require("mongodb")

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

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new ExistenceError("user not found")

            return posts.findOne({ _id: new ObjectId(postId) })
                .then(post => {


                    if (post.likeCounter.some(userId => userId.equals(user._id))) {
                        return posts.updateOne({ _id: new ObjectId(postId) }, { $pull: { likeCounter: user._id } })
                    } else {
                        return posts.updateOne({ _id: new ObjectId(postId) }, { $push: { likeCounter: user._id } })
                    }
                })
        })
}