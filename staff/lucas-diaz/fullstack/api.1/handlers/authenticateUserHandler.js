const { authenticateUser } = require("../logic")


module.exports = (req, res) => {
    try {
        const { email, password } = req.body
        authenticateUser(email, password, (error, userId) => {
            if (error) {
                res.status(404).json({ error: error.message })
                return
            }
            res.status(202).json({ userId })
        })

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}