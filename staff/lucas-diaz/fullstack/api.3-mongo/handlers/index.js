module.exports = {
    helloApiHandler: require("./helloApiHandler"),
    registerUserHandler: require("./registerUserHandler"),
    authenticateUserHandler: require("./authenticateUserHandler"),
    retrieveUserHandler: require("./retrieveUserHandler"),
    updateUserAvatarHandler: require("./updateUserAvatarHandler"), 
    updateUserPasswordHandler: require("./updateUserPasswordHandler"),
    createPostHandler: require("./createPostHandler"),
    retrievePostsHandler: require("./retrievePostsHandler"),
    retrieveSavedPostsHandler: require("./retrieveSavedPostsHandler"),
    retrieveUserPostsHandler: require("./retrieveUserPostsHandler"),
    retrievePostByPostIdHandler: require("./retrievePostByPostIdHandler"),
    toggleHidePostHandler: require("./toggleHidePostHandler"),
    toggleLikePostHandler: require("./toggleLikePostHandler"),
    toggleSavePostInUserHandler: require("./toggleSavePostInUserHandler"),
    updatePostHandler: require("./updatePostHandler"),
    deletePostHandler: require("./deletePostHandler")
}