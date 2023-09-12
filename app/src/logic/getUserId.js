import context from "./context"


function extractPayloadFromToken(token) {
    return JSON.parse(atob(token.split('.')[1]))
}

export default function getUserId() {
    const { sub } = extractPayloadFromToken(context.token)
    return sub
}
