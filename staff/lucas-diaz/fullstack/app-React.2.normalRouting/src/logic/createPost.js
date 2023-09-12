import { validators } from 'com'
const { validateToken, validateUrl, validateText } = validators

export default function createPost(token, image, text) {
    validateToken(token);
    validateUrl(image);
    validateText(text);

    return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ image, text })
    })
        .then(res => {
            if (res.status !== 201) {
                return res.json().then(({ error: message }) => { throw new Error(message) })
            }
        })
        
}