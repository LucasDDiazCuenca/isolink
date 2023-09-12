import AppHeader from "../components/library/AppHeader"
import AppH1Card from "../components/library/AppH1Card"
import Footer from "../components/Footer"
import retrieveUser from "../logic/retrieveUser"
import retrieveUserFriends from "../logic/retrieveUserFriends"
import retrieveUserFriendsRequests from "../logic/retrieveUserFriendsRequests"
import FriendCard from "../components/library/FriendCard"
import FriendRequestCard from "../components/library/FriendRequestCard"
import { useEffect, useState } from "react"
import sendFriendRequest from "../logic/sendFriendRequest.js"
import deleteFriend from "../logic/deleteFriend.js"
import ToastFail from "../components/ToastFail"
import ToastSuccess from "../components/ToastSuccess"

export default function Friends() {
    const [user, setUser] = useState(null)
    const [userFriends, setUserFriends] = useState([])
    const [userFriendsRequests, setUserFriendsRequests] = useState([])
    const [forceUpdate, setForceUpdate] = useState(false)
    const [failMessage, setFailMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    useEffect(() => {
        try {

            (async () => {
                const user = await retrieveUser()
                const userFriends = await retrieveUserFriends()
                const userFriendsRequests = await retrieveUserFriendsRequests()

                setUser(user)
                setUserFriends(userFriends)
                setUserFriendsRequests(userFriendsRequests)
            })()
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const handleSendFriendRequest = event => {
        event.preventDefault();
        const requestedUsername = event.target.addFriend.value;
        (async () => {
            try {
                await sendFriendRequest(requestedUsername)

                setSuccessMessage("friend request sended correctly")
                setTimeout(() => {
                    setSuccessMessage(null)
                }, 2000)
                event.target.reset()

            } catch (error) {
                setFailMessage(error.message)

                setTimeout(() => {
                    setFailMessage(null)
                }, 2000)
            }
        })()


    }

    const handleDeleteFriend = event => {
        event.preventDefault()
        const requestedUsername = event.target.deleteFriend.value;
        (async () => {
            try {
                await deleteFriend(requestedUsername)
                setSuccessMessage("friend deleted correctly")
                setTimeout(() => {
                    setSuccessMessage(null)
                }, 2000)
                event.target.reset()
                const updatedFriends = userFriends.filter(friend => friend !== requestedUsername);
                setUserFriends(updatedFriends);
                event.target.reset()
                
            } catch (error) {
                setFailMessage(error.message)

                setTimeout(() => {
                    setFailMessage(null)
                }, 2000)
            }
        })()
    }

    return <div className=" w-screen h-screen bg-white pb-28">
        {successMessage && <ToastSuccess message={successMessage} />}
        {failMessage && <ToastFail message={failMessage} />}
        <AppHeader />
        <main className="w-full flex flex-col items-center">
            <AppH1Card user={user} type={"friends"} />

            <section className="w-11/12 sm:w-96">
                <h2 className="text-lg font-bold my-3">My friends</h2>

                {userFriends.length > 0 ? userFriends.map((userFriend, index) => <FriendCard
                    userFriend={userFriend}
                    key={index}

                />) : <p>You have no friends at the moment</p>}

            </section>

            <section className="w-11/12 sm:w-96">
                <h2 className="text-lg font-bold my-3">Friends Editor</h2>

                <article className="w-full">
                    <form className="w-full my-4" onSubmit={handleSendFriendRequest}>
                        <label>Add a friend</label>
                        <div className="flex gap-3 w-full mt-2">
                            <input className="border border-solid border-[#A4A4A4] rounded-lg pl-2 w-10/12" type="text" name="addFriend" placeholder="---" />
                            <button className="inline-block" type="submit">
                                <img src="./icons/addPlus.png" alt="Agregar amigo" />
                            </button>
                        </div>
                    </form>

                    <form className="w-full my-4" onSubmit={handleDeleteFriend}>
                        <label>Delete a friend</label>
                        <div className="flex gap-3 w-full mt-2">
                            <input className="border border-solid border-[#A4A4A4] rounded-lg pl-2 w-10/12" type="text" name="deleteFriend" placeholder="---" />
                            <button className="inline-block" type="submit">
                                <img src="./icons/rubbish.png" alt="Agregar amigo" />
                            </button>
                        </div>
                    </form>
                </article>

                <article className="w-full">
                    <h3 className="font-bold">Friend requests</h3>

                    {userFriendsRequests.map((userFriendRequest, index) => <FriendRequestCard
                        key={index}
                        userFriendRequest={userFriendRequest}
                        onFriendAdded={() => {
                            setForceUpdate(prevState => !prevState)
                            setUserFriendsRequests(updatedRequests => updatedRequests.filter(request => request !== userFriendRequest));
                            setUserFriends(updatedFriends => [...updatedFriends, userFriendRequest])
                        }}
                        onFriendDeleted={() => {
                            setForceUpdate(prevState => !prevState);
                            setUserFriendsRequests(updatedRequests => updatedRequests.filter(request => request !== userFriendRequest))
                        }}
                    />)}

                </article>
            </section>
        </main>
        <Footer user={user} />
    </div>
}