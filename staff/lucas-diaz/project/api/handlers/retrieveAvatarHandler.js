const { retrieveAvatar } = require("../logic")
const { extractUserIdFromToken, handleErrors } = require("./helpers")

module.exports = handleErrors((req, res) => {
    const userId = extractUserIdFromToken(req)

    return retrieveAvatar(userId)
        .then(avatar => res.status(200).json(avatar))
})