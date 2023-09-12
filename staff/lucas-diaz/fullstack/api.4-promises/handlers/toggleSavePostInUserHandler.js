const { toggleSavePostInUser } = require("../logic")
const { extractUserIdFromToken, handleErrors } = require("./helpers")

module.exports = handleErrors((req, res) => {
    const userId = extractUserIdFromToken(req)
    const { postId } = req.params

    return toggleSavePostInUser(userId, postId)
        .then(() => res.status(204).send())
})