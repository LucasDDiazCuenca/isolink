import { validators } from 'com'
const { validateId, validateToken } = validators

export default function toggleSavePostInUser(token, postId) {
    validateToken(token)
    validateId(postId)

    return fetch(`${import.meta.env.VITE_API_URL}/users/save/${postId}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            if (res.status !== 204) {
                return res.json().then(({ error: message }) => { throw new Error(message) })
            }
        })
}