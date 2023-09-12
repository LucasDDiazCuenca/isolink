const updateUserPassword = require("./updateUserPassword")

updateUserPassword("user-2", "LucasCuenca22!", "LucasDiaz22!", "LucasDiaz22!", error => {
    if(error){
        console.log(error)
        return
    }
    console.log("Password updated correctly!! 😄")
})