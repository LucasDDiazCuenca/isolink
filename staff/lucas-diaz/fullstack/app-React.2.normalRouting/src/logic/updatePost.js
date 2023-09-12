import { validators } from 'com'
const { validateId, validateText, validateUrl, validateToken } = validators

export default function updatePost(token, postId, image, text) {
    validateToken(token)
    validateId(postId)
    validateUrl(image)
    validateText(text)

    return fetch(`${import.meta.env.VITE_API_URL}/posts/update/${postId}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({image, text})
    })
        .then(res => {
            if (res.status !== 204) {
                return res.json().then(({ error: message }) => { throw new Error(message) })
            }
        })
}