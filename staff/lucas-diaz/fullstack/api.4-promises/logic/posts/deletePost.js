require("dotenv").config()
const {
    validators: { validateId },
    errors: { ExistenceError, AuthError }
} = require("com")

const { User, Post } = require("../../data/models")

/**
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


    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError("user not found")

            return Post.findById(postId)
                .then(post => {
                    if (!post) throw new ExistenceError("post not found")

                    if (post.author.toString() !== userId) throw new AuthError("this user has not permition to delete this post")

                    return User.find()
                        .then(users => {
                            const modifyUsers = []

                            users.forEach(user => {
                                if (user.savedPosts) {
                                    const index = user.savedPosts.findIndex(postIndex => postIndex.toString() === postId)
                                    
                                    if (index > -1) {
                                        user.savedPosts.splice(index, 1)

                                        modifyUsers.push(user)
                                    }
                                }
                            })

                            const usersUpdated = modifyUsers.map(user => user.save())

                            return Promise.all([...usersUpdated, Post.deleteOne({ _id: postId })])
                                .then(() => { })
                        })
                })
        })
}
