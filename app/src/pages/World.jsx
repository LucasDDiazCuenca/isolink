import { Canvas } from '@react-three/fiber'
import VioletRoomExperience from '../components/VioletRoomExperience'
import { Suspense, useEffect, useState } from 'react'
import retrieveAvatar from "../logic/retrieveAvatar"
import retrieveUser from "../logic/retrieveUser"
import { Loader, KeyboardControls } from "@react-three/drei"
import { useAppContext } from "../hooks"
import * as THREE from "three"
import getUserId from '../logic/getUserId'

import { io } from "socket.io-client"
const socket = io(`${import.meta.env.VITE_API2_URL}`)

export default function World() {
    const [avatar, setAvatar] = useState()
    const boy = "./models/boy.glb"
    const girl = "./models/girl.glb"
    const [user, setUser] = useState()
    const { navigate, setAvatars } = useAppContext()
    const [chatVisibility, setChatVisibility] = useState(false)
    const [emotionsVisibility, setEmotionsVisibility] = useState(false)
    const [emotionToSend, setEmotionToSend] = useState(null)
    const [message, setMessage] = useState("")
    const [boyMessageToSend, setBoyMessageToSend] = useState(null)
    const [girlMessageToSend, setGirlMessageToSend] = useState(null)
    const [messageToSend, setMessageToSend] = useState(null)



    useEffect(() => {
        console.log("<World/> mounted")
        try {

            (async () => {
                const _user = await retrieveUser()
                const _avatar = await retrieveAvatar()
                setAvatar(_avatar)
                setUser(_user)
            })()
        } catch (error) {
            alert(error)
        }

        return () => {
            console.log("<World/> unmounted")
        }
    }, [setAvatars])

    const handleNavigateHome = () => {
        navigate("/")
        socket.on("connect", console.log("user out of room"))
        socket.emit("delete_avatar", avatar)

        socket.on("send_characters", data => {
            setAvatars(data)
        })

        socket.emit("boy_out_of_room", false)

    }

    const handleTalk = () => {
        setChatVisibility(!chatVisibility)
    }

    const handleSendText = (event) => {

        if (event.key === "Enter") {
            if(avatar.model === boy && avatar.author._id === getUserId()){
                setBoyMessageToSend(message)

                socket.emit("send_boy_message_to_back", {
                    message: message, 
                    model: boy
                })
            }
            
            if(avatar.model === girl && avatar.author._id === getUserId()){
                setGirlMessageToSend(message)

                socket.emit("send_girl_message_to_back", {
                    message: message, 
                    model: girl
                })
            }

            setMessage("")
            setChatVisibility(!chatVisibility)

            setTimeout(() => {
                setBoyMessageToSend(null)
                setGirlMessageToSend(null)
            }, 3000)

        }
    }

    const handleEmotions = () => {
        setEmotionsVisibility(!emotionsVisibility)
    }

    const handleSendEmotion = (animation) => {
        setEmotionToSend(animation)

        setTimeout(() => {
            setEmotionToSend(null)
        }, 10)

        setEmotionsVisibility(!emotionsVisibility)
    }


    return <>
        <div className=" w-screen h-screen bg-white z-0">
            <KeyboardControls map={[
                { name: "forward", keys: ["ArrowUp"] },
                { name: "backward", keys: ["ArrowDown"] },
                { name: "leftward", keys: ["ArrowLeft"] },
                { name: "rightward", keys: ["ArrowRight"] },
                { name: "jump", keys: ["Space"] },
            ]}>
                <Loader
                    initialState={(active) => active} // Initial black out state
                />
                <Canvas
                    dpr={[1, 2]}
                    shadows
                    orthographic
                    camera={{
                        //fov: 80, 
                        zoom: 110,
                        near: 0.1,
                        far: 200,
                        position: [5, 2, 5]
                    }}
                    gl={{
                        antialias: true,
                        toneMapping: THREE.CineonToneMapping,
                        outputColorSpace: THREE.SRGBColorSpace
                    }}
                >
                    <color args={["#322734"]} attach={"background"} />
                    <Suspense fallback={null}>
                        <VioletRoomExperience avatar={avatar} boyMessageToSend={boyMessageToSend} girlMessageToSend={girlMessageToSend} emotionToSend={emotionToSend} />
                    </Suspense>
                </Canvas>
            </KeyboardControls>
        </div>
        <div className='fixed top-0 left-0 p-3'>
            <button onClick={handleNavigateHome}>
                <img src="./icons/logoutRedBg.png" alt="log out button" />
            </button>
        </div>
        <div className='fixed bottom-0 right-0 p-3  w-20'>
            <button onClick={handleTalk}>
                <img src="./icons/talk.png" alt="chat button" />
            </button>
        </div>
        <div className='fixed bottom-20 right-0 p-3 w-20'>
            <button onClick={handleEmotions}>
                <img src="./icons/emotions.png" alt="emotions button" />
            </button>
        </div>
        {emotionsVisibility && <div className='flex w-52 gap-x-4 p-2 bg-[#452B8E] rounded-xl fixed bottom-24 right-20'>
            <button>
                <img src={`./icons/emotions/${avatar?.emotions[0]}.png`} alt="emotions button" onClick={() => handleSendEmotion(avatar?.emotions[0])} />
            </button>
            <button>
                <img src={`./icons/emotions/${avatar?.emotions[1]}.png`} alt="emotions button" onClick={() => handleSendEmotion(avatar?.emotions[1])} />
            </button>
            <button>
                <img src={`./icons/emotions/${avatar?.emotions[2]}.png`} alt="emotions button" onClick={() => handleSendEmotion(avatar?.emotions[2])} />
            </button>
        </div>}
        {chatVisibility && <input className='fixed w-6/12 bottom-6 right-20 p-3 rounded-lg bg-purple-200' type="text" onChange={event => setMessage(event.target.value)} onKeyDown={handleSendText} />}
    </>
}