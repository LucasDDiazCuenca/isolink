require("dotenv").config()
const { readFile, writeFile } = require("fs")
const {validators: {validateId, validatePassword} } = require("com")

module.exports = function updateUserPassword(userId, password, newPassword, newPasswordConfirmation, callback) {
    validateId(userId)
    validatePassword(password)
    validatePassword(newPassword)
    validatePassword(newPasswordConfirmation) 

    if (password === newPassword) {
        throw new Error(`New password must be different as previous password`)
    }

    if (newPassword !== newPasswordConfirmation) {
        throw new Error(`new password and new password confirmation does not match`)
    }
    
    readFile(`${process.env.DB_PATH}/users.json`,  (error, json) => {
        if (error) {
            callback(error)
            return
        }

        const users = JSON.parse(json)
        let foundUser = users.find(user => user.id === userId)

        if (!foundUser) {
            callback(new Error("user not found"))
            return
        }

        if (foundUser.password !== password) {
            callback(new Error("typed password isn't actual password user's value"))
            return
        }


        foundUser.password = newPassword;
        json = JSON.stringify(users, null, 4)

        writeFile(`${process.env.DB_PATH}/users.json`, json,  error => {
            if (error) {
                callback(error)
                return
            }
            callback(null)
        })
    })
}