require("dotenv").config()
const { expect } = require("chai")
const updateUserAvatar = require("./updateUserAvatar")
const { readFile, writeFile } = require("fs")

describe("updateUserAvatar", () => {
    let id, name, email, password, avatar, savedPosts, newAvatar

    beforeEach(done => {
        id = `id-${Math.floor(Math.random() * 101)}`
        name = `name-${Math.floor(Math.random() * 101)}`
        email = `e-${Math.floor(Math.random() * 101)}@gmail.com`
        password = `abcD!!${Math.floor(Math.random() * 101)}eg`
        avatar = `https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512${Math.floor(Math.random() * 101)}.png`
        newAvatar = "https://archello.s3.eu-central-1.amazonaws.com/images/2018/05/11/tobiarchitects1.1526035990.6946.jpg"
        savedPosts = []
        writeFile(`${process.env.DB_PATH}/users.json`, "[]",  error => done(error))
    })

    it("should suceed on changing user avatar", done => {
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

            updateUserAvatar(user.id, newAvatar, error => {
                expect(error).to.be.null

                readFile(`${process.env.DB_PATH}/users.json`,  (error, json) => {
                    expect(error).to.be.null

                    const users = JSON.parse(json)

                    const foundUser = users.find(_user => _user.id === user.id)

                    expect(foundUser.avatar).to.equal(newAvatar)
                    done();
                })
            })
        })
    })

    it("should fail on changing user avatar due to wrong userId", done => {

        updateUserAvatar(id, newAvatar, error => {
            expect(error).to.be.instanceOf(Error)
            expect(error.message).to.equal("user not found")
            done();
        })
    })

    it("should fail on empty user's id", () => {
        expect(() => updateUserAvatar("", newAvatar, () => { })).to.throw(Error, "id is empty")
    })

    it("should fail on non-string value in user's id", () => {
        expect(() => updateUserAvatar(22, newAvatar, () => { })).to.throw(Error, "id is not a string")
        expect(() => updateUserAvatar(true, newAvatar, () => { })).to.throw(Error, "id is not a string")
        expect(() => updateUserAvatar({}, newAvatar, () => { })).to.throw(Error, "id is not a string")
        expect(() => updateUserAvatar([], newAvatar, () => { })).to.throw(Error, "id is not a string")
    })

    it("should fail on empty avatar's url", () => {
        expect(() => updateUserAvatar(id, "", () => { })).to.throw(Error, "url is empty")
    })

    it("should fail on non-string value in avatar's url", () => {
        expect(() => updateUserAvatar(id, 22, () => { })).to.throw(Error, "url is not a string")
        expect(() => updateUserAvatar(id, true, () => { })).to.throw(Error, "url is not a string")
        expect(() => updateUserAvatar(id, {}, () => { })).to.throw(Error, "url is not a string")
        expect(() => updateUserAvatar(id, [], () => { })).to.throw(Error, "url is not a string")
    })

    it("should fail on blank space in avatar's url", () => {
        expect(() => updateUserAvatar(id, " ", () => { })).to.throw(Error, "url cant be a blankSpace")
    })
    
    it("should fail on invalid format in avatar's url", () => {
        expect(() => updateUserAvatar(id, "hello", () => { })).to.throw(Error, 'Image format invalid')
    })
})