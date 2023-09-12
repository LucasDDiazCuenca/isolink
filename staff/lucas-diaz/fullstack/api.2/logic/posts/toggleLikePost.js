require("dotenv").config()
const { validators: { validateId } } = require("com")
const context = require("../context")
const { ObjectId } = require("mongodb")

module.exports = function toggleLikePost(userId, postId) {
    validateId(userId)

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error("user not found")

            return posts.findOne({ _id: new ObjectId(postId) })
                .then(post => {
                    if (post.likeCounter.includes(userId)) {
                        return posts.updateOne({ _id: new ObjectId(postId) }, { $pull: { likeCounter: userId } })
                    } else {
                        return posts.updateOne({ _id: new ObjectId(postId) }, { $push: { likeCounter: userId } })
                    }
                })
        })
}