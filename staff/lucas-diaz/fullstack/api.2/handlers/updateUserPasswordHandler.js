const { updateUserPassword } = require("../logic")
const {extractToken} = require("../helpers")
const jwt = require("jsonwebtoken")

module.exports = (req, res) => {
    try {
        const token = extractToken(req)
        const payload = jwt.verify(token, process.env.SECRET)
        const {sub: userId} = payload

        const { password, newPassword, newPasswordConfirmation } = req.body

        updateUserPassword(userId, password, newPassword, newPasswordConfirmation)
            .then(() => res.status(204).send())
            .catch(error => res.status(404).json({ error: error.message }))
            
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}