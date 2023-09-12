require("dotenv").config()
const { expect } = require("chai")
const mongoose = require("mongoose")
const { User, Avatar } = require("../../data/models")
const retrieveAvatar = require("./retrieveAvatar")
const { cleanUp, generate } = require("../helpers")
const { errors: { ExistenceError } } = require("com")

describe("retrieveAvatar", () => {
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

    it("should succeed on retrieving an avatar", async () => {
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

        const avatar = await retrieveAvatar(user1.id)

        expect(avatar).to.exist
        expect(avatar.author).to.be.an("object")
        expect(avatar.model).to.be.oneOf(["./models/boy.glb", "./models/girl.glb"])
        expect(avatar.name).to.be.a("string")
        expect(avatar.personality).to.be.a("string")
        expect(avatar.age).to.be.a("string")
        expect(avatar.hair).to.be.a("string")
        expect(avatar.skin).to.be.a("string")
        expect(avatar.shirt).to.be.a("string")
        expect(avatar.trousers).to.be.a("string")
        expect(avatar.shoes).to.be.a("string")
        expect(avatar.emotions).to.be.an("array")
    })

    it("should fail on user not found", async () => {
        try {
            await retrieveAvatar('123456789101112131415123')
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal("user not found")
        }
    })

    it("should fail on users avatar not found", async () => {
        await User.create({ name: user.name, email: user.email, password: user.password })

        const user1 = await User.findOne({ email: user.email })

        try {
            await retrieveAvatar(user1.id)

        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal("Avatar not founded")
        }
    })
})