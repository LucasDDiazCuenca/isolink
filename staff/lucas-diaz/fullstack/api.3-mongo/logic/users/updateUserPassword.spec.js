require("dotenv").config()
const { expect } = require("chai")
const updateUserPassword = require("./updateUserPassword")
const { writeFile, readFile } = require("fs")
const { fail } = require("assert")

describe("updateUserPassword", () => {
    let id, name, email, password, avatar, newPassword, newPasswordConfirm

    beforeEach(done => {
        id = `id-${Math.floor(Math.random() * 101)}`
        name = `name-${Math.floor(Math.random() * 101)}`
        email = `e-${Math.floor(Math.random() * 101)}@gmail.com`
        password = `abcD!!${Math.floor(Math.random() * 101)}eg`
        avatar = `https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512${Math.floor(Math.random() * 101)}.png`
        savedPosts = []
        newPassword = `abcD!!${Math.floor(Math.random() * 101)}eg`
        writeFile(`${process.env.DB_PATH}/users.json`, "[]",  error => done(error))
    })

    it("should succed on updating user password", done => {
        const user = {
            id,
            name,
            email,
            password,
            avatar,
            savedPosts
        }
        const json = JSON.stringify([user])
        newPasswordConfirm = newPassword

        writeFile(`${process.env.DB_PATH}/users.json`, json,  error => {
            expect(error).to.be.null

            updateUserPassword(user.id, password, newPassword, newPasswordConfirm, error => {
                expect(error).to.be.null

                readFile(`${process.env.DB_PATH}/users.json`,  (error, json) => {
                    expect(error).to.be.null

                    const users = JSON.parse(json)

                    const foundUser = users.find(_user => _user.id === user.id)

                    expect(newPassword).to.equal(newPasswordConfirm)
                    expect(foundUser.password).to.equal(newPassword)
                    expect(foundUser.password).to.equal(newPasswordConfirm)
                    done();
                })
            })
        })
    })

    it("should fail on changing user password due to wrong userId", done => {
        const user = {
            id,
            name,
            email,
            password,
            avatar,
            savedPosts
        }
        const failUserId = `id-22${Math.floor(Math.random() * 101)}`
        const json = JSON.stringify([user])
        newPasswordConfirm = newPassword

        writeFile(`${process.env.DB_PATH}/users.json`, json,  error => {
            expect(error).to.be.null

            updateUserPassword(failUserId, password, newPassword, newPasswordConfirm, error => {
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal("user not found")
                done()
            })
        })
    })

    it("should fail on current user password and typed password matching", done => {
        //es asincrono
        const user = {
            id,
            name,
            email,
            password,
            avatar,
            savedPosts
        }
        const json = JSON.stringify([user])
        newPasswordConfirm = newPassword
        const wrongPassword = `abcDdw!!${Math.floor(Math.random() * 101)}eg`

        writeFile(`${process.env.DB_PATH}/users.json`, json,  error => {
            expect(error).to.be.null

            updateUserPassword(user.id, wrongPassword, newPassword, newPasswordConfirm, error => {
                expect(user.password).to.not.equal(newPassword)
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal("typed password isn't actual password user's value")
                done()
            })
        })
    })

    it("should fail on current user password beeing equal to new password", () => {
        newPassword = password
        newPasswordConfirm = newPassword
        expect(() => updateUserPassword(id, password, newPassword, newPasswordConfirm, () => { })).to.throw(Error, `New password must be different as previous password`)
    })

    it("should fail on new password not beeing equal to new password confirmation", () => {
        newPasswordConfirm = `abcDdw!!${Math.floor(Math.random() * 101)}eg`
        expect(() => updateUserPassword(id, password, newPassword, newPasswordConfirm, () => { })).to.throw(Error, `new password and new password confirmation does not match`)
    })

    // resto de asincronos de los passwords 
    it("should fail on empty password", () => {
        newPasswordConfirm = newPassword
        expect(() => updateUserPassword(id, "", newPassword, newPasswordConfirm, () => { })).to.throw(Error, "Password is empty")
    })

    it("should fail on empty new password", () => {
        newPasswordConfirm = newPassword
        expect(() => updateUserPassword(id, password, "", newPasswordConfirm, () => { })).to.throw(Error, "Password is empty")
    })

    it("should fail on empty new password confirmation", () => {
        newPasswordConfirm = newPassword
        expect(() => updateUserPassword(id, password, newPassword, "", () => { })).to.throw(Error, "Password is empty")
    })

    it("should fail on blank spaced password", () => {
        newPasswordConfirm = newPassword
        expect(() => updateUserPassword(id, " ", newPassword, newPasswordConfirm, () => { })).to.throw(Error, "Password cant be a blankSpace")
    })

    it("should fail on blank spaced new password", () => {
        newPasswordConfirm = newPassword
        expect(() => updateUserPassword(id, password, " ", newPasswordConfirm, () => { })).to.throw(Error, "Password cant be a blankSpace")
    })

    it("should fail on blank spaced new password confirmation", () => {
        newPasswordConfirm = newPassword
        expect(() => updateUserPassword(id, password, newPassword, " ", () => { })).to.throw(Error, "Password cant be a blankSpace")
    })

    it("should fail on non-string value in password", () => {
        expect(() => updateUserPassword(id, 22, newPassword, newPasswordConfirm, () => { })).to.throw(Error, "Password is not a string")
        expect(() => updateUserPassword(id, true, newPassword, newPasswordConfirm, () => { })).to.throw(Error, "Password is not a string")
        expect(() => updateUserPassword(id, {}, newPassword, newPasswordConfirm, () => { })).to.throw(Error, "Password is not a string")
        expect(() => updateUserPassword(id, [], newPassword, newPasswordConfirm, () => { })).to.throw(Error, "Password is not a string")
    })

    it("should fail on non-string value in new password ", () => {
        expect(() => updateUserPassword(id, password, 22, newPasswordConfirm, () => { })).to.throw(Error, "Password is not a string")
        expect(() => updateUserPassword(id, password, true, newPasswordConfirm, () => { })).to.throw(Error, "Password is not a string")
        expect(() => updateUserPassword(id, password, {}, newPasswordConfirm, () => { })).to.throw(Error, "Password is not a string")
        expect(() => updateUserPassword(id, password, [], newPasswordConfirm, () => { })).to.throw(Error, "Password is not a string")
    })

    it("should fail on non-string value in new password confirmation", () => {
        expect(() => updateUserPassword(id, password, newPassword, 22, () => { })).to.throw(Error, "Password is not a string")
        expect(() => updateUserPassword(id, password, newPassword, true, () => { })).to.throw(Error, "Password is not a string")
        expect(() => updateUserPassword(id, password, newPassword, {}, () => { })).to.throw(Error, "Password is not a string")
        expect(() => updateUserPassword(id, password, newPassword, [], () => { })).to.throw(Error, "Password is not a string")
    })

    it("should fail on password shorter than 4 characters", () => {
        newPasswordConfirm = newPassword
        expect(() => updateUserPassword(id, "sun", newPassword, newPasswordConfirm, () => { })).to.throw(Error, "Password is shorter than 4 characters")
    })

    it("should fail on new password shorter than 4 characters", () => {
        newPasswordConfirm = newPassword
        expect(() => updateUserPassword(id, password, "sun", newPasswordConfirm, () => { })).to.throw(Error, "Password is shorter than 4 characters")
    })

    it("should fail on new password confirmation shorter than 4 characters", () => {
        newPasswordConfirm = newPassword
        expect(() => updateUserPassword(id, password, newPassword, "sun", () => { })).to.throw(Error, "Password is shorter than 4 characters")
    })

    it("should fail on invalid format in password ", () => {
        newPasswordConfirm = newPassword
        expect(() => updateUserPassword(id, "sundawdw", newPassword, newPasswordConfirm, () => { })).to.throw(Error, `password format incorrect`)
    })

    it("should fail on invalid format in new password ", () => {
        newPasswordConfirm = newPassword
        expect(() => updateUserPassword(id, password, "sundawdw", newPasswordConfirm, () => { })).to.throw(Error, `password format incorrect`)
    })

    it("should fail on invalid format in new password confirmation", () => {
        newPasswordConfirm = newPassword
        expect(() => updateUserPassword(id, "sundawdw", newPassword, "sundawdw", () => { })).to.throw(Error, `password format incorrect`)
    })
})