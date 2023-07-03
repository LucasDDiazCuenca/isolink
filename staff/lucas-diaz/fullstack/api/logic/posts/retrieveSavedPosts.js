require("dotenv").config()
const { validators: { validateId } } = require('com')
const context = require("../context")
const { ObjectId } = require("mongodb")

//those posts comes from retrievePosts

module.exports = function retrieveSavedPosts(userId) {
    validateId(userId)

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error("user not found")

            return Promise.all([users.find().toArray(), posts.find().toArray()])
                .then(([users, posts]) => {

                    posts.forEach(post => {
                        const _user = users.find(user => user._id.toString() === post.author.toString())

                        post.author = {
                            id: _user._id.toString(),
                            name: _user.name,
                            avatar: _user.avatar
                        }
                        post.likeCounterNumber = post.likeCounter.length
                        if (post.likeCounter.some(userId => userId.equals(user._id))) {
                            post.likeCounter = true
                        } else {
                            post.likeCounter = false
                        }
                        if (user._id.toString() === post.author.id.toString()) {
                            post.userProperty = true
                        } else {
                            post.userProperty = false
                        }
                    });

                    if (user.savedPosts.length > 0) {
                        const savedPosts = posts.filter(post => user.savedPosts.some(savedPostId => savedPostId.equals(post._id)));
                        savedPosts.forEach(post => delete post.author.id)
                        return savedPosts.reverse()
                    } else {
                        return []
                    }

                });
        });
}