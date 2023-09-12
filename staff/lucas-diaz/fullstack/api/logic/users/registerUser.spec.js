require("dotenv").config()
const { expect } = require("chai")
const registerUser = require("./registerUser")
const { readFile, writeFile } = require("fs")


describe("registerUser", () => {
    let name, email, password
    // antes de todos los test para limpiar el array a "[]"
    beforeEach(done => {
        name = `name-${Math.floor(Math.random() * 101)}`
        email = `e-${Math.floor(Math.random() * 101)}@gmail.com`
        password = `abcD!!${Math.floor(Math.random() * 101)}eg`

        writeFile(`${process.env.DB_PATH}/users.json`, "[]",  error => {
            done(error)
        })
    })

    it("should succed on new user", done => {
        registerUser(name, email, password, error => {
            //Esperamos que el error sea nulo
            expect(error).to.be.null

            //esperamos que el usuario se haya registrado, pa eso tenemos
            //Que leer el users.json y buscarlo 
            readFile(`${process.env.DB_PATH}/users.json`,  (error, json) => {
                //Esperamos que el error sea nulo
                expect(error).to.be.null

                const users = JSON.parse(json)

                const user = users.find(user => user.email === email)

                expect(user).to.exist
                expect(user.id).to.be.a("string")
                expect(user.name).to.equal(name)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
                expect(user.avatar).to.equal("https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png")
                expect(user.savedPosts).to.have.lengthOf(0)

                done();
            })
        })
    })

    it("should suceed in other existing user", done => {
        //creamos un user 
        const idNumber = Math.round(Math.random() * 100 + 1)
        const id = `user-${idNumber}`
        const name = `name-${Math.floor(Math.random() * 101)}`
        const email = `e-${Math.floor(Math.random() * 101)}@gmail.com`
        const password = `abcD!!${Math.floor(Math.random() * 101)}eg`
        const avatar = `https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512${Math.floor(Math.random() * 101)}.png`
        const savedPosts = []

        const name2 = `name-${Math.floor(Math.random() * 101)}`
        const email2 = `e-${Math.floor(Math.random() * 101)}@gmail.com`
        const password2 = `abcD!!${Math.floor(Math.random() * 101)}eg`

        const user = { id, name, email, password, avatar, savedPosts }
        const json = JSON.stringify([user], null, 4)
        //metemos un user 
        writeFile(`${process.env.DB_PATH}/users.json`, json,  error => {
            expect(error).to.be.null

            registerUser(name2, email2, password2, error => {
                //Esperamos que el error sea nulo
                expect(error).to.be.null
    
                //esperamos que el usuario se haya registrado, pa eso tenemos
                //Que leer el users.json y buscarlo 
                readFile(`${process.env.DB_PATH}/users.json`,  (error, json) => {
                    //Esperamos que el error sea nulo
                    expect(error).to.be.null
    
                    const users = JSON.parse(json)
                    const user = users.find(user => user.email === email2)
                    
                    expect(user).to.exist
                    expect(user.id).to.equal(`user-${idNumber + 1}`)
                    expect(user.name).to.equal(name2)
                    expect(user.email).to.equal(email2)
                    expect(user.password).to.equal(password2)
                    expect(user.savedPosts).to.have.lengthOf(0)
    
                    done();
                })
            })
        })
    })

    it("should fail on existing user", done => {
        //creamos un user 
        const id = `id-${Math.floor(Math.random() * 101)}`
        const name = `name-${Math.floor(Math.random() * 101)}`
        const email = `e-${Math.floor(Math.random() * 101)}@gmail.com`
        const password = `abcD!!${Math.floor(Math.random() * 101)}eg`
        const avatar = `https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512${Math.floor(Math.random() * 101)}.png`
        const savedPosts = []

        const user = { id, name, email, password, avatar, savedPosts }
        const json = JSON.stringify([user], null, 4)
        //metemos un user 
        writeFile(`${process.env.DB_PATH}/users.json`, json,  error => {
            expect(error).to.be.null

            registerUser(name, email, password, error => {
                //volvemos a meter el mismo user 
                // meter los expect 
                //expect(error).to.exist ES REDUNDANTE POR EL DE ABAJO
                expect(error).to.be.instanceOf(Error)
                expect(error.message).to.equal(`User with email ${email} already exist`)

                done()
            })
        })
    })



    //! OJO AL TRATO DE ERROR SINCRONO
    it("should fail on empty name", () => {
        /*         try {
                    registerUser("", email, password, () => { })
        
                } catch (error) {
                    expect(error).to.be.instanceOf(Error)
                    expect(error.message).to.equal("Username is empty")
                } */
        expect(() => registerUser("", email, password, () => { })).to.throw(Error, "Username is empty")
    })

    it("should fail on non-string value in username", () => {
        expect(() => registerUser(true, email, password, () => { })).to.throw(Error, "Username is not a string")
        expect(() => registerUser(22, email, password, () => { })).to.throw(Error, "Username is not a string")
        expect(() => registerUser({}, email, password, () => { })).to.throw(Error, "Username is not a string")
        expect(() => registerUser([], email, password, () => { })).to.throw(Error, "Username is not a string")
    })

    it("should fail on blank space value in username", () => {
        expect(() => registerUser(" ", email, password, () => { })).to.throw(Error, "Username cant be a blankSpace")
    })

    it("should fail on empty email", () => {
        expect(() => registerUser(name, "", password, () => { })).to.throw(Error, "Email is empty")
    })

    it("should fail on non-string value in email", () => {
        expect(() => registerUser(name, 22, password, () => { })).to.throw(Error, "Email is not a string")
        expect(() => registerUser(name, true, password, () => { })).to.throw(Error, "Email is not a string")
        expect(() => registerUser(name, {}, password, () => { })).to.throw(Error, "Email is not a string")
        expect(() => registerUser(name, [], password, () => { })).to.throw(Error, "Email is not a string")
    })

    it("should fail on invalid format in email", () => {
        expect(() => registerUser(name, "hola", password, () => { })).to.throw(Error, 'Invalid email format')
    })

    it("should fail on blank space value in email", () => {
        expect(() => registerUser(name, " ", password, () => { })).to.throw(Error, "Email cant be a blankSpace")
    })

    it("should fail on empty password", () => {
        expect(() => registerUser(name, email, "", () => { })).to.throw(Error, "Password is empty")
    })

    it("should fail on non-string value in password", () => {
        expect(() => registerUser(name, email, 22, () => { })).to.throw(Error, "Password is not a string")
        expect(() => registerUser(name, email, true, () => { })).to.throw(Error, "Password is not a string")
        expect(() => registerUser(name, email, {}, () => { })).to.throw(Error, "Password is not a string")
        expect(() => registerUser(name, email, [], () => { })).to.throw(Error, "Password is not a string")
    })

    it("should fail on blank space value in password", () => {
        expect(() => registerUser(name, email, " ", () => { })).to.throw(Error, "Password cant be a blankSpace")
    })

    it("should fail on lower than 4 character password", () => {
        expect(() => registerUser(name, email, "bo", () => { })).to.throw(Error, "Password is shorter than 4 characters")
    })

    it("should fail on invalid format in password", () => {
        expect(() => registerUser(name, email, "helloworld", () => { })).to.throw(Error, `password format incorrect`)
    })

    // Se ejecuta 1 vez luego de todos  los test para limpiar 
    after(done => writeFile(`${process.env.DB_PATH}/users.json`, "[]",  error => done(error)))
})


