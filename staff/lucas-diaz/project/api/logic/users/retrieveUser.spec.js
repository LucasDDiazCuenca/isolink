require("dotenv").config()
const { expect } = require("chai")
const mongoose = require("mongoose")
const { User } = require("../../data/models")
const retrieveUser = require("./retrieveUser")
const { cleanUp, generate } = require("../helpers")
const { errors: { ExistenceError } } = require("com")

describe("retrieveUser", () => {
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

    it("should succeed on retrieving an user", async () => {
        await User.create({ name: user.name, email: user.email, password: user.password })

        const userRegistered = await User.findOne({ email: user.email })

        //hacer el retrieve
        const retrievedUser = await retrieveUser(userRegistered.id)

        expect(retrievedUser).to.exist
        expect(retrievedUser.name).to.equal(user.name)
        expect(retrievedUser.avatar).to.equal(user.avatar)
        expect(retrievedUser.connected).to.equal(user.connected)

    })

    it("should fail on user not found", async () => {
        try {
            await retrieveUser('123456789101112131415123')
        } catch (error) {
            expect(error).to.be.instanceOf(ExistenceError)
            expect(error.message).to.equal("user not found")
        }
    })

    //!Sync errors
    it('should fail on empty id', () =>
        expect(() =>
            retrieveUser('')
        ).to.throw(Error, "id is empty"))

    it('should fail on non string id', () =>
        expect(() =>
            retrieveUser(22)
        ).to.throw(Error, "id is not a string"))
})