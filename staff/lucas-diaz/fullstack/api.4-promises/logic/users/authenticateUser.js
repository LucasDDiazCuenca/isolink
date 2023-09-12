require("dotenv").config()
const {
    validators: { validateEmail, validatePassword },
    errors: { ExistenceError, AuthError }
} = require("com")

const { User } = require("../../data/models")

/**
 * @param {string} email The user's email
 * @param {string} password The user's password
 * @returns {Promise <string>} The user's id
 * 
 * @throws {ContentError } On empty email or password (sync)
 * @throws {TypeError} On non-string email or password (sync)
 * @throws {FormatError} On wrong format in email or password (sync)
 * @throws {RangeError} On password shorten than 4 char (sync)
 * 
 * @throws {ExistenceError} On user not found (async)
 * @throws {AuthError} On failed correlation on db and provided data in order to authorize this action(async)
 */

module.exports = function authenticateUser(email, password) {
    validateEmail(email)
    validatePassword(password)

    return User.findOne({ email: email })
        .then(user => {
            if (!user) throw new ExistenceError(`there is no user with email: ${email}`)

            if (user.password !== password) throw new AuthError("wrong credentials")
            return user.id
        })
}


