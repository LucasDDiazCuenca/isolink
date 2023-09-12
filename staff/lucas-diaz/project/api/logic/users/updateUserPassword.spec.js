require("dotenv").config()
const { expect } = require("chai")
const mongoose = require("mongoose")
const { User } = require("../../data/models")
const updateUserPassword = require("./updateUserPassword")
const { cleanUp, generate } = require("../helpers")
const { errors: { ExistenceError, ContentError } } = require("com")

describe("updateUserPassword", () => {
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

    it("should succeed on updating user password", async () => {
        await User.create({ name: user.name, email: user.email, password: user.password })

        const userRegistered = await User.findOne({ email: user.email })

        await updateUserPassword(userRegistered.id, userRegistered.password, secondUser.password, secondUser.password)

        const userRetrieved = await User.findById(userRegistered.id)

        expect(userRegistered).to.exist
        expect(userRetrieved.password).to.not.equal(user.password)
        expect(userRetrieved.password).to.equal(secondUser.password)
    })

    
    it("should fail on user not found", async () => {
        try {
            await updateUserPassword('123456789101112131415123', "anotherPassword22!", secondUser.password, secondUser.password)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal("user not found")
        }
    })

    it("should fail on typed password not beeing to users current password", async () => {
        await User.create({ name: user.name, email: user.email, password: user.password })

        const userRegistered = await User.findOne({ email: user.email })

        try {
            await updateUserPassword(userRegistered.id, "anotherPassword22!", secondUser.password, secondUser.password)
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.equal("typed password isn't actual password user's value")
        }
    })

    it("should fail on typed password beeing equal to new password", async () => {
        await User.create({ name: user.name, email: user.email, password: user.password })

        const userRegistered = await User.findOne({ email: user.email })

        try {
            await updateUserPassword(userRegistered.id, userRegistered.password, userRegistered.password, secondUser.password)
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.equal("New password must be different as previous password")
        }
    })

    it("should fail on new password beeing diferent to new password confirmation", async () => {
        await User.create({ name: user.name, email: user.email, password: user.password })

        const userRegistered = await User.findOne({ email: user.email })

        try {
            await updateUserPassword(userRegistered.id, userRegistered.password, secondUser.password, "FakeNewPass22!")
        } catch (error) {
            expect(error).to.be.instanceOf(ContentError)
            expect(error.message).to.equal("new password and new password confirmation does not match")
        }
    })
})