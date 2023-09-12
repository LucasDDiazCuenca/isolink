import { validators } from 'com'
const { validateToken } = validators

export default function retrieveSavedPosts(token, callback) {
    validateToken(token);

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr

        if (status !== 200) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))
            return
        }

        const { response: json } = xhr
        const posts = JSON.parse(json)

        callback(null, posts)
    }

    xhr.onerror = () => {
        callback(new Error('connection error'))
    }

    xhr.open('GET', `${import.meta.env.VITE_API_URL}/posts/saved`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()
}