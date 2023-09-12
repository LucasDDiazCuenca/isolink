const { registerUser } = require("../logic")

module.exports = (req, res) => {
    try {
        const { name, email, password } = req.body


        registerUser(name, email, password, error => {
            if (error) {
                res.status(400).json({ error: error.message })
                return
            }

            res.status(204).send()
        })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}