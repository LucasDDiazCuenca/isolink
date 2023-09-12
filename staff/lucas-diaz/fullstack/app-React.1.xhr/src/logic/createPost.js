import { validators } from 'com'
const { validateToken, validateUrl, validateText } = validators

export default function createPost(token, image, text, callback) {
    validateToken(token);
    validateUrl(image);
    validateText(text);

    const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status } = xhr

        if (status !== 201) {
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


    xhr.open('POST', `${import.meta.env.VITE_API_URL}/posts`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', `Bearer ${token}`)


    let data = { image, text }
    let json = JSON.stringify(data)

    xhr.send(json)
}