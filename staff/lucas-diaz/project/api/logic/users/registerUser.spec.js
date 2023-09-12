require("dotenv").config()
const { expect } = require("chai")
const mongoose = require("mongoose")
const { User } = require("../../data/models")
const registerUser = require("./registerUser")
const { cleanUp, generate } = require("../helpers")
const { errors: { DuplicityError } } = require("com")

describe("registerUser", () => {
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

    it("should succeed on creating an user", async () => {
        await registerUser(user.name, user.email, user.password)

        const userRegistered = await User.findOne({ email: user.email })

        expect(userRegistered).to.exist
        expect(userRegistered.name).to.equal(user.name)
        expect(userRegistered.email).to.equal(user.email)
        expect(userRegistered.password).to.equal(user.password)
        expect(userRegistered.avatar).to.equal(false)
        expect(userRegistered.friends.length).to.equal(0)
        expect(userRegistered.friendRequests).to.have.lengthOf(0)
        expect(userRegistered.connected).to.equal(false)
    })

    it("should fail on existing user", async () => {
        await registerUser(user.name, user.email, user.password)

        try {
            await registerUser(user.name, user.email, user.password)
        } catch (error) {
            expect(error).to.be.instanceOf(Error)
            expect(error).to.be.instanceOf(DuplicityError)
            expect(error.message).to.equal((`user with email ${user.email} already exists`))
        }
    })

    it("should fail on unknown error", async () => {
        const errorMessage = "This is an unknown error message";
        
        // Simula un error desconocido arrojando una excepción con un mensaje específico.
        try {
            await registerUser(user.name, user.email, user.password);
            throw new Error(errorMessage); // Simula un error desconocido
        } catch (error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal(errorMessage);
        }
    });

    //!Sync errors
    it('should fail on empty name', () =>
        expect(() =>
            registerUser('', user.email, user.password)
        ).to.throw(Error, 'Username is empty'))

    it('should fail on empty email', () =>
        expect(() =>
            registerUser(user.name, "", user.password)
        ).to.throw(Error, "Email is empty"))

    it('should fail on empty password', () =>
        expect(() =>
            registerUser(user.name, user.email, "")
        ).to.throw(Error, "Password is empty"))

    it('should fail on blank space name', () =>
        expect(() =>
            registerUser(' ', user.email, user.password)
        ).to.throw(Error, "Username cant be a blankSpace"))

    it('should fail on blank space email', () =>
        expect(() =>
            registerUser(user.name, " ", user.password)
        ).to.throw(Error, "Email cant be a blankSpace"))

    it('should fail on blank space password', () =>
        expect(() =>
            registerUser(user.name, user.email, " ")
        ).to.throw(Error, "Password cant be a blankSpace"))

    it('should fail on non string name', () =>
        expect(() =>
            registerUser(22, user.email, user.password)
        ).to.throw(Error, "Username is not a string"))

    it('should fail on non string email', () =>
        expect(() =>
            registerUser(user.name, 22, user.password)
        ).to.throw(Error, "Email is not a string"))

    it('should fail on non string password', () =>
        expect(() =>
            registerUser(user.name, user.email, 22)
        ).to.throw(Error, "Password is not a string"))

    it('should fail on wrong format email', () =>
        expect(() =>
            registerUser(user.name, "minameisdrluke", user.password)
        ).to.throw(Error, 'Invalid email format'))

    it('should fail on wrong format password', () =>
        expect(() =>
            registerUser(user.name, user.email, "minameisdrluke")
        ).to.throw(Error, `password format incorrect`))

    it('should fail on shor range password', () =>
        expect(() =>
            registerUser(user.name, user.email, "Luk")
        ).to.throw(Error, "Password is shorter than 4 characters"))
})

