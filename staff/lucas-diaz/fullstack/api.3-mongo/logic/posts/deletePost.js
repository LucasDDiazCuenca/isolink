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
 * @returns 
 * 
 * @throws {ContentError } On empty id (sync)
 * @throws {TypeError} On non-string id (sync)
 * 
 * @throws {ExistenceError} On user not found (async)
 * @throws {AuthError} On user anunthorized (async)
 */

module.exports = function deletePost(userId, postId) {
    validateId(userId)
    validateId(postId)

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new ExistenceError("user not found")

            return posts.findOne({ _id: new ObjectId(postId) })
        })
        .then(post => {
            if (!post) throw new ExistenceError("post not found")
            if (post.author.toString() !== userId) throw new AuthError("this user has not permition to delete this post")

            return posts.deleteOne({ _id: new ObjectId(postId) })
        })
}