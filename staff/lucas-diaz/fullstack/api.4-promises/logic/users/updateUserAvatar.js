require("dotenv").config()
const {
    validators: { validateId, validateUrl },
    errors: { ExistenceError }
} = require("com")
const { User } = require("../../data/models")


/**
 * @param {string} userId The user's id
 * @param {string} avatar The user's avatar url 
 * @returns {void} Doesn't return anything
 * 
 * @throws {ContentError } On empty user's id (sync)
 * @throws {TypeError} On non-string user's id (sync)
 * @throws {FormatError} On wrong format in user's id (sync)
 * 
 * @throws {ExistenceError} On user not found (async)
 */


module.exports = function updateUserAvatar(userId, avatar) {
    validateId(userId)
    validateUrl(avatar)


    return User.findById(userId)
        .then(user => {
            if (!user) throw new ExistenceError("user not found")

            return user.updateOne({ avatar: avatar })
        })

}