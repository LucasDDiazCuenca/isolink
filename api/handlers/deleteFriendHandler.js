const { deleteFriend } = require("../logic")
const { extractUserIdFromToken, handleErrors } = require("./helpers")

module.exports = handleErrors((req, res) => {
    const userId = extractUserIdFromToken(req)

    const { requestedUsername } = req.body

    return deleteFriend(userId, requestedUsername)
        .then(() => res.status(204).send())
})