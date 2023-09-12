require("dotenv").config()
const {
    validators: { validateId },
    errors: { ExistenceError }
} = require("com")

const { User, Avatar } = require("../../data/models")

module.exports = function retrieveAvatar(userId) {
    validateId(userId)

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new ExistenceError("user not found")

        const avatar = await Avatar.findOne({ author: userId }).populate("author", "-email -password -friends -friendRequests").lean()
        
        if(avatar){
            // delete avatar.author._id
            delete avatar.author.__v
            delete avatar.__v
        }

        if(!avatar) throw new ExistenceError("Avatar not founded")

        return avatar
    })()
}