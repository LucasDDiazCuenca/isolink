import context from "./context"

export default function retrievePosts() {
    return fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${context.token}`
        }
    })
        .then(res => {
            if (res.status !== 200) {
                return res.json().then(({ error: message }) => { throw new Error(message) })
            }
            return res.json()
        })
}

