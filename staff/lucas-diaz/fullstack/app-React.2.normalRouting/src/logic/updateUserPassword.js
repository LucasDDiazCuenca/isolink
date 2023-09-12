import { validators } from 'com'
const { validatePassword, validateToken } = validators

export default function updateUserPassword(token, password, newPassword, newPasswordConfirmation) {
    validatePassword(password)
    validatePassword(newPassword)
    validatePassword(newPasswordConfirmation)
    validateToken(token)

    return fetch(`${import.meta.env.VITE_API_URL}/users/password`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ password, newPassword, newPasswordConfirmation })
    })
        .then(res => {
            if (res.status !== 204) {
                return res.json().then(({ error: message }) => { throw new Error(message) })
            }
        })
}
