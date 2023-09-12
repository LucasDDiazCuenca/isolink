import { validators } from 'com'
const { validateEmail, validatePassword } = validators

export default function authenticateUser(email, password, callback) {
    validateEmail(email);
    validatePassword(password);


    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr

        if (status !== 202) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))
            return
        }
        
        const { response: json } = xhr
        const { token } = JSON.parse(json)
        console.log(token)
        callback(null, token)
    }

    xhr.onerror = () => {
        callback(new Error('connection error'))
    }


    xhr.open('POST', `${import.meta.env.VITE_API_URL}/users/auth`)
    xhr.setRequestHeader('Content-Type', 'application/json')

    const user = { email, password }
    const json = JSON.stringify(user)

    xhr.send(json)
}