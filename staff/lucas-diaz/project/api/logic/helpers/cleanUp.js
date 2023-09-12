const { User, Avatar } = require("../../data/models")

module.exports = async function cleanUp(){
    await Promise.all([User.deleteMany(), Avatar.deleteMany()])
}
