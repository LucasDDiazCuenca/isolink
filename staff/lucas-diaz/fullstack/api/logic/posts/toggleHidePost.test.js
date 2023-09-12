const toggleHidePost = require("./toggleHidePost")

toggleHidePost("user-2", "post-3", error => {
    if(error){
        console.log(error)
        return
    }
    console.log("Post hidded/not correctly!! 😄")
})