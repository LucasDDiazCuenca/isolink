const mongodb = require("mongodb")

const { MongoClient, ObjectId } = mongodb

const client = new MongoClient("mongodb://127.0.0.1:27017/data")

client.connect()
    .then(connection => {
        const users = connection.db().collection("users")
        const posts = connection.db().collection("posts")

        // return users.insertOne({ name: "Pepito Grillo", email: "pepito3@grillo.com", password: "123123" })
        // return posts.insertOne({
        //     author: new ObjectId("64932943b8422beb65fa1b8a"),
        //     userName: 'lucas Diaz',
        //     image: 'https://www.construyehogar.com/wp-content/uploads/2016/01/Casa-moderna-un-piso.jpg',
        //     text: 'caca',
        //     date: '2023-06-15T16:30:37.466Z',
        //     likeCounter: [],
        //     visibility: 'public'
        // })
        return posts.findOne({text: "caca"})
    })
    .then(result => {
        console.log(result)
    })
    .catch(error => {
        console.log(error)
    })
    .finally(() => client.close())