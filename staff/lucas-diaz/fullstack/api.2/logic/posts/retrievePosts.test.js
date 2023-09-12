const retrievePosts = require("./retrievePosts")

retrievePosts("user-1" , (error, posts) => {
    if (error) {
        console.log(error)
        return
    }

    console.log("posts retrieved correctly")
    console.log(posts)
})
