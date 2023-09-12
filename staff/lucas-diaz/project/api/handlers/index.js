module.exports = {
    helloApiHandler: require("./helloApiHandler"),
    registerUserHandler: require("./registerUserHandler"),
    authenticateUserHandler: require("./authenticateUserHandler"),
    retrieveUserHandler: require("./retrieveUserHandler"),
    updateUserPasswordHandler: require("./updateUserPasswordHandler"),
    updateUserUsernameHandler: require("./updateUserUsernameHandler"),
    sendFriendRequestHandler: require("./sendFriendRequestHandler"), 
    deleteFriendRequestHandler: require("./deleteFriendRequestHandler"),
    addFriendHandler: require("./addFriendHandler"),
    deleteFriendHandler: require("./deleteFriendHandler"),
    retrieveUserFriendsHandler: require("./retrieveUserFriendsHandler"),
    retrieveUserFriendsRequestsHandler: require("./retrieveUserFriendsRequestsHandler"),
    createAvatarHandler: require("./createAvatarHandler"),
    retrieveAvatarHandler: require("./retrieveAvatarHandler"),
    deleteAvatarHandler: require("./deleteAvatarHandler")
}