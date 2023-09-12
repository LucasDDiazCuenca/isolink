const retrieveSavedPosts = require("./retrieveSavedPosts")


retrieveSavedPosts("user-1", (error, _posts) => {
    if (error) {
        console.log(error)
        return
    }

    console.log("Saved posts retrieved correctly")
    console.log(_posts)
})


