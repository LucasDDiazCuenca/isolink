import { validators } from 'com'
import context from "./context"

const { validateUrl } = validators

export default function updateUserAvatar(avatarUrl) {
    validateUrl(avatarUrl);

    return fetch(`${import.meta.env.VITE_API_URL}/users/avatar`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${context.token}`
        },
        body: JSON.stringify({ avatar: avatarUrl })
    })
        .then(res => {
            if (res.status !== 204) {
                return res.json().then(({ error: message }) => { throw new Error(message) })
            }
        })
}
