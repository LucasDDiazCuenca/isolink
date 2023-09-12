const { retrieveSavedPosts } = require("../logic")
const { extractUserIdFromToken, handleErrors } = require("./helpers")

module.exports = handleErrors((req, res) => {
    const userId = extractUserIdFromToken(req)

    return retrieveSavedPosts(userId)
        .then(savedPosts => res.status(200).json(savedPosts))
})