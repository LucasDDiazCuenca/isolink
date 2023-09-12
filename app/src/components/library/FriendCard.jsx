import { useState } from "react"
import { io } from "socket.io-client"
export const socket = io(`${import.meta.env.VITE_API2_URL}`)

export default function FriendCard({ userFriend }) {
    const [isConnected, setIsConnected] = useState(false)
    
    socket.on("front_boy_on_room", data => {
        setIsConnected(data)
    })

    socket.on("front_girl_on_room", data => {
        setIsConnected(data)
    })

    socket.on("front_boy_out_of_room", data => {
        setIsConnected(data)
    })


    return <div className="flex border border-solid border-[#C8B5FF] w-full justify-between p-2 rounded-xl my-3">
        <div className="w-3/6">
            <span className={`inline-flex w-3 h-3 rounded-full ${isConnected? "bg-[#5EEFB2]" : "bg-[#F3A0A0]"} `}></span>
            <p className="inline px-2">{userFriend}</p>
        </div>
        <p>{isConnected ? "Violet Room" : "---"}</p>
    </div>
}