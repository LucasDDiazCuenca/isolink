require("dotenv").config()
const { expect } = require("chai")
const mongoose = require("mongoose")
const { User } = require("../../data/models")
const updateUserUsername = require("./updateUserUsername")
const { cleanUp, generate } = require("../helpers")
const { errors: { ExistenceError } } = require("com")

describe("updateUserUsername", () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    let user
    let secondUser

    beforeEach(async () => {
        user = generate.user()
        secondUser = generate.user()

        await cleanUp()
    })

    after(async () => {
        await cleanUp()
        await mongoose.disconnect()
    })

    it("should succeed on updating user userName", async() => {
        await User.create({ name: user.name, email: user.email, password: user.password })

        const userRegistered = await User.findOne({ email: user.email })

        await updateUserUsername(userRegistered.id, secondUser.name)

        const userRetrieved = await User.findById(userRegistered.id)

        expect(userRegistered).to.exist
        expect(userRetrieved.name).to.not.equal(userRegistered.name)
        expect(userRetrieved.name).to.equal(secondUser.name)
    })

    it("should fail on user not found", async () => {
        try {
            await updateUserUsername('123456789101112131415123', secondUser.name)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal("user not found")
        }
    })
})