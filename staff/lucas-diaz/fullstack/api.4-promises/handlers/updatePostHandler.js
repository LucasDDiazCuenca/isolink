const { updatePost } = require("../logic")
const { extractUserIdFromToken, handleErrors } = require("./helpers")

module.exports = handleErrors((req, res) => {
    const userId = extractUserIdFromToken(req)
    const { postId } = req.params
    const { image, text } = req.body

    return updatePost(userId, postId, image, text)
        .then(() => res.status(204).send())
})