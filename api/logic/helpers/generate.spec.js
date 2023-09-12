const { expect } = require("chai")
const generate = require("./generate")

describe("generate", () => {
    
    it("should generate a user with a random name, email, and password", () => {
        const user = generate.user()

        expect(user.name).to.be.a("string")
        expect(user.email).to.be.a("string")
        expect(user.password).to.be.a("string")
    })

    it("should generate a random hex color", () => {
        const color = generate.generateRandomHexColor()

        expect(color).to.be.an("string")
    })

    it("should generate an avatar with a random name, author, personality, age, hair, skin, shirt, trousers, shoes, and emotions", async () => {
        const avatar = generate.avatar()
    
        expect(avatar).to.be.an("object")
    })

    it("should generate a random avatar model", async () => {
        const avatar = generate.avatar()
    
        expect(avatar.model).to.be.oneOf(["./models/boy.glb", "./models/girl.glb"])
    })
})
