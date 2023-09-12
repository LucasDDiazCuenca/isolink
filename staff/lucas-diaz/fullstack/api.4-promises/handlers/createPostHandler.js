const { createPost } = require("../logic")
const { extractUserIdFromToken, handleErrors } = require("./helpers")

module.exports = handleErrors((req, res) => {
    const userId = extractUserIdFromToken(req)
    const { image, text } = req.body

    return createPost(userId, image, text)
        .then(() => res.status(201).send())
})