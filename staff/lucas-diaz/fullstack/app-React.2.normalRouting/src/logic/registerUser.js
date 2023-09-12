import { validators } from 'com'
const { validateEmail, validateUsername, validatePassword } = validators

export default function registerUser(name, email, password) {
    validateUsername(name)
    validateEmail(email)
    validatePassword(password)

    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    })
        .then(res => {
            if (res.status !== 204) {
                return res.json().then(({ error: message }) => { throw new Error(message) })
            }
        })
}