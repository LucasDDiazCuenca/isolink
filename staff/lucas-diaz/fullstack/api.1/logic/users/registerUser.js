require("dotenv").config()
const { readFile, writeFile } = require("fs") //Commons js 
const {validators: {validateUsername, validateEmail, validatePassword} } = require("com")

module.exports =  function registerUser(name, email, password, callback) {
    validateUsername(name)
    validateEmail(email)
    validatePassword(password)
    
                              // formato //callback
    readFile(`${process.env.DB_PATH}/users.json`,  (error, json) => {
        if (error) {
            callback(error)
            return
        }

        const users = JSON.parse(json)
        let user = users.find(user => user.email === email)

        if (user) {
            callback(new Error(`User with email ${email} already exist`))
            return
        }

        let id = "user-1"
        
        const lastUser = users.at(-1)

        if (lastUser)
            id = "user-" + (parseInt(lastUser.id.slice(5)) + 1)

        user = {
            id,
            name: name,
            email: email,
            password: password,
            avatar: "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png",
            savedPosts: [] 
        } 
        users.push(user)

        json = JSON.stringify(users, null, 4)
        
        writeFile(`${process.env.DB_PATH}/users.json`, json , error => {
            if (error){
                callback(error)
                return
            }
            callback(null)
        })
    })
}