require("dotenv").config()
const { expect } = require("chai")
const mongoose = require("mongoose")
const { User, Avatar } = require("../../data/models")
const createAvatar = require("./createAvatar")
const { cleanUp, generate } = require("../helpers")
const { errors: { ExistenceError } } = require("com")

describe("createAvatar", () => {
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

    it("should succeed on creating an avatar", async () => {
        await User.create({ name: user.name, email: user.email, password: user.password })

        const user1 = await User.findOne({ email: user.email })

        await user1.updateOne({ avatar: true })

        await createAvatar(
            user1.id,
            userAvatar.model,
            userAvatar.name,
            userAvatar.personality,
            userAvatar.age,
            userAvatar.hair,
            userAvatar.skin,
            userAvatar.shirt,
            userAvatar.trousers,
            userAvatar.shoes,
            userAvatar.emotions
        );

        const createdAvatar = Avatar.findOne({author: user1.id}).lean()

        expect(createdAvatar).to.exist
    })

    it("should fail on user not found", async () => {

        try {
            await createAvatar(
                '123456789101112131415123',
                userAvatar.model,
                userAvatar.name,
                userAvatar.personality,
                userAvatar.age,
                userAvatar.hair,
                userAvatar.skin,
                userAvatar.shirt,
                userAvatar.trousers,
                userAvatar.shoes,
                userAvatar.emotions
            );
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal("user not found")
        }
    })
})