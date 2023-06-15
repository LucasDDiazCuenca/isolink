const express = require("express")
const { registerUser, authenticateUser, retrieveUser, updateUserAvatar, updateUserPassword } = require("./logic")

const api = express()

// esto es un middleware que pasará primero para cada peticion api.get/post/etc
api.use((req, res, next) =>{
    //Estas 2 de abajo son cabeceras (headers)
    res.setHeader("Access-Control-Allow-Origin", "*") //acepta llamadas de cualquier ruta
    res.setHeader("Access-Control-Allow-Headers", "*") //permite cualquier tipo de header
    res.setHeader("Access-Control-Allow-Methods", "*") //nos permite acceder a todos los metodos que no sean get y post (patch)
    //sirve para avisar que aqui hemos terminado, que continue con la peticion corresp
    next()
})



api.get("/", (req, res) => {
    res.send("Hello, World!") 
})
api.get("/helloworld", (req, res) => res.json({ hello: "world" }))

//!registerUSer
//Ese users solo hace referencia a users.json, lo que lo obvia! 
// Esta no devuelve nada, devuelve un body vacio 
api.post("/users", (req, res) => {
    let json = ""

    req.on("data", chunk => {
        json += chunk
    })

    req.on("end", () => {
        try {
            const { name, email, password } = JSON.parse(json)


            registerUser(name, email, password, error => {
                if (error) {
                    res.status(400).json({ error: error.message })
                    return
                }

                res.status(204).send()
            })

        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })
})

//!authenticateUser
api.post("/users/auth", (req, res) => {
    let json = "";

    req.on("data", chunk => {
        json += chunk
    })

    req.on("end", () => {
        try {
            const { email, password } = JSON.parse(json)
            authenticateUser(email, password, (error, userId) => {
                if (error) {
                    res.status(404).json({ error: error.message })
                }
                res.status(202).json({ userId })
            })

        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    })
})

//!retrieveUser
api.get("/users/:userId", (req, res) => {
    //TODO call retrieveUser and return user (in json)
    try {
        const { userId } = req.params

        retrieveUser(userId, (error, user) => {
            if (error) {
                res.status(400).json({ error: error.message })
                return
            }

            res.status(200).json(user)
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

//!updateUserAvatar
api.patch("/users/avatar/:userId", (req, res) => {
    let json = "";


    req.on("data", chunk => {
        json += chunk
    })

    req.on("end", () => {
        try {
            const { userId } = req.params
            const  avatar  = JSON.parse(json)

            updateUserAvatar(userId, avatar, error => {
                if (error) {
                    res.status(404).json({ error: error.message })
                }
                res.status(204).send()
            })

        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    })
})

//!updateUserPassword
api.patch("/users/password/:userId", (req, res) => {
    let json = "";

    req.on("data", chunk => {
        json += chunk
    })
 
    req.on("end", () => {
        debugger;
        try {
            const { userId } = req.params

            const { password, newPassword, newPasswordConfirmation } = JSON.parse(json)

            console.log(password)


            updateUserPassword(userId, password, newPassword, newPasswordConfirmation, error => {
                if (error) {
                    res.status(404).json({ error: error.message })
                }
                res.status(204).send()
            })

        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    })
})


//! createPost

api.post("/posts", (req, res) => {
    let json = ""

    req.on("data", chunk => {
        json += chunk
    })

    req.on("end", () => {
        try {
            const { name, email, password } = JSON.parse(json)


            registerUser(name, email, password, error => {
                if (error) {
                    res.status(400).json({ error: error.message })
                    return
                }

                res.status(204).send()
            })

        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    })
})


api.listen(4000)


