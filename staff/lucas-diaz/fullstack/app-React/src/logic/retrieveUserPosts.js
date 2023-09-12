import context from "./context"

export default function retrieveUserPosts() {
    return fetch(`${import.meta.env.VITE_API_URL}/posts/users`, {
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


