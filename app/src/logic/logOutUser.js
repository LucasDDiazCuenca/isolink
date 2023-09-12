import context from "./context"

export default function logOutUser() {
    context.token = null
}