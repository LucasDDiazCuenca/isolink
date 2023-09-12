//API2のインデックス
require("dotenv").config()
const { Server } = require("socket.io")



const io = new Server({
    cors: {
        origin: "http://localhost:5173"
    },
})

io.listen(process.env.PORT)

const characters = []

io.on("connection", (socket) => {
    //!emitir conexion hacia front 
    console.log("User connected")

    //!recibe avatar desde front y lo pushea, si existe no lo pushea
    socket.on("add_avatar", data => {

        const isAvatarRepeated = characters.some(avatar => avatar._id === data._id)

        if (!isAvatarRepeated) {
            characters.push(data)
        }

        //! funcion enviar  --> una funcion que envie a front el array de characters 
        io.emit("send_characters", characters)
    })

    //!recibe avatar desde front y lo elimina, si existe no lo pushea
    socket.on("delete_avatar", data => {
        const character = characters.find(character => character._id === data._id)

        if (character) {
            characters.splice(characters.indexOf(character), 1);
        }
        
        io.emit("send_characters", characters)
    })

    socket.on("boy_on_room", data => {
        socket.broadcast.emit("front_boy_on_room", data)
    })

    socket.on("girl_on_room", data => {
        socket.broadcast.emit("front_girl_on_room", data)
    })

    socket.on("boy_out_of_room", data => {
        socket.broadcast.emit("front_boy_out_of_room", data)
    })

    //!recibe y envia la posicion del avatar boy
    socket.on('move_character_secondary', data => {
        socket.broadcast.emit("move_character_secondary_front", data)
    })

    //!recibe y envia la posicion del avatar girl
    socket.on('move_character2_secondary', data => {
        socket.broadcast.emit("move_character2_secondary_front", data)
    })

    //!recibe y envia mensajes boy
    socket.on("send_boy_message_to_back", data => {
        socket.broadcast.emit("send_boy_message_to_front", data)
    })

    //!recibe y envia mensajes girl
    socket.on("send_girl_message_to_back", data => {
        socket.broadcast.emit("send_girl_message_to_front", data)
    })


    socket.on("disconnect", () => {
        console.log("User disconnected")
    })
})

