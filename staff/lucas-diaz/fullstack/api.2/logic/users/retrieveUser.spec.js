require("dotenv").config()
const { expect } = require("chai")
const retrieveUser = require("./retrieveUser")
const { writeFile } = require("fs")

describe("retrieveUser", () => {
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

    it("should succed on retriving an user", done => {
        //we have to write an user in our bbdd that we will look for 
        const user = {
            id,
            name,
            email,
            password,
            avatar,
            savedPosts
        }
        const json = JSON.stringify([user])

        writeFile(`${process.env.DB_PATH}/users.json`, json,  error => {
            expect(error).to.be.null

            //we have to retrieve the same user that appears in the db 
            retrieveUser(user.id, (error, _user) => {
                expect(error).to.be.null
                //we have to do specs (sync and asycn )
                expect(_user.name).to.equal(user.name)
                expect(_user.avatar).to.equal(user.avatar)
                expect(_user.savedPosts).to.exist
                done()
            })
        })
    })

    it("should fail on retriving an user", done => {
        const user = {
            id,
            name,
            email,
            password,
            avatar,
            savedPosts
        }

        retrieveUser(user.id, (error, _user) => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal("User not found")
            done()
        })
    })

    //sincronos de userId
    it("should fail on empty user's id", () => {
        expect(() => retrieveUser("", () => {})).to.throw(Error, "id is empty")
    })

    it("should fail on non-string value in user's id", () => {
        expect(() => retrieveUser(22, () => { })).to.throw(Error, "id is not a string")
        expect(() => retrieveUser(true, () => { })).to.throw(Error, "id is not a string")
        expect(() => retrieveUser({}, () => { })).to.throw(Error, "id is not a string")
        expect(() => retrieveUser([], () => { })).to.throw(Error, "id is not a string")
    })

    after(done => writeFile(`${process.env.DB_PATH}/users.json`, "[]",  error => done(error)))
})