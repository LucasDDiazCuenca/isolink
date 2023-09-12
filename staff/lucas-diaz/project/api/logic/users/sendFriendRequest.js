require("dotenv").config()

const {
    validators: { validateId, validateText },
    errors: { ExistenceError, DuplicityError }
} = require("com")
const { User } = require("../../data/models")
const { Types: { ObjectId } } = require("mongoose")

/**
 * 
 * @param {string} userId the user's id
 * @param {string} requestedUsername the requested user name 
 * @returns {void} Doesn't return anything
 * 
 * @throws {ContentError} On empty user's id or text (sync)
 * @throws {TypeError} On non-string user's id or text (sync)
 * 
 * @throws {ExistenceError} On non existing user with this userId or requested user
 * @throws {DuplicityError} On duplicity in this request
 * 
 */ 

module.exports = function sendFriendRequest(userId, requestedUsername) {
    validateId(userId)
    validateText(requestedUsername)

    return (async () => {
        const user = await User.findById(userId)

        if (!user) throw new ExistenceError("user not found")

        const requestedUser = await User.findOne({ name: requestedUsername })

        if (!requestedUser) throw new ExistenceError("requestedFriend not found")

        if (requestedUser.friendRequests.includes(userId)) throw new DuplicityError("This request alredy exist")

        if (requestedUser.friends.includes(userId)) throw new DuplicityError("Requested user has already this userId in friend list")

        await requestedUser.updateOne({ $push: { friendRequests: new ObjectId(userId) } })
    })()
}

