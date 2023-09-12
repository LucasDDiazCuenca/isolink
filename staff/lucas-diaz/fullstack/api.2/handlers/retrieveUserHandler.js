const { retrieveUser } = require("../logic")
const {extractToken} = require("../helpers")
const jwt = require("jsonwebtoken")


module.exports =  (req, res) => {
    try {
        
        const token = extractToken(req)
        const payload = jwt.verify(token, process.env.SECRET)
        const {sub: userId} = payload

        retrieveUser(userId)
            .then(user => res.status(200).json(user))
            .catch(error => res.status(400).json({ error: error.message }))


    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}