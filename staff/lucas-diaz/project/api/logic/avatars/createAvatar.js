require("dotenv").config()
const {
    validators: { validateText, validateId },
    errors: { ExistenceError }
} = require("com")

const { User, Avatar } = require("../../data/models")


module.exports = function createAvatar(userId, model, name, personality, age, hair, skin, shirt, trousers, shoes, emotions) {
    validateId(userId)
    validateText(name)
    validateText(model)
    validateText(personality)
    validateText(age)
    validateText(hair)
    validateText(skin)
    validateText(shirt)
    validateText(trousers)
    validateText(shoes)

    return(async() => {
        const user = await User.findById(userId)
        if (!user) throw new ExistenceError("user not found")

        await user.updateOne({avatar: true})

        await Avatar.create({
            author: userId,
            model,
            name,
            personality,
            age,
            hair,
            skin,
            shirt,
            trousers,
            shoes,
            emotions
        })
    })()
}