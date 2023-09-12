require("dotenv").config()

const {
    validators: { validateId, validateText },
    errors: { ExistenceError, DuplicityError }
} = require("com")
const { User } = require("../../data/models")

/**
 * 
 * @param {string} userId the user's id
 * @param {string} requestedUsername the requested user name 
 * @returns {void} Doesn't return anything
 * 
 * @throws {ExistenceError} On non existing user with this userId or requested user or request (async)
 */

module.exports = function deleteFriend(userId, requestedUsername) {
    validateId(userId)
    validateText(requestedUsername)

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError("user not found")

        const requestedUser = await User.findOne({ name: requestedUsername })

        if (!requestedUser) throw new ExistenceError("requestedFriend wasnt found")

        if (!user.friends.includes(requestedUser.id)) throw new ExistenceError("requestedUser not found in user friends")

        await user.updateOne({ $pull: { friends: requestedUser.id } });
        await requestedUser.updateOne({ $pull: { friends: user.id } });
    })()
}