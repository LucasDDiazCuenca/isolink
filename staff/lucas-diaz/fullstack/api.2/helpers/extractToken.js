module.exports = function extractToken(req){
    const { authorization } = req.headers
    const token = authorization.slice(7)
    return token
}