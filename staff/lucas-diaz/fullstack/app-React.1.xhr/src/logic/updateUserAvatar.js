import { validators } from 'com'
const { validateToken, validateUrl } = validators

export default function updateUserAvatar(token, avatarUrl, callback) {
    validateToken(token);
    validateUrl(avatarUrl);

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


    xhr.open('PATCH', `${import.meta.env.VITE_API_URL}/users/avatar`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    let data = {avatar: avatarUrl}
    let json = JSON.stringify(data)

    xhr.send(json)
}
