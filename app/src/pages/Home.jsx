import { Canvas } from '@react-three/fiber'
import HomeBackgroundExperience from '../components/HomeBackgroundExperience'
import AppHeader from "../components/library/AppHeader"
import AppH1Card from "../components/library/AppH1Card"
import Footer from "../components/Footer"
import retrieveUser from "../logic/retrieveUser"
import retrieveAvatar from "../logic/retrieveAvatar"
import { useEffect, useState } from "react"
import { useAppContext } from "../hooks"
import { io } from "socket.io-client"
const socket = io(`${import.meta.env.VITE_API2_URL}`)

export default function () {
    const [user, setUser] = useState(null)
    const [avatar, setAvatar] = useState(null)
    let { navigate, setAvatars } = useAppContext()

    useEffect(() => {
        try {
            (async () => {
                const user = await retrieveUser()
                if (user.avatar) {
                    const _avatar = await retrieveAvatar()
                    setAvatar(_avatar)
                }
                setUser(user)
            })()
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const handleNavigateCreateAvatar = event => {
        event.preventDefault()
        navigate("/avatar")
    }

    const handleNavigateWorld = event => {
        event.preventDefault()
        socket.on("connect", console.log("user in room"))
        socket.emit("add_avatar", avatar)

        socket.on("send_characters", data => {
            setAvatars(data)
        })

        navigate("/world")
    }

    return <div className=" w-screen h-screen bg-white">
        <AppHeader />
        <main className="w-full flex flex-col items-center">
            <AppH1Card user={user} type={"home"} />

            <article className="avatar-info w-full flex flex-col items-center">

                {avatar ?
                    <div className="avatar-card flex justify-between text-white bg-[#452b8e] rounded-xl p-3 w-9/12 max-w-sm h-48 m-2">
                        <Canvas
                            shadows
                            camera={{
                                fov: 80,
                                near: 0.1,
                                far: 200,
                                position: [0, 0, 0]
                            }}
                        >
                            <HomeBackgroundExperience avatar={avatar} />
                        </Canvas>
                    </div>
                    :
                    <div className="avatar-card flex justify-between text-white bg-[#452b8e] rounded-xl p-3 w-9/12 max-w-sm h-48 m-2">
                        <h2 className="font-bold text-xl w-8/12 sm:w-7/12">Create you avatar here!! 🙆🏼</h2>
                        <button className="self-end cursor-pointer" onClick={handleNavigateCreateAvatar}>
                            <img src="./icons/violetPlus.png" alt="Add Avatar" />
                        </button>
                    </div>}

                <div className="avatar-description w-9/12 sm:w-96 flex flex-col items-start mt-3">
                    <h2 className="font-bold text-xl">{avatar ? avatar.name : "Avatar's name"}</h2>
                    <p><b>Personality: </b>{avatar ? avatar.personality : "---"}</p>
                    <p><b>Age: </b>{avatar ? avatar.age : "---"}</p>
                </div>
            </article>

            {user?.avatar && <button className="bg-[#452b8e] text-white p-3 w-4/6 sm:w-80 rounded-2xl mt-32" onClick={handleNavigateWorld}>Go to room</button>}
        </main>

        <Footer user={user} />
    </div>
}