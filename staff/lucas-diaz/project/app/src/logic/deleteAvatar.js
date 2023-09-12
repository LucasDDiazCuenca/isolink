import context from "./context"

export default function deleteAvatar(){
    return (async() => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/avatar`, {
            method: "DELETE",
            headers:{
                Authorization: `Bearer ${context.token}`
            }
        })

        if(res.status !== 200){
            const {message} = await res.json()
            throw new Error(message)
        }

        return
    })()

}