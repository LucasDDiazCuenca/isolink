require("dotenv").config()
const { validators: { validateId } } = require("com")
const context = require("../context")
const { ObjectId } = require("mongodb")


module.exports = function toggleHidePost(userId, postId) {
    validateId(userId)
    validateId(postId)

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error("user not found")

            return posts.findOne({ _id: new ObjectId(postId) })
                .then(post => {
                    if (user._id.toString() !== post.author) throw new Error("this user has not permition to hide this post")

                    if (post.visibility !== "private") {
                        return posts.updateOne({ _id: new ObjectId(postId) }, { $set: { visibility: "private" } })
                    } else {
                        return posts.updateOne({ _id: new ObjectId(postId) }, { $set: { visibility: "public" } })
                    }
                })
        })
}