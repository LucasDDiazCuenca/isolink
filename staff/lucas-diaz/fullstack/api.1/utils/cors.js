
module.exports = (req, res, next) => {
    //Estas 2 de abajo son cabeceras (headers)
    res.setHeader("Access-Control-Allow-Origin", "*") //acepta llamadas de cualquier ruta
    res.setHeader("Access-Control-Allow-Headers", "*") //permite cualquier tipo de header
    res.setHeader("Access-Control-Allow-Methods", "*") //nos permite acceder a todos los metodos que no sean get y post (patch)
    //sirve para avisar que aqui hemos terminado, que continue con la peticion corresp
    next()
}