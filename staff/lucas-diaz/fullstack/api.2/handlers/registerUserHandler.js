const { registerUser } = require("../logic")

module.exports = (req, res) => {
    try {
        const { name, email, password } = req.body

        registerUser(name, email, password)
            .then(() => res.status(204).send())
            .catch(error => res.status(400).json({ error: error.message }))

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}