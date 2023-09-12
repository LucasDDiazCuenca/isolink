require("dotenv").config()
const {
    validators: { validateId },
    errors: { ExistenceError }
} = require('com')

const { User, Post } = require("../../data/models")

/**
 * 
 * @param {string} userId The user's id 
 * @param {string} postId The post's id
 * @returns {Promise<Object>} An user's post
 * 
 * @throws {ContentError } On empty id (sync)
 * @throws {TypeError} On non-string id (sync)
 * 
 * @throws {ExistenceError} On user not found (async)
 */

module.exports = function retrievePostByPostId(userId, postId) {
    validateId(userId)
    validateId(postId)

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new ExistenceError("user not found")

            return Post.findById(postId).populate("author", "-password -savedPosts").lean()
                .then((post) => {
                    if (!post) throw new ExistenceError("post not found")
                    
                    post.author._id = post.author._id.toString()
                    post.likeCounterNumber = post.likeCounter.length

                    if (post.likeCounter.some(userId => userId.equals(user._id))) {
                        post.likeCounter = true
                    } else {
                        post.likeCounter = false
                    }
                    if (user._id.toString() === post.author._id) {
                        post.userProperty = true
                    } else {
                        post.userProperty = false
                    }

                    delete post.author._id
                    delete post.author.__v
                    delete post.__v

                    return post
                })
        });
}