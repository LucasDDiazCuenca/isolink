require("dotenv").config()
const { validators: { validateId, validateUrl } } = require("com")
const context = require("../context")
const { ObjectId } = require("mongodb")

module.exports = function updateUserAvatar(userId, avatar) {
    validateId(userId)
    validateUrl(avatar)

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error("user not found")

            return users.updateOne({ _id: new ObjectId(userId) }, { $set: { avatar: avatar } })
        })
}