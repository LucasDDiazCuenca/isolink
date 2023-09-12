require("dotenv").config()
const { validators: { validateId, validatePassword } } = require("com")
const context = require("../context")
const { ObjectId } = require("mongodb")

module.exports = function updateUserPassword(userId, password, newPassword, newPasswordConfirmation) {
    validateId(userId)
    validatePassword(password)
    validatePassword(newPassword)
    validatePassword(newPasswordConfirmation)

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error("user not found")

            if (user.password !== password) throw new Error("typed password isn't actual password user's value")

            if (password === newPassword) throw new Error("New password must be different as previous password")

            if (newPassword !== newPasswordConfirmation) throw new Error("new password and new password confirmation does not match")

            return users.updateOne({ _id: new ObjectId(userId) }, { $set: { password: newPassword } })
        })
}