function generateRandomHexColor() {
    // Generamos 3 números aleatorios entre 0 y 255
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);

    // Convertimos los números a hexadecimales
    var hexR = r.toString(16);
    var hexG = g.toString(16);
    var hexB = b.toString(16);

    // Agregamos el prefijo '#'
    return '#' + hexR + hexG + hexB;
}

function generatePassword() {
    // Lista de caracteres permitidos
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    //password regex 
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    // Generamos un password de longitud aleatoria entre 8 y 12 caracteres
    const length = Math.floor(Math.random() * 4) + 8;

    // Generamos un password aleatorio
    let password = "";
    for (let i = 0; i < length; i++) {
        password += characters[Math.floor(Math.random() * characters.length)];
    }

    // Verificamos que el password cumpla la regex
    if (!passwordRegex.test(password)) {
        return generatePassword();
    }

    // Devolvemos el password
    return password;
}

function generateAvatarModel() {
    return Math.random() < 0.5 ? "./models/boy.glb" : "./models/girl.glb"
}

module.exports = {
    generateRandomHexColor,
    user: () => ({
        _id: `post-${Math.random()}`,
        name: `name-${Math.random()}`,
        email: `email-${Math.random()}@mail.com`,
        password: generatePassword(),
        avatar: false,
        friends: [],
        friendRequests: [],
        connected: false,
    }),

    avatar: () => ({
        _id: `post-${Math.random()}`,
        model: generateAvatarModel(),
        name: `name-${Math.random()}`,
        personality: `personality-${Math.random()}`,
        age: `age-${Math.random()}`,
        hair: generateRandomHexColor(),
        skin: generateRandomHexColor(),
        shirt: generateRandomHexColor(),
        trousers: generateRandomHexColor(),
        shoes: generateRandomHexColor(),
        emotions: []
    })
}
