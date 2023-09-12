import {validators} from "com"
import context from "./context"
const {validateText} = validators

export default function createAvatar( model, name, personality, age, hair, skin, shirt, trousers, shoes, emotions) {
    validateText(model)
    validateText(name)
    validateText(personality)
    validateText(age)
    validateText(hair)
    validateText(skin)
    validateText(shirt)
    validateText(trousers)
    validateText(shoes)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/avatar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${context.token}`
            },
            body: JSON.stringify({ model, name, personality, age, hair, skin, shirt, trousers, shoes, emotions })
        })

        if(res.status !== 204){
            const { message } = await res.json()
            throw new Error(message)
        }

        return
    })()
}