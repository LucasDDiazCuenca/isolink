const { retrieveUser } = require("../logic")
const { extractUserIdFromToken, handleErrors } = require("./helpers")

module.exports = handleErrors((req, res) => {
    const userId = extractUserIdFromToken(req)

    return retrieveUser(userId)
        .then(user => res.status(200).json(user))
})