const {deleteAvatar} = require("../logic")
const { extractUserIdFromToken, handleErrors } = require("./helpers")

module.exports = handleErrors((req, res) => {
    const userId = extractUserIdFromToken(req)

    return deleteAvatar(userId)
        .then(() => res.status(200).send())
})