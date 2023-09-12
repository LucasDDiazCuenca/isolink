require("dotenv").config()
const {
    validators: { validateId },
    errors: { ExistenceError }
} = require("com")

const { User, Avatar } = require("../../data/models")

module.exports = function deleteAvatar(userId) {
    validateId(userId)

    return (async () => {
        const user = await User.findById(userId)
        
        if (!user) throw new ExistenceError("user not found")

        if(!user.avatar) throw new ExistenceError("This user has no avatar")

        await Avatar.deleteOne({author: user.id})
        await user.updateOne({avatar: false})

    })()
}