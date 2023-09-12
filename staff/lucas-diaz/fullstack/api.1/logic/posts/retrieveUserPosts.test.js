const retrieveUserPosts = require("./retrieveUserPosts")


retrieveUserPosts("user-2", (error, posts) => {
    if (error) {
        console.log(error)
        return
    }

    console.log("user posts retrieved correctly")
    console.log(posts)
})

