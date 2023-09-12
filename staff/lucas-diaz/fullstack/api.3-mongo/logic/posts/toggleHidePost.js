require("dotenv").config()
const { 
    validators: { validateId },
    errors: {ExistenceError, AuthError} 
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
 * 
 * @throws {ExistenceError} On user not found (async)
 * @throws {AuthError} On failed correlation on db and provided data in order to authorize this action(async)
 */


module.exports = function toggleHidePost(userId, postId) {
    validateId(userId)
    validateId(postId)

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new ExistenceError("user not found")

            return posts.findOne({ _id: new ObjectId(postId) })
                .then(post => {
                    if (user._id.toString() !== post.author.toString()) throw new AuthError("this user has not permition to hide this post")

                    if (post.visibility !== "private") {
                        return posts.updateOne({ _id: new ObjectId(postId) }, { $set: { visibility: "private" } })
                    } else {
                        return posts.updateOne({ _id: new ObjectId(postId) }, { $set: { visibility: "public" } })
                    }
                })
        })
}