import { validators } from 'com'
const { validateId, validateToken } = validators

export default function toggleSavePostInUser(token, postId, callback) {
    validateToken(token)
    validateId(postId)

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


    xhr.open("PATCH", `${import.meta.env.VITE_API_URL}/users/save/${postId}`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()


}