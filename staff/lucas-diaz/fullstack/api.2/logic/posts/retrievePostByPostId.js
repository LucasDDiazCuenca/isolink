require("dotenv").config()
const { validators: { validateId } } = require('com')
const context = require("../context")
const { ObjectId } = require("mongodb")

module.exports = function retrievePostByPostId(userId, postId) {
    validateId(userId)
    validateId(postId)

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error("user not found")

            return Promise.all([users.find().toArray(), posts.find().toArray()])
                .then(([users, posts]) => {
                    posts.forEach(post => {
                        const _user = users.find(user => user._id.toString() === post.author)

                        post.author = {
                            id: _user._id.toString(),
                            name: _user.name,
                            avatar: _user.avatar
                        }
                    });

                    return posts.find(post => post._id.toString() === postId)
                })

        });
} 