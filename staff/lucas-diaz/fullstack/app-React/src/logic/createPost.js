import { validators } from 'com'
import context from "./context"
const {validateUrl, validateText } = validators

export default function createPost(image, text) {
    validateUrl(image);
    validateText(text);

    return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${context.token}`,
        },
        body: JSON.stringify({ image, text })
    })
        .then(res => {
            if (res.status !== 201) {
                return res.json().then(({ error: message }) => { throw new Error(message) })
            }
        })
}