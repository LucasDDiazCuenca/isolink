require("dotenv").config()
const { expect } = require("chai")
const mongoose = require("mongoose")
const { User } = require("../../data/models")
const authenticateUser = require("./authenticateUser")
const { cleanUp, generate } = require("../helpers")
const { errors: { ExistenceError, AuthError } } = require("com")

describe("authenticateUser", () => {
    before(async () => {
        await mongoose.connect(process.env.MONGODB_URL)
    })

    let user

    beforeEach(async () => {
        user = generate.user()

        await cleanUp()
    })

    after(async () => {
        await cleanUp()
        await mongoose.disconnect()
    })

    it("should succeed on authenticateUser", async () => {
        //tenemos que crear un user a mano 
        const createdUser = await User.create({ name: user.name, email: user.email, password: user.password })

        const userRegistered = await User.findOne({ email: user.email })

        //tenemos que autenticarlo  
        const userId = await authenticateUser(userRegistered.email, userRegistered.password)

        expect(userId).to.equal(createdUser._id.toString())
    })

    it("should fail on non existing user", async () => {
        try {
            await authenticateUser(user.email, user.password)
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal(`there is no user with email: ${user.email}`)
        }
    })

    it("should fail on user wrong credentials (password)", async () => {
        const createdUser = await User.create({ name: user.name, email: user.email, password: user.password })

        const retrievedUser = await User.findOne({ email: user.email })

        try {
            await authenticateUser(retrievedUser.email, "MiNameIsClown22!!")
        } catch (error) {
            expect(error).to.be.instanceOf(AuthError)
            expect(error.message).to.equal("wrong credentials")
        }
    })
})