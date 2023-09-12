require("dotenv").config()
const { expect } = require("chai")
const authenticateUser = require("./authenticateUser")
const { writeFile } = require("fs")

describe("authenticateUser", () => {
    let id, name, email, password, avatar, savedPosts

    beforeEach(done => {
        id = `id-${Math.floor(Math.random() * 101)}`
        name = `name-${Math.floor(Math.random() * 101)}`
        email = `e-${Math.floor(Math.random() * 101)}@gmail.com`
        password = `abcD!!${Math.floor(Math.random() * 101)}eg`
        avatar = `https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512${Math.floor(Math.random() * 101)}.png`
        savedPosts = []

        writeFile(`${process.env.DB_PATH}/users.json`, "[]",  error => done(error))
    })

    it("should succed on authenticating user", done => {
        const user = {
            id,
            name,
            email,
            password,
            avatar,
            savedPosts
        }

        const json = JSON.stringify([user])
        //tenemos que escribir el archivo con un usuario 

        writeFile(`${process.env.DB_PATH}/users.json`, json,  error => {
            expect(error).to.be.null
            //tenemos que comprobar que la funcion authenticateUser lo haga ok buscando en BBDD 
            authenticateUser(user.email, user.password, (error, userId) => {
                expect(error).to.be.null
                expect(userId).to.equal(id)

                done();
            })
        })
    })

    it("should fail on authenticating user", done => {
        const user = {
            id,
            name,
            email,
            password,
            avatar,
            savedPosts
        }

        authenticateUser(user.email, user.password, (error, userId) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal(`there is no user with email: ${email}`)
            expect(userId).to.be.undefined

            done();
        })
    })

    it("should fail on introducing wrong password", done => {
        const user = {
            id,
            name,
            email,
            password,
            avatar,
            savedPosts
        }

        const json = JSON.stringify([user])
        //tenemos que escribir el archivo con un usuario 

        writeFile(`${process.env.DB_PATH}/users.json`, json,  error => {
            expect(error).to.be.null
            //tenemos que comprobar que la funcion authenticateUser lo haga ok buscando en BBDD 
            authenticateUser(user.email, "helloFriends!22", (error, userId) => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`wrong credentials`)
                done();
            })
        })
    })

    //sincronos de email
    it("should fail on empty email", () => {
        expect(() => authenticateUser( "" , password, () => { })).to.throw(Error, "Email is empty")
    })

    it("should fail on non-string value in email", () => {
        expect(() => authenticateUser(22, password, () => { })).to.throw(Error, "Email is not a string")
        expect(() => authenticateUser(true, password, () => { })).to.throw(Error, "Email is not a string")
        expect(() => authenticateUser({}, password, () => { })).to.throw(Error, "Email is not a string")
        expect(() => authenticateUser([], password, () => { })).to.throw(Error, "Email is not a string")
    })

    it("should fail on invalid format in email", () => {
        expect(() => authenticateUser("heloworld", password, password, () => { })).to.throw(Error, 'Invalid email format')
    })

    it("should fail on blank space value in email", () => {
        expect(() => authenticateUser(" ", password, () => { })).to.throw(Error, "Email cant be a blankSpace")
    })

    // sincronos de pass 
    it("should fail on empty password", () => {
        expect(() => authenticateUser(email, "", () => { })).to.throw(Error, "Password is empty")
    })

    it("should fail on non-string value in password", () => {
        expect(() => authenticateUser(email, 22, () => { })).to.throw(Error, "Password is not a string")
        expect(() => authenticateUser(email, true, () => { })).to.throw(Error, "Password is not a string")
        expect(() => authenticateUser(email, {}, () => { })).to.throw(Error, "Password is not a string")
        expect(() => authenticateUser(email, [], () => { })).to.throw(Error, "Password is not a string")
    })

    it("should fail on blank space value in password", () => {
        expect(() => authenticateUser(email, " ", () => { })).to.throw(Error, "Password cant be a blankSpace")
    })

    it("should fail on lower than 4 character password", () => {
        expect(() => authenticateUser(email, "bo", () => { })).to.throw(Error, "Password is shorter than 4 characters")
    })

    it("should fail on invalid format in password", () => {
        expect(() => authenticateUser(email, "helloworld", () => { })).to.throw(Error, `password format incorrect`)
    })


    after(done => writeFile(`${process.env.DB_PATH}/users.json`, "[]",  error => done(error)))
})