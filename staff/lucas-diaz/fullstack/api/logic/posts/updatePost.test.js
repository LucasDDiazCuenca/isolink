const updatePost = require("./updatePost")


const image = "https://www.chiraltarquitectos.com/wp-content/uploads/2020/11/Bueno-Chiralt-Arquitectos-Valencia-Portada.jpg"
const text = "Look at that house"

updatePost("user-1", "post-2", image, text, error => {
    if (error) {
        console.log(error)
        return
    }
    console.log("Post updated correctly!! 😄")
})