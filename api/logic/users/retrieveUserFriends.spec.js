require("dotenv").config()
const { expect } = require("chai")
const mongoose = require("mongoose")
const { User } = require("../../data/models")
const retrieveUserFriends = require("./retrieveUserFriends")
const { cleanUp, generate } = require("../helpers")
const { errors: { ExistenceError } } = require("com")
const ObjectId = mongoose.Types.ObjectId



describe("retrieveUserFriends", () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    let user
    let secondUser

    beforeEach(async () => {
        user = generate.user()
        secondUser = generate.user()
        thirdUser = generate.user()

        await cleanUp()
    })

    after(async () => {
        await cleanUp()
        await mongoose.disconnect()
    })

    it("should succeed on retrieving user friends when having friends", async() => {
        await User.create({ name: user.name, email: user.email, password: user.password })

        await User.create({ name: secondUser.name, email: secondUser.email, password: secondUser.password })

        const user1 = await User.findOne({ email: user.email })

        const user2 = await User.findOne({ email: secondUser.email })

        await user1.updateOne({ $push: { friends: new ObjectId(user2.id) } })

        const user1Retrieved = await User.findById(user1.id)

        const friendsArray = await retrieveUserFriends(user1Retrieved.id)

        expect(friendsArray).to.be.an("array")
        expect(friendsArray.length).to.be.greaterThanOrEqual(1)
        expect(friendsArray).to.contains(user2.name)
    })

    it("should succeed on retrieving user friends when having no friends", async() => {
        await User.create({ name: user.name, email: user.email, password: user.password })

        const user1 = await User.findOne({ email: user.email })

        const user1Retrieved = await User.findById(user1.id)

        const friendsArray = await retrieveUserFriends(user1Retrieved.id)

        expect(friendsArray).to.be.an("array")
        expect(friendsArray.length).to.equal(0)
    })

    it("should fail on user not found", async () => {
        await User.create({ name: secondUser.name, email: secondUser.email, password: secondUser.password })

        const user2 = await User.findOne({ email: secondUser.email })

        try {
            await retrieveUserFriends('123456789101112131415123')
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal("user not found")
        }
    })
})