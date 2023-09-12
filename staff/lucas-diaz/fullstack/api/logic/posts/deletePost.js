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

    return (async () => {

        const user = await User.findById(userId)

        if (!user) throw new ExistenceError("user not found")

        const post = await Post.findById(postId)

        if (!post) throw new ExistenceError("post not found")

        if (post.author.toString() !== userId) throw new AuthError("this user has not permition to delete this post")

        const users = await User.find()
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

        return await Promise.all([...usersUpdated, Post.deleteOne({ _id: postId })])
    })()
}

