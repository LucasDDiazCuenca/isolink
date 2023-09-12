import { useState } from "react";
import addFriend from "../../logic/addFriend"
import deleteFriendRequest from "../../logic/deleteFriendRequest.js"
import ToastFail from "../ToastFail";
import ToastSuccess from "../ToastSuccess";


export default function FriendRequestCard({ userFriendRequest, onFriendAdded, onFriendDeleted }) {
    const [failMessage, setFailMessage] = useState(null)
    const [successMessage, setSuccessMessage] = useState(null)

    const handleAddFriend = async () => {
        try {
            await addFriend(userFriendRequest)

            setSuccessMessage("friend added correctly")
            setTimeout(() => {
                setSuccessMessage(null)
            }, 2000)

            setTimeout(() => {
                onFriendAdded()
            },2500)
        } catch (error) {
            setFailMessage(error.message)

            setTimeout(() => {
                setFailMessage(null)
            }, 2000)
        }
    };

    const handleDeleteFriendRequest = async () => {
        try {
            await deleteFriendRequest(userFriendRequest)

            setSuccessMessage("friend request deleted correctly")
            setTimeout(() => {
                setSuccessMessage(null)
            }, 2000)
            setTimeout(() => {
                onFriendDeleted()
            },2500)
        } catch (error) {
            setFailMessage(error.message)

            setTimeout(() => {
                setFailMessage(null)
            }, 2000)
        }
    }

    return <div>
        {successMessage && <ToastSuccess message={successMessage} />}
        {failMessage && <ToastFail message={failMessage} />}
        <div className="flex justify-between items-center my-3">
            <p>{userFriendRequest}</p>
            <div className="flex items-center justify-between w-3/12">
                <button className="inline-block w-8 h-8" onClick={handleAddFriend}>
                    <img src="./icons/addFriend.png" alt="add friend button" />
                </button>
                <button className="inline-block w-8 h-8" onClick={handleDeleteFriendRequest}>
                    <img src="./icons/deleteFriend.png" alt="delete friend request button" />
                </button>
            </div>
        </div>
        <hr />
    </div>
}