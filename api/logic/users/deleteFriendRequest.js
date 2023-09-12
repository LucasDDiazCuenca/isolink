require("dotenv").config()

const {
    validators: { validateId, validateText },
    errors: { ExistenceError }
} = require("com")
const { User } = require("../../data/models")

/**
 * 
 * @param {string} userId the user's id
 * @param {string} requestedUsername the requested user name 
 * @returns {void} Doesn't return anything
 * 
 * @throws {ContentError} On empty user's id or text (sync)
 * @throws {TypeError} On non-string user's id or text (sync)
 * 
 * @throws {ExistenceError} On non existing user with this userId or requested user or request
 * 
 */

module.exports = function deleteFriendRequest(userId, requestedUsername) {
    validateId(userId)
    validateText(requestedUsername)

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError("user not found")

        const requestedUser = await User.findOne({ name: requestedUsername })

        if (!requestedUser) throw new ExistenceError("requested Friend not found")

        if (!user.friendRequests.includes(requestedUser.id)) throw new ExistenceError("Request not founded")

        await user.updateOne({ $pull: { friendRequests: requestedUser.id } });
    })()
}