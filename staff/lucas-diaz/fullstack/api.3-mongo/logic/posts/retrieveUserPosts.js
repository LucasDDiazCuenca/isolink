require("dotenv").config()
const { 
    validators: { validateId },
    errors: {ExistenceError} 
} = require('com')
const context = require("../context")
const { ObjectId } = require("mongodb")

/**
 * 
 * @param {string} userId The user's id
 * @returns {Promise<Object>} Returns all the user's posts 
 * 
 * @throws {ContentError } On empty id (sync)
 * @throws {TypeError} On non-string id (sync)
 * 
 * @throws {ExistenceError} On user not found (async)
 */


module.exports = function retrieveUserPosts(userId) {
    validateId(userId);

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new ExistenceError("user not found")

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

                    const userPosts = posts.filter(post => {
                        return post.author.id === user._id.toString()
                    })
                    userPosts.forEach(post => delete post.author.id)
                    return userPosts.reverse()

                });
        });

}



