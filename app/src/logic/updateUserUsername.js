import { validators } from 'com'
import context from "./context"
const { validateText } = validators

export default function updateUserUsername(newUsername) {
    validateText(newUsername)


    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/username`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${context.token}`
            },
            body: JSON.stringify({ newUsername })
        })

        if (res.status !== 204) {
            const { message } = await res.json()
            throw new Error(message)
        }

        return
    })()
}