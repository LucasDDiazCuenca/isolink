require("dotenv").config()
const { 
    validators: { validateId, validateUrl },
    errors: {ExistenceError}
} = require("com")
const context = require("../context")
const { ObjectId } = require("mongodb")

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

    const { users } = context

    return users.findOne({ _id: new ObjectId(userId) })
        .then(user => {
            if (!user) throw new ExistenceError("user not found")

            return users.updateOne({ _id: new ObjectId(userId) }, { $set: { avatar: avatar } })
        })
}