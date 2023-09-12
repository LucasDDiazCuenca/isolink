import { validators } from 'com'
import context from "./context"
const { validateText } = validators

export default function deleteFriendRequest(requestedUsername) {
    validateText(requestedUsername)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/delete-friend-request`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${context.token}`
            },
            body: JSON.stringify({ requestedUsername })
        })

        if (res.status !== 204) {
            const { message } = await res.json()
            throw new Error(message)
        }

        return
    })()
}