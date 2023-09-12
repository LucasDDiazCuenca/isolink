require("dotenv").config()
const { expect } = require("chai")
const mongoose = require("mongoose")
const { User } = require("../../data/models")
const deleteFriend = require("./deleteFriend")
const { cleanUp, generate } = require("../helpers")
const { errors: { ExistenceError, DuplicityError } } = require("com")
const ObjectId = mongoose.Types.ObjectId

describe("deleteFriend", () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    let user
    let secondUser
    let thirdUser

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

    it("should succeed on deleting a friend", async () => {
        await User.create({ name: user.name, email: user.email, password: user.password })

        await User.create({ name: secondUser.name, email: secondUser.email, password: secondUser.password })

        const user1 = await User.findOne({ email: user.email })

        const user2 = await User.findOne({ email: secondUser.email })

        await user1.updateOne({ $push: { friends: new ObjectId(user2.id) } })
        await user2.updateOne({ $push: { friends: new ObjectId(user1.id) } })

        await deleteFriend(user1.id, user2.name)

        const user1Retrieved = await User.findById(user1.id)
        const user2Retrieved = await User.findById(user2.id)

        expect(user1).to.exist
        expect(user2).to.exist
        expect(user1Retrieved.friends).to.not.includes(user2.id)
        expect(user2Retrieved.friends).to.not.includes(user1.id)
    })

    it("should fail on user not found", async () => {
        await User.create({ name: secondUser.name, email: secondUser.email, password: secondUser.password })

        const user2 = await User.findOne({ email: secondUser.email })

        try {
            await deleteFriend('123456789101112131415123', user2.name)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal("user not found")
        }
    })

    it("should fail on requested user not found", async () => {
        await User.create({ name: user.name, email: user.email, password: user.password })
        const user1 = await User.findOne({ email: user.email })

        try {
            await deleteFriend(user1.id, "unknown")
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal("requestedFriend wasnt found")
        }
    })

    it("should fail on finding requested user in user friend list", async () => {
        await User.create({ name: user.name, email: user.email, password: user.password })

        await User.create({ name: secondUser.name, email: secondUser.email, password: secondUser.password })

        const user1 = await User.findOne({ email: user.email })

        const user2 = await User.findOne({ email: secondUser.email })

        try {
            await deleteFriend(user1.id, user2.name)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal("requestedUser not found in user friends")
        }
    })
})