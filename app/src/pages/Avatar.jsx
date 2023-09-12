import AppH1Card from "../components/library/AppH1Card"
import AppHeader from "../components/library/AppHeader"
import Footer from "../components/Footer"
import { Canvas } from '@react-three/fiber'
import BoyBackgroundExperience from "../components/BoyBackgroundExperience"
import GirlBackgroundExperience from "../components/GirlBackgroundExperience"
import createAvatar from "../logic/createAvatar"
import retrieveUser from "../logic/retrieveUser"
import { useEffect, useState } from "react"
import { useAppContext } from "../hooks"
import ToastFail from "../components/ToastFail"
import ToastSuccess from "../components/ToastSuccess"

export default function Avatar() {
    const { navigate } = useAppContext()
    const [user, setUser] = useState(null)
    const [boyClicked, setboyClicked] = useState(null)
    const [girlClicked, setGirlClicked] = useState(null)
    const [selectedEmotions, setSelectedEmotions] = useState([]);
    const [model, setModel] = useState("")
    const [name, setName] = useState(null)
    const [personality, setPersonality] = useState(null)
    const [age, setAge] = useState(null)
    const emotions = ["clap", "dance", "die", "laugh", "victory", "wave"]
    let colors
    const [failMessage, setFailMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const toggleBoyAvatarImg = () => {
        setboyClicked(true)
        setGirlClicked(false)
        setModel("./models/boy.glb")
    }
    const toggleGirlAvatarImg = () => {
        setGirlClicked(true)
        setboyClicked(false)
        setModel("./models/girl.glb")
    }
    const toggleEmotion = (emotion) => {
        if (selectedEmotions.includes(emotion)) {
            setSelectedEmotions(prevState => prevState.filter(e => e !== emotion));
        } else if (selectedEmotions.length < 3) {
            setSelectedEmotions(prevState => [...prevState, emotion]);
        }
    }
    const setNameInformation = event => {
        setName(event.target.value)
    }
    const setPersonalityInformation = event => {
        setPersonality(event.target.value)
    }
    const setAgeInformation = event => {
        setAge(event.target.value)
    }

    const handleRetrieveBoyModelInformation = (info) => {
        colors = info
    }

    const handleRetrieveGirlModelInformation = (info) => {
        colors = info
    }

    const handleCreateAvatar = () => {
        (async () => {
            try {
                if(model === "./models/boy.glb"){
                    await createAvatar(model, name, personality, age, colors.hair, colors.skin, colors.shirt, colors.trousers, colors.shoes, selectedEmotions);
                    
                    setSuccessMessage("Avatar created correctly")
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 2000)
                    
                    setTimeout(() => {
                        navigate("/")
                    }, 2500)
                } 
                if(model === "./models/girl.glb"){
                    await createAvatar(model, name, personality, age, colors.hair2, colors.skin2, colors.shirt2, colors.trousers2, colors.shoes2, selectedEmotions);
                    
                    setSuccessMessage("Avatar created correctly")
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 2000)
                    
                    setTimeout(() => {
                        navigate("/")
                    }, 2500)
                }
            } catch (error) {
                setFailMessage(error.message)

                    setTimeout(() => {
                        setFailMessage(null)
                    }, 2000)
            }
        })();
    }

    useEffect(() => {
        try {
            (async () => {
                const user = await retrieveUser()

                setUser(user)
            })()
        } catch (error) {
            alert(error.message)
        }
    }, [])

    return <div className=" w-screen h-screen bg-white">
        {successMessage && <ToastSuccess message={successMessage} />}
        {failMessage && <ToastFail message={failMessage} />}
        <AppHeader />
        <main className="w-full flex flex-col items-center pb-32 bg-white">
            <AppH1Card user={user} type={"avatar"} />
            <section className="w-11/12 sm:w-96">
                <h2 className="text-lg font-bold my-3">Choose an avatar</h2>
                <div className="flex justify-around">
                    <div className={`w-36 h-40 rounded-t-full z-10 cursor-pointer ${boyClicked ? "border-2 border-solid border-[#5EEFB2]" : ""}`} onClick={toggleBoyAvatarImg}>
                        <Canvas
                            className="rounded-t-full"
                            shadows
                            camera={{
                                fov: 80,
                                near: 0.1,
                                far: 200,
                                position: [0, 0.2, 1.8]
                            }}
                        >
                            <BoyBackgroundExperience />
                        </Canvas>
                    </div>

                    <div className={`w-36 h-40 rounded-t-full z-10 cursor-pointer ${girlClicked ? "border-2 border-solid border-[#5EEFB2]" : ""}`} onClick={toggleGirlAvatarImg}>
                        <Canvas
                            className="rounded-t-full"
                            shadows
                            camera={{
                                fov: 80,
                                near: 0.1,
                                far: 200,
                                position: [0, 0.2, 1.8]
                            }}
                        >
                            <GirlBackgroundExperience />
                        </Canvas>
                    </div>
                </div>
            </section>

            <section className="w-11/12 sm:w-96 h-96">
                <h2 className="text-lg font-bold my-3">Edit Avatar:</h2>
                <div className="h-72 rounded-lg">

                    {boyClicked || girlClicked ? <Canvas
                        className="rounded-lg"
                        shadows
                        camera={{
                            fov: 80,
                            near: 0.1,
                            far: 200,
                            position: [0, 0.2, 1.8]
                        }}
                    >
                        {girlClicked && <GirlBackgroundExperience active={girlClicked} info={handleRetrieveGirlModelInformation} />}
                        {boyClicked && <BoyBackgroundExperience active={boyClicked} info={handleRetrieveBoyModelInformation} />}
                    </Canvas> : <img src="./image/avatarPlaceHolder.png" />}
                </div >

            </section>

            <section className="w-11/12 sm:w-96">
                <h2 className="text-lg font-bold my-3 mt-10">Type Avatar information:</h2>
                <form className="w-full">
                    <input className="w-full border border-1 rounded-xl p-2 my-2" type="text" placeholder="Avatar name" name="avatarname" onChange={setNameInformation} />
                    <input className="w-full border border-1 rounded-xl p-2 my-2" type="text" placeholder="Avatar personality" name="personality" onChange={setPersonalityInformation} />
                    <input className="w-full border border-1 rounded-xl p-2 my-2" type="text" placeholder="Avatar age" name="age" onChange={setAgeInformation} />
                </form>
            </section>

            <section className="w-11/12 sm:w-96">
                <h2 className="text-lg font-bold my-3">Select emotions:</h2>
                <p className="pb-3">Select 3 from this 6 emotions</p>
                <div className="flex flex-wrap justify-around gap-2">
                    {emotions.map(emotion => (
                        <button
                            key={emotion}
                            className={`w-28 ${selectedEmotions.includes(emotion) ? "border-2 border-solid border-[#5EEFB2] rounded-3xl" : ""}`}
                            onClick={() => toggleEmotion(emotion)}
                        >
                            <img src={`./icons/emotions/${emotion}.png`} alt={`${emotion} icon`} />
                        </button>
                    ))}
                </div>
            </section>

            <button className="bg-[#452b8e] text-white p-2 mt-10 w-10/12 sm:w-80 rounded-xl" type="submit" onClick={handleCreateAvatar} >{user?.avatar.length > 0 ? "Modify avatar" : "Create avatar"}</button>
        </main>
        <Footer user={user} />
    </div>
}