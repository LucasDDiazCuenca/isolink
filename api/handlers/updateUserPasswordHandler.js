const { updateUserPassword } = require("../logic")
const { extractUserIdFromToken, handleErrors } = require("./helpers")

module.exports = handleErrors((req, res) => {
    const userId = extractUserIdFromToken(req)

    const { password, newPassword, newPasswordConfirmation } = req.body

    return updateUserPassword(userId, password, newPassword, newPasswordConfirmation)
        .then(() => res.status(204).send())

})