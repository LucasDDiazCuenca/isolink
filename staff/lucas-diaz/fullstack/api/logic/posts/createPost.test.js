const createPost = require("./createPost")

createPost("user-2","https://archello.s3.eu-central-1.amazonaws.com/images/2018/05/11/tobiarchitects1.1526035990.6946.jpg", "Really like this house", error => {
    if(error){
        console.log(error)
        return
    }
    console.log("post created correctly!! 😄")
})