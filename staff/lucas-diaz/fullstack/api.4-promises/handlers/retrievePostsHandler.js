const { retrievePosts } = require("../logic")
const { extractUserIdFromToken, handleErrors } = require("./helpers")


module.exports = handleErrors((req, res) => {
        const userId = extractUserIdFromToken(req)

        return retrievePosts(userId)
        .then(posts => res.status(200).json(posts))
})