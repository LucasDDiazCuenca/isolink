require("dotenv").config()
const { validators: { validateId } } = require("com")
const context = require("../context")
const { ObjectId } = require("mongodb")

module.exports = function deletePost(userId, postId) {
    validateId(userId)
    validateId(postId)

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error("user not found")

            return posts.findOne({ _id: new ObjectId(postId) })
        })
        .then(post => {
            if (!post) throw new Error("post not found")
            if (post.author !== userId) throw new Error("this user has not permition to delete this post")

            return posts.deleteOne({ _id: new ObjectId(postId) })
        })
}