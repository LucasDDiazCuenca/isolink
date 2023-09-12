import { validators } from 'com'
const { validateEmail, validateUsername, validatePassword } = validators

export default function registerUser(name, email, password) {
    validateUsername(name)
    validateEmail(email)
    validatePassword(password)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })

        if(res.status !== 204){
            const { message } = await res.json()
            throw new Error(message)
        }

        return
    })()
}