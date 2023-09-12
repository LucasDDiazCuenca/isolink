require("dotenv").config()
const {
    validators: { validateId, validatePassword },
    errors: { ExistenceError, ContentError }
} = require("com")
const { User } = require("../../data/models")

/**
 * @param {string} userId The user's id 
 * @param {string} password The user's current password
 * @param {string} newPassword The user's new password
 * @param {string} newPasswordConfirmation The user's new password repetition
 * @returns {void} Doesn't return anything
 * 
 * @throws {ContentError } On empty user's id or password (sync)
 * @throws {TypeError} On non-string user's id or password (sync)
 * @throws {FormatError} On wrong format password (sync)
 * @throws {RangeError} On password shorten than 4 char (sync)
 * 
 * @throws {ContentError} On password, new password and new password confirmation credentials (async)
 * @throws {ExistenceError} On non existing user with this userId
 */

module.exports = function updateUserPassword(userId, password, newPassword, newPasswordConfirmation) {
    validateId(userId)
    validatePassword(password)
    validatePassword(newPassword)
    validatePassword(newPasswordConfirmation)

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError("user not found")

        if (user.password !== password) throw new ContentError("typed password isn't actual password user's value")

        if (password === newPassword) throw new ContentError("New password must be different as previous password")

        if (newPassword !== newPasswordConfirmation) throw new ContentError("new password and new password confirmation does not match")

        await user.updateOne({ password: newPassword })
    })()
}