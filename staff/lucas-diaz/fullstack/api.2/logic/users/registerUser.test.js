const registerUser = require("./registerUser")

/* registerUser("lucas Diaz", "lucas@gmail.com", "LucasDiaz22!", error => {
    if (error){
        console.log(error)
        return
    }
    console.log("User registered correctly")
})  */

registerUser("pepa pig", "pepa@pig.com", "PepaPig22!", error => {
    if (error){
        console.log(error)
        return
    }
    console.log("User registered correctly")


    //si todo va bien, esperamos que --> error = nulo (falsy)
}) 