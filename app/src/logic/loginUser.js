import { validators } from 'com'
import context from "./context"



const { validateEmail, validatePassword } = validators

export default function loginUser(email, password) {
    validateEmail(email);
    validatePassword(password);


    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        if (res.status !== 202) {
            const { message } = await res.json()

            throw new Error(message)
        }

        const { token } = await res.json() //esto es porque lo tenemos en un objeto, si no, no deberia de ir desrtucturado

        context.token = token

        return

    })()
}