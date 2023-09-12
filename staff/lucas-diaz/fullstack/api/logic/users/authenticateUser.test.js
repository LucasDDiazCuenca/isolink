const authenticateUser = require("./authenticateUser")

authenticateUser("lucas@gmail.com", "LucasDiaz22!", (error, userId) => {
    if (error){
        console.log(error)
        return
    }

    console.log(`user with id: ${userId}, authenticated correctly!!`)
})