require("dotenv").config()
const { validators: { validateId } } = require("com")
const context = require("../context")
const { ObjectId } = require("mongodb")

module.exports = function toggleSavePostInUser(userId, postId) {
    validateId(userId)
    validateId(postId)
    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error("user not found")

            return posts.findOne({ _id: new ObjectId(postId) })
                .then(post => {


                    if (user.savedPosts.some(postId => postId.equals(post._id))) {
                        return users.updateOne({ _id: new ObjectId(userId) }, { $pull: { savedPosts: post._id } })
                        
                    } else {
                        return users.updateOne({ _id: new ObjectId(userId) }, { $push: { savedPosts: post._id } })
                    }
                })
        })
}