require("dotenv").config()
const { expect } = require("chai")
const mongoose = require("mongoose")
const { User, Avatar } = require("../../data/models")
const deleteAvatar = require("./deleteAvatar")
const { cleanUp, generate } = require("../helpers")
const { errors: { ExistenceError } } = require("com")

describe("deleteAvatar", () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    let user
    let userAvatar

    beforeEach(async () => {
        user = generate.user()
        userAvatar = generate.avatar(user)
        await cleanUp()
    })

    after(async () => {
        await cleanUp()
        await mongoose.disconnect()
    })


    it("should succeed on deleting an avatar", async() => {
        await User.create({ name: user.name, email: user.email, password: user.password })

        const user1 = await User.findOne({ email: user.email })

        await user1.updateOne({ avatar: true })

        await Avatar.create({
            author: user1.id,
            model: userAvatar.model,
            name: userAvatar.name,
            personality: userAvatar.personality,
            age: userAvatar.age,
            hair: userAvatar.hair,
            skin: userAvatar.skin,
            shirt: userAvatar.shirt,
            trousers: userAvatar.trousers,
            shoes: userAvatar.shoes,
            emotions: userAvatar.emotions
        })

        await deleteAvatar(user1.id)

        expect(user.avatar).to.equal(false)
    })

    it("should fail on user not found", async () => {
        try {
            await deleteAvatar('123456789101112131415123')
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal("user not found")
        }
    })

    it("should fail on user not having a current avatar", async() => {
        await User.create({ name: user.name, email: user.email, password: user.password })

        const user1 = await User.findOne({ email: user.email })

        try {
            await deleteAvatar(user1.id)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal("This user has no avatar")
        }
    })
})