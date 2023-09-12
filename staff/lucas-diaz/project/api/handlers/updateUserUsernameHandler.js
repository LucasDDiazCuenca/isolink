const { updateUserUsername } = require("../logic")
const { extractUserIdFromToken, handleErrors } = require("./helpers")

module.exports = handleErrors((req, res) => {
    const userId = extractUserIdFromToken(req)

    const { newUsername } = req.body

    return updateUserUsername(userId, newUsername)
        .then(() => res.status(204).send())
})