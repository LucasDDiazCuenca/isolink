import { validators } from 'com'
import  context  from "./context"



const { validateEmail, validatePassword } = validators

export default function loginUser(email, password) {
    validateEmail(email);
    validatePassword(password);

    return fetch(`${import.meta.env.VITE_API_URL}/users/auth`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => {
            if (res.status !== 202) {
                return res.json().then(({ error: message }) => { throw new Error(message) })
            }
            return res.json()
        })
        .then(({ token }) => token)
        .then(token => {
            context.token = token
        })
}