import Form from "../components/library/Form"
import { Canvas } from '@react-three/fiber'
import LoginExperience from "../components/LoginExperience"
import { Link } from "react-router-dom"
import loginUser from "../logic/loginUser"
import { useAppContext } from "../hooks"
import ToastFail from "../components/ToastFail"
import { useState } from "react"


export default function Login() {
    const { navigate } = useAppContext()
    const [failMessage, setFailMessage] = useState(null)


    const handleLogin = event => {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        try {
            loginUser(email, password)
                .then(() => navigate("/"))
                .catch(error => {console.log(error.message, "error")})

        } catch (error) {
            setFailMessage(error.message)

            setTimeout(() => {
                setFailMessage(null)
            }, 3000)
        }

    }

    return <>
        {failMessage && <ToastFail message={failMessage}/>}
        <div className="fixed w-screen h-5/6 top-52 z-0">
            <Canvas
                className="z-0 fixed w-full h-80"
                shadows
                camera={{
                    fov: 80,
                    near: 0.1,
                    far: 200,
                    position: [0, 2, 5]
                }}
            >
                <LoginExperience />
            </Canvas>
        </div>

        <div className="w-screen h-screen bg-[#452b8e]">
            <section className="text-white flex flex-col flex-wrap justify-center content-center h-full">

                <div className="w-3/4 sm:w-1/3 sm:h-64 bg-cover bg-center bg-image flex items-center justify-center h-2/5 z-10 mx-auto" >
                    <h1 className="text-center text-5xl font-bold">Iso Link</h1>
                </div>

                <Form onSubmit={handleLogin}>
                    <div className="box-input sm:flex-col">
                        <label className=" p-1">Email:</label>
                        <input
                            type="email"
                            className=" rounded-lg p-2 pl-3 text-black bg-purple-200"
                            name="email"
                            placeholder="Enter your email"
                            autoComplete="current-password"
                        />
                    </div>

                    <div className="box-input">
                        <label className=" p-1">Password:</label>
                        <input
                            type="password"
                            className=" rounded-lg p-2 pl-3 text-black bg-purple-200"
                            name="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />
                    </div>

                    <button type="submit" className="form-button">Login</button>
                    <p className=" text-center pt-2"><Link to="/register">Go to register</Link></p>
                </Form>

            </section>

        </div>
    </>
}

