require('dotenv').config()

const mongoose = require('mongoose')
const { User } = require("../../data/models")
const sendFriendRequest = require("./sendFriendRequest")

    // mongoose.connect(process.env.MONGODB_URL)
    //     .then(() => Promise.all([User.deleteMany(), Post.deleteMany()]))
    //     .then(() => registerUser('Peter Pan', 'peter@pan.com', '123123123'))
    //     .catch(error => console.error(error))
    //     .finally(() => mongoose.disconnect())

    ;
(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)

        // await Promise.all([User.deleteMany(), Post.deleteMany()])

        await sendFriendRequest('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGQwMzIwMGUxY2NlNDgzNDg0YjBkYjYiLCJpYXQiOjE2OTEzNjkyMjcsImV4cCI6MTY5MTk3NDAyN30.N8xxOBAbvYjRAmyH1e2tt004r7wajhw8x3xivCcvUoU', 'Valentin')
    } catch (error) {
        console.error(error)
    } finally {
        mongoose.disconnect()
    }
})()