const { retrieveUserFriendsRequests } = require("../logic")
const { extractUserIdFromToken, handleErrors } = require("./helpers")

module.exports = handleErrors((req, res) => {
    const userId = extractUserIdFromToken(req)

    return retrieveUserFriendsRequests(userId)
        .then(userFriendsRequests => res.status(200).json(userFriendsRequests))
})