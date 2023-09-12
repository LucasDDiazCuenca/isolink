require("dotenv").config()
const {
    validators: { validateId, validateText },
    errors: { ExistenceError } } = require("com")
const { User } = require("../../data/models")

/**
 * 
 * @param {string} userId The user's id
 * @param {string} newUsername The user's new name
 * @returns {void} Doesn't return anything
 * 
 * @throws {TypeError} On non-string user's id or newUsername (sync)
 * @throws {ContentError } On empty user's id or newUsername (sync)
 * 
 * @throws {ExistenceError} On non existing user with this userId
 * 
 */

module.exports = function updateUserUsername(userId, newUsername) {
    validateId(userId)
    validateText(newUsername)

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError("user not found")

        await user.updateOne({ name: newUsername })
    })()
}