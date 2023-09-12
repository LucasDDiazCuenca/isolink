const { retrievePostByPostId } = require("../logic")
const {extractToken} = require("../helpers")
const jwt = require("jsonwebtoken")

module.exports = (req, res) => {
    try {
        const { postId } = req.params
        const token = extractToken(req)
        const payload = jwt.verify(token, process.env.SECRET)
        const {sub: userId} = payload

        retrievePostByPostId(userId, postId)
            .then(post => res.status(200).json(post))
            .catch(error => res.status(400).json({ error: error.message }))

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}