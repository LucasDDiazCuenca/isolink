const { retrieveSavedPosts } = require("../logic")
const {extractUserId} = require("../helpers")

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)

        retrieveSavedPosts(userId, (error, savedPosts) => {
            if (error) {
                res.status(400).json({ error: error.message })
                return
            }

            res.status(200).json(savedPosts)
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}