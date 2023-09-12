require("dotenv").config()
const { validators: { validateId, validateUrl, validateText } } = require("com")
const context = require("../context")
const { ObjectId } = require("mongodb")

module.exports = function updatePost(userId, postId, image, text) {
    validateId(userId);
    validateUrl(image);
    validateText(text);

    const { users, posts } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error("user not found")

            return posts.findOne({ _id: new ObjectId(postId) })
                .then(post => {
                    if (!post) throw new Error("post not found")
                    if (user._id.toString() !== post.author) throw new Error("The current user Id doesnt belong to post Id")


                    return posts.updateOne({ _id: new ObjectId(postId) }, { $set: { image: image, text: text } })
                })
        })
}