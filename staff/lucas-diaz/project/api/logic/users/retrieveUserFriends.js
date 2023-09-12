require("dotenv").config()
const {
    validators: { validateId },
    errors: { ExistenceError }
} = require("com")
const { User } = require("../../data/models")

module.exports = function retrieveUserFriends(userId) {
    validateId(userId)

    return (async () => {
        const user = await User.findById(userId).lean()

        if (!user) throw new ExistenceError("user not found")

        const friendsNames = []

        if (user.friends.length > 0) {

            for (const friend of user.friends) {
                const _friend = await User.findById(friend)
                friendsNames.push(_friend.name)

            }
            return friendsNames
        }
        return []
    })()
}