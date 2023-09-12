require("dotenv").config()
const {
    validators: { validateId },
    errors: { ExistenceError }
} = require("com")
const { User } = require("../../data/models")

module.exports = function retrieveUserFriendsRequests(userId){
    validateId(userId)

    return(async () => {
        const user = await User.findById(userId).lean()

        if (!user) throw new ExistenceError("user not found")

        const friendsRequestsNames = []
        
        if(user.friendRequests.length > 0){

            for(const friend of user.friendRequests){
                const _friend = await User.findById(friend)
                
                friendsRequestsNames.push(_friend.name)
            }
            
            return friendsRequestsNames
        } 
        return []
    })()
}