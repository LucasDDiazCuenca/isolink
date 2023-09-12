require("dotenv").config()
const {
    validators: { validateUsername, validateEmail, validatePassword },
    errors: { DuplicityError, UnknownError }
} = require("com")

const { User } = require("../../data/models")

/**
 * @param {string} name The users's name
 * @param {string} email The user's email 
 * @param {string} password The user's password
 * @returns {void} Doesn't return anything
 * 
 * @throws {ContentError } On empty name, email or password (sync)
 * @throws {TypeError} On non-string name, email or password (sync)
 * @throws {FormatError} On wrong format in email or password (sync)
 * @throws {RangeError} On password shorten than 4 char (sync)
 * 
 * @throws {DuplicityError} On alreaddy existing user with provided credentials (async)
 */


module.exports = function registerUser(name, email, password) {
    validateUsername(name)
    validateEmail(email)
    validatePassword(password)

    let avatar = "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"

    return (async () => {
        try {
            await User.create({ name, email, password, avatar, savedPosts: [] })
            
        } catch (error) {
            if (error.message.includes('E11000'))
                throw new DuplicityError(`user with email ${email} already exists`)

            throw new UnknownError(error.message)
        }
    })()
} 