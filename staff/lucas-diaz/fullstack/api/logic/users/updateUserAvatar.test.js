const updateUserAvatar = require("./updateUserAvatar")


updateUserAvatar("user-1", "https://archello.s3.eu-central-1.amazonaws.com/images/2018/05/11/tobiarchitects1.1526035990.6946.jpg", error => {
    if(error){
        console.log(error)
        return
    }
    console.log("Avatar updated correctly!! 😄")
})