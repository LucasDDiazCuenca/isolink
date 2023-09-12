require("dotenv").config()
const { readFile, writeFile } = require("fs")
const {validators: {validateId, validateUrl} } = require("com")

module.exports = function updateUserAvatar(userId, avatar, callback) {
    validateId(userId)
    validateUrl(avatar)


    readFile(`${process.env.DB_PATH}/users.json`,  (error, json) => {
        if (error){
            callback(error)
            return
        }

        const users = JSON.parse(json)
        let foundUser = users.find(user => user.id === userId)

        if(!foundUser){
            callback(new Error("user not found"))
            return
        }

        foundUser.avatar = avatar;
        json = JSON.stringify(users, null, 4)

        writeFile(`${process.env.DB_PATH}/users.json`, json,  error => {
            if(error){
                callback(error)
                return
            }
            callback(null)
        })
    } )








/*     findUserById(authenticatedUserId, foundUser => {
        
        if (!foundUser){
            callback(new Error("user not found"));
            return;
        } 
    
        foundUser.avatar = avatarUrl;
        
        saveUser(foundUser, () => callback(null));
    }); */
}