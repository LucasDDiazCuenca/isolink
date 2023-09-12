const mongoose = require("mongoose")

const {User, Post} = require("./models")

mongoose.connect("mongodb://127.0.0.1:27017/data")
    .then(() => {
        return User.create({ name: "Pepito Grillo", email: "pepito2@grillo.com", password: "PepitoGrillo22!" })

    })
    .then(user => {
        return Post.create({author: user.id, image:"https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png", text: "this is me"})
    })
    .catch(error => {
        console.log(error)
    })
    .finally(() => mongoose.disconnect())

