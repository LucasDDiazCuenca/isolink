require("dotenv").config()
const { readFile } = require("fs")
const {validators: {validateId} } = require("com")

module.exports = function retrievePosts(userId, callback){
    validateId(userId);

    readFile(`${process.env.DB_PATH}/users.json`,  (error, json) => {
        if (error) {
            callback(error)
            return
        }
        const users = JSON.parse(json)
        //buscar user 
        const user = users.find(user => user.id === userId)

        if (!user) {
            callback(new Error("User not found"))
            return
        }

        readFile(`${process.env.DB_PATH}/posts.json`, (error, json) => {
            if(error){
                callback(error)
                return
            }
            
            
            const posts = JSON.parse(json)

            posts.forEach(post => {
                // para c/post vamos a buscar su user propio
                const _user = users.find(user => user.id === post.author)
                //en esta propiedad, le agregamos un objeto con 3 datos mas, includio el avatar, la id y el nombre. 
                post.author = {
                    id: _user.id,
                    name: _user.name,
                    avatar: _user.avatar
                }
            })

            const _posts = posts.filter(post=> {
                //trae tu post (uno a uno con el filter)
                if (post.author.id === userId){
                    return post.author.id === userId
                // si no es tu post, trae el que tenga visibilidad
                } else if (post.author.id !== userId){
                    return post.visibility === "public"
                }
            })

            callback(null, _posts.reverse())
        })
    })
}