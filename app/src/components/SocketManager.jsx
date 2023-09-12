import { useEffect, useState } from "react"
import { io } from "socket.io-client"

export const socket = io(`${import.meta.env.VITE_API2_URL}`)

export const SocketManager = () => {
    const [isConnected, setIsConnected] = useState(false)
    const [isOnRoom, setIsOnRoom] = useState(false)

    useEffect(() => {
        console.log("user connected")

        function onConnect() {
            console.log("connected")
            setIsConnected(true)
            console.log(isConnected)
        }
        function onDisconnect() {
            console.log("user disconnected")
        }
        

        socket.on("connect", onConnect) //subscribirse a event connection de back
        socket.on("hello", onHello)  //subscribirse a event hello de back
        socket.on("characters", onCharacters) //subscribirse a event characters de back
        socket.on("disconnect", onDisconnect) //subscribirse a event disconnect de back

    }, [])

}