import { validators } from 'com'
import context from "./context"
const { validatePassword } = validators

export default function updateUserPassword(password, newPassword, newPasswordConfirmation) {
    validatePassword(password)
    validatePassword(newPassword)
    validatePassword(newPasswordConfirmation)


    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${context.token}`
            },
            body: JSON.stringify({ password, newPassword, newPasswordConfirmation })
        })

        if (res.status !== 204) {
            const { message } = await res.json()
            throw new Error(message)
        }

        return
    })()
}