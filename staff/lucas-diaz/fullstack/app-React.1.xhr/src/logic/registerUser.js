import { validators } from 'com'
const { validateEmail, validateUsername, validatePassword } = validators

export default function registerUser(name, email, password, callback) {
    validateUsername(name)
    validateEmail(email)
    validatePassword(password)

    // hacemos una peticion a la api pot XMLHttpRequest
    const xhr = new XMLHttpRequest

    // donde gestionamos la atencion de la respuesta 
    xhr.onload = () => {
        const { status } = xhr // Sacamos el estatus de xhr para evaluarlo abajo siempre se comprueba lo primero 

        //si hay error lo gestionamos aqui, buscamos algo que no sea un estatus favorabl
        if (status !== 204) {
            const { response: json } = xhr
            const { error } = JSON.parse(json)

            callback(new Error(error))
            return
        }
        // si el registro fue bien, no devuelve body, solamente estado, por eso ponemos null
        callback(null)
    }

    xhr.onerror = () => {
        callback(new Error('connection error'))
    }

    //miramos en el server si es pot/get/... y luego miramos bien la ruta 
    xhr.open('POST', `${import.meta.env.VITE_API_URL}/users`)

    //tenemos que enviar un header si o si y lo ponemos aqui --> especificamos el contenido de lo que se pretende enviar 
    xhr.setRequestHeader('Content-Type', 'application/json')

    //configuramos el body-json que le queremos enviar 
    const user = { name, email, password }
    const json = JSON.stringify(user)

    //le enviamos el objeto stringifeado (json) a la api, lo que necesita pa currar --> esto es como el body de lo que le enviamos desde client --> server desde insomnia, mas arriba lo va a gestionar. 
    xhr.send(json)
}