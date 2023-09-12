import retrieveUser from "../logic/retrieveUser"
import AppHeader from "../components/library/AppHeader"
import AppH1Card from "../components/library/AppH1Card"
import Footer from "../components/Footer"
import { useAppContext } from "../hooks"
import logOutUser from "../logic/logOutUser.js"
import { useEffect, useState } from "react"
import updateUserUsername from "../logic/updateUserUsername"
import updateUserPassword from "../logic/updateUserPassword"
import ToastFail from "../components/ToastFail"
import ToastSuccess from "../components/ToastSuccess"
import deleteAvatar from "../logic/deleteAvatar.js"

export default function EditProfile() {
    const [user, setUser] = useState(null)
    const { navigate } = useAppContext()
    const [userNameUpdated, setUserNameUpdated] = useState(false)
    const [passwordUpdated, setPasswordUpdated] = useState(false)
    const [failMessage, setFailMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)
    const [avatarDeleted, setAvatarDeleted] = useState(false)

    useEffect(() => {
        try {
            (async () => {
                const user = await retrieveUser()
                setUser(user)
            })()
        } catch (error) {
            alert(error.message)
        }
    }, [userNameUpdated])

    const handleLogOutClick = () => {
        logOutUser()
        navigate("/login")
    }

    const handleDeleteAvatar = () => {
        (async() => {
            try {
                await deleteAvatar()

                setSuccessMessage("Avatar deleted correctly")
                setTimeout(() => {
                    setSuccessMessage(null)
                    setAvatarDeleted(true)
                }, 2000)

                setTimeout(() => {
                    setAvatarDeleted(false)
                }, 2500)

            } catch (error) {
                setFailMessage(error.message)

                setTimeout(() => {
                    setFailMessage(null)
                }, 2000)
            }
        })()
    }

    const handleUpdateUserUsername = event => {
        event.preventDefault()
        const newUserName = event.target.userName.value;
        (async () => {
            try {
                await updateUserUsername(newUserName)
                setSuccessMessage("Username changed correctly")

                setTimeout(() => {
                    setSuccessMessage(null)
                }, 2000)

                setUserNameUpdated(!userNameUpdated)
                event.target.reset()
            } catch (error) {
                setFailMessage(error.message)

                setTimeout(() => {
                    setFailMessage(null)
                }, 2000)
            }
        })()

    }

    const handleUpdatePassword = event => {
        event.preventDefault()
        const password = event.target.password.value
        const newPassword = event.target.newPassword.value
        const newPasswordConfirmation = event.target.newPasswordConfirmation.value;

        (async () => {
            try {
                await updateUserPassword(password, newPassword, newPasswordConfirmation)

                setSuccessMessage("Password changed correctly")

                setTimeout(() => {
                    setSuccessMessage(null)
                }, 2000)

                setPasswordUpdated(!passwordUpdated)
                event.target.reset()
            } catch (error) {
                setFailMessage(error.message)

                setTimeout(() => {
                    setFailMessage(null)
                }, 2000)
            }
        })()


    }

    return <div className=" w-screen h-screen bg-white ">
        {successMessage && <ToastSuccess message={successMessage} />}
        {failMessage && <ToastFail message={failMessage} />}

        <AppHeader />
        <main className="w-full flex flex-col items-center">
            <AppH1Card user={user} type={"profile"} />

            <section className="flex flex-col flex-wrap w-full">

                <form className="w-full flex flex-col items-center mt-4" onSubmit={handleUpdateUserUsername}>
                    <div className="w-11/12 flex flex-col items-center">
                        <div className="flex flex-col w-full sm:w-80">
                            <label className="mb-2" >Username:</label>
                            <input className="border-2 border-solid border-[#A4A4A4] sm:w-80 p-2 rounded-xl" type="text" name="userName" />
                        </div>

                        <button className="bg-[#452b8e] text-white p-2 mt-3 w-10/12 sm:w-80 rounded-xl" type="submit" >Save</button>
                    </div>
                </form>

                <form className="w-full flex flex-col items-center mt-8" onSubmit={handleUpdatePassword}>
                    <div className="w-11/12 flex flex-col items-center">
                        <div className="flex flex-col w-full sm:w-80">
                            <label className="p-2">Current password:</label>
                            <input className="border-2 border-solid border-[#A4A4A4] sm:w-80 p-2 rounded-xl" type="password" name="password" />
                        </div>

                        <div className=" flex flex-col w-full sm:w-80">
                            <label className="p-2">New password:</label>
                            <input className="border-2 border-solid border-[#A4A4A4] sm:w-80 p-2 rounded-xl" type="password" name="newPassword" />
                        </div>

                        <div className=" flex flex-col w-full sm:w-80">
                            <label className="p-2">New password repetition:</label>
                            <input className="border-2 border-solid border-[#A4A4A4] sm:w-80 p-2 rounded-xl" type="password" name="newPasswordConfirmation" />
                        </div>

                        <button className="bg-[#452b8e] text-white p-2 mt-3 w-10/12 sm:w-80 rounded-xl" type="submit">Save</button>
                    </div>
                </form>

                <div className="flex flex-col items-center mt-6">
                    <button className="text-red-600 font-bold my-3" onClick={handleDeleteAvatar}>Delete Avatar </button>
                    <button className="text-red-600 font-bold" onClick={handleLogOutClick}>Log Out <img className="inline" src="./icons/logOut.png" /></button>
                </div>
            </section>
        </main>
        <Footer user={user}/>
    </div>
}