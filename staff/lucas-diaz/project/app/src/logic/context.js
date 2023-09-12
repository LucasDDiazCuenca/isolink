const context = {
    set token (token){
        if(!token){
            delete sessionStorage.token
            return
        }
        sessionStorage.token = token
    },
    get token(){
        return sessionStorage.token
    }
}


export default context