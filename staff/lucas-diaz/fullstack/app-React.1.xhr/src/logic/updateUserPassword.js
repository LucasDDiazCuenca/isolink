import { validators } from 'com'
const { validatePassword, validateToken } = validators

export default function updateUserPassword(token, password, newPassword, newPasswordConfirmation, callback) {
    validatePassword(password)
    validatePassword(newPassword)
    validatePassword(newPasswordConfirmation)
    validateToken(token)

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr

        if (status !== 204) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))
            return
        }

        callback(null)
    }


    xhr.onerror = () => {
        callback(new Error('connection error'))
    }


    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/password`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    let data = { password, newPassword, newPasswordConfirmation }

    let json = JSON.stringify(data)

    xhr.send(json)
}
