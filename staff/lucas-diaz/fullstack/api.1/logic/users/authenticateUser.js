require("dotenv").config()
const {readFile} = require("fs")
const {validators: {validateEmail, validatePassword} } = require("com")

module.exports = function authenticateUser(email, password, callback){
    validateEmail(email)
    validatePassword(password)

    readFile(`${process.env.DB_PATH}/users.json`,  (error, json) => {
        if (error){
            callback(error)
            return;
        }

        const users = JSON.parse(json)

        const user = users.find(user => user.email === email)

        if (!user){
            callback(new Error(`there is no user with email: ${email}`))
            return
        }
        if (user.password !== password){
            callback(new Error(`wrong credentials`))
            return
        }

        callback(null, user.id)
    })

}


