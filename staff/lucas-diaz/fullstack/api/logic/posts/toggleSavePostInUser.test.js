const toggleSavePostInUser = require("./toggleSavePostInUser")

toggleSavePostInUser("user-1", "post-2", error => {
    if(error){
        console.log(error)
        return
    }
    console.log("Post saved correctly!! 😄")
})