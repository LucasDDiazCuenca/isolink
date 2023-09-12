import { validators } from 'com'
import context from "./context"
const { validateId } = validators

export default function deletePost(postId) {
    validateId(postId)

    return fetch(`${import.meta.env.VITE_API_URL}/posts/delete/${postId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${context.token}`
        }
    })
        .then(res => {
            if (res.status !== 204) {
                return res.json().then(({ error: message }) => { throw new Error(message) })
            }
        })
}
