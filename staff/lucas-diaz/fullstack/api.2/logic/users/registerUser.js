require("dotenv").config()
const { validators: { validateUsername, validateEmail, validatePassword } } = require("com")
const context = require("../context")

module.exports = function registerUser(name, email, password) {
    validateUsername(name)
    validateEmail(email)
    validatePassword(password)

    const { users } = context
    const avatar = "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"
    const savedPosts = []

    return users.insertOne({ name, email, password, avatar, savedPosts })
        .catch(error => {
            if (error.message.includes("E11000"))
                throw new Error(`user with email ${email} already exists`)
            throw error
        })
} 