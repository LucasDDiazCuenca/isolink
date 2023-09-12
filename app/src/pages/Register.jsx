import { Canvas } from "@react-three/fiber"
import RegisterExperience from "../components/RegisterExperience"
import Form from "../components/library/Form"
import registerUser from "../logic/registerUser"
import { Link } from "react-router-dom"
import { useAppContext } from "../hooks"
import ToastFail from "../components/ToastFail"
import ToastSuccess from "../components/ToastSuccess"
import { useState } from "react"


export default function Register() {
    const { navigate } = useAppContext()
    const [failMessage, setFailMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const handleRegister = event => {
        event.preventDefault()

        const temporalUserName = event.target.name.value;
        const temporalEmail = event.target.email.value;
        const temporalPassword = event.target.password.value;

        try {
            registerUser(temporalUserName, temporalEmail, temporalPassword)
                .then(() => {
                    setSuccessMessage("User Created Correctly")

                    setTimeout(() => {
                        setSuccessMessage(null)
                    },2000)
                    
                    setTimeout(() => {
                        navigate("/login")
                    },3000)
                })
                .catch(error => {
                    setFailMessage(error.message)

                    setTimeout(() => {
                        setFailMessage(null)
                    }, 3000)
                })
        } catch (error) {
            setFailMessage(error.message)

            setTimeout(() => {
                setFailMessage(null)
            }, 3000)
        }

    }

    return <>
        {successMessage && <ToastSuccess message ={successMessage}/>}
        {failMessage && <ToastFail message={failMessage} />}
        <div className="fixed w-full h-full z-0">
            <Canvas
                shadows
                camera={{
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [-4.5, 3, 30]
                }}
            >
                <RegisterExperience />
            </Canvas>
        </div>

        <div className="w-screen h-screen pt-32" >
            <section className="text-white flex flex-row flex-wrap justify-center h-full">
                <Form onSubmit={handleRegister}>
                    <div className="box-input">
                        <label className="p-1">Username:</label>
                        <input
                            type="text"
                            className="rounded-lg p-2 pl-3 text-black bg-purple-200"
                            name="name"
                            placeholder="Enter an username"
                        />
                    </div>
                    <div className="box-input">
                        <label className="p-1">Email:</label>
                        <input
                            type="email"
                            className="rounded-lg p-2 pl-3 text-black bg-purple-200"
                            name="email"
                            placeholder="Enter an email"
                            autoComplete="current-password"
                        />
                    </div>
                    <div className="box-input">
                        <label className="p-1">Password:</label>
                        <input
                            type="password"
                            className="rounded-lg p-2 pl-3 text-black bg-purple-200"
                            name="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />
                    </div>
                    <button type="submit" className="form-button">Register</button>
                    <p className="text-center pt-2"><Link to="/login">Sign in</Link></p>
                </Form>
            </section>
        </div>
    </>
} 