module.exports = {
    registerUser: require("./users/registerUser"),
    authenticateUser: require("./users/authenticateUser"),
    retrieveUser: require("./users/retrieveUser"),
    updateUserPassword: require("./users/updateUserPassword"),
    updateUserUsername: require("./users/updateUserUsername"), 
    sendFriendRequest: require("./users/sendFriendRequest"), 
    deleteFriendRequest: require("./users/deleteFriendRequest"),
    addFriend: require("./users/addFriend"),
    deleteFriend: require("./users/deleteFriend"),
    retrieveUserFriendsRequests: require("./users/retrieveUserFriendsRequests"),
    retrieveUserFriends: require("./users/retrieveUserFriends"),
    createAvatar: require("./avatars/createAvatar"),
    retrieveAvatar: require("./avatars/retrieveAvatar"),
    deleteAvatar: require("./avatars/deleteAvatar")
}