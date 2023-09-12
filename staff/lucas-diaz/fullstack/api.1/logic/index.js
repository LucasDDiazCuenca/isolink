module.exports = {
    registerUser: require("./users/registerUser"),
    authenticateUser: require("./users/authenticateUser"),
    retrieveUser: require("./users/retrieveUser"),
    updateUserAvatar: require("./users/updateUserAvatar"),
    updateUserPassword: require("./users/updateUserPassword"),
    createPost: require("./posts/createPost"),
    deletePost: require("./posts/deletePost"),
    toggleHidePost: require("./posts/toggleHidePost"),
    toggleLikePost: require("./posts/toggleLikePost"),
    retrievePostByPostId: require("./posts/retrievePostByPostId"),
    retrievePosts: require("./posts/retrievePosts"),
    retrieveSavedPosts: require("./posts/retrieveSavedPosts"),
    retrieveUserPosts: require("./posts/retrieveUserPosts"),
    toggleSavePostInUser: require("./posts/toggleSavePostInUser"),
    updatePost: require("./posts/updatePost")
}