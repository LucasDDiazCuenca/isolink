const { updateUserPassword } = require("../logic")
const {extractUserId} = require("../helpers")

module.exports = (req, res) => {
    try {
        const userId = extractUserId(req)
        const { password, newPassword, newPasswordConfirmation } = req.body

        updateUserPassword(userId, password, newPassword, newPasswordConfirmation, error => {
            if (error) {
                res.status(404).json({ error: error.message })
                return
            }
            res.status(204).send()
        })

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}