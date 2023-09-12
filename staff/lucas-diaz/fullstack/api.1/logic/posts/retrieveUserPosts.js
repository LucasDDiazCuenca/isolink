require("dotenv").config()
const { readFile } = require("fs")
const { validators: {validateId} } = require('com') 

//those posts comes from retrievePosts

module.exports = function retrieveUserPosts(userId, callback){
    validateId(userId);

    readFile(`${process.env.DB_PATH}/users.json`,  (error, json) => {
        if (error) {
            callback(error)
            return
        }
        const users = JSON.parse(json)
        //buscar user 
        const foundUser = users.find(user => user.id === userId)

        if (!foundUser) {
            callback(new Error("User not found"))
            return
        }

        readFile("data/posts.json", (error, json) => {
            if (error) {
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

            const userPosts = posts.filter(post => {
                return post.author.id === foundUser.id
            })
            
            callback(null, userPosts.reverse()) 
        })
    })
}



