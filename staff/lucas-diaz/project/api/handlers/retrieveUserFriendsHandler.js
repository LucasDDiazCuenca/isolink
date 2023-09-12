const { retrieveUserFriends } = require("../logic")
const {extractUserIdFromToken, handleErrors} = require("./helpers")

module.exports = handleErrors((req,res) => {
    const userId = extractUserIdFromToken(req)

    return retrieveUserFriends(userId)
        .then(userFriends => res.status(200).json(userFriends))
})