const { retrievePostByPostId } = require("../logic")
const { extractUserIdFromToken, handleErrors } = require("./helpers")

module.exports = handleErrors((req, res) => {
    const { postId } = req.params
    const userId = extractUserIdFromToken(req)

    return retrievePostByPostId(userId, postId)
        .then(post => res.status(200).json(post))
})