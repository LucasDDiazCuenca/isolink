const deletePost = require("./deletePost")

deletePost("user-2", "post-2",  error => {
    if(error){
        console.log(error)
        return
    }
    console.log("post deleted correctly!! 😄")
})