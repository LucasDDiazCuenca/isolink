require("dotenv").config()
const { validators: { validateId } } = require("com")
const context = require("../context")
const { ObjectId } = require("mongodb")

module.exports = function retrieveUser(userId) {
    validateId(userId)

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new Error("user not found")

            //sanitaze
            delete user._id
            delete user.password
            delete user.email

            return user
        })
}