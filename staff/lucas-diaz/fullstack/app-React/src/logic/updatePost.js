import { validators } from 'com'
import context from "./context"

const { validateId, validateText, validateUrl } = validators

export default function updatePost(postId, image, text) {
    validateId(postId)
    validateUrl(image)
    validateText(text)

    return fetch(`${import.meta.env.VITE_API_URL}/posts/update/${postId}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify({image, text})
    })
        .then(res => {
            if (res.status !== 204) {
                return res.json().then(({ error: message }) => { throw new Error(message) })
            }
        })
}