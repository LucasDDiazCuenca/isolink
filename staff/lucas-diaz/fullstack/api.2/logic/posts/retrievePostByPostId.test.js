const retrievePostByPostId = require("./retrievePostByPostId")


retrievePostByPostId("user-1", "post-2", (error, post) => {
    if (error) {
        console.log(error)
        return
    }

    console.log("post retrieved correctly")
    console.log(post)
})
