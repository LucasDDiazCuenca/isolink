const { authenticateUser } = require("../logic")
const jwt = require("jsonwebtoken")


module.exports = (req, res) => {
    try {
        const { email, password } = req.body
        
        authenticateUser(email, password)
            .then( userId => {

                const payload = { sub: userId}
                const token = jwt.sign(payload, process.env.SECRET, {expiresIn: "7d"})

                res.status(202).json({ token })
            } )
            .catch(error => res.status(404).json({ error: error.message }))

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}