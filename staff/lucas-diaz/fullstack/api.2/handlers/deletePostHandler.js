const { deletePost } = require("../logic")
const {extractToken} = require("../helpers")
const jwt = require("jsonwebtoken")

module.exports = (req, res) => {
    try {
        const token = extractToken(req)
        const payload = jwt.verify(token, process.env.SECRET)
        const {sub: userId} = payload
        
        const { postId } = req.params


        deletePost(userId, postId)
            .then(() => res.status(204).send())
            .catch(error => res.status(404).json({ error: error.message }))

        // deletePost(userId, postId, error => {
        //     if (error) {
        //         res.status(404).json({ error: error.message })
        //         return
        //     }
        //     res.status(204).send()
        // })

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}