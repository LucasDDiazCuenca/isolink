const retrieveUser = require("./retrieveUser")

retrieveUser("user-3", (error, user) => {
    if (error) {
        console.log(error)
        return
    }

    console.log("user retrieved correctly")
    console.log(user)
})


