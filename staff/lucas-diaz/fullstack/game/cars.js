const fs = require('fs');

const STEP = 3, LAPSE = 100

class Car {
    constructor(emoji) {
        this.emoji = emoji;
        this.position = 0;
        this.time = 0;
    }

    moveForward() {
        const random = STEP * (1 - Math.random());
        this.position += random;
    }

    render() {
        let end = " ".repeat(100) + "|";
        let marker = " ".repeat(this.position) + this.emoji + end.slice(this.position + 1);

        console.log("|" + marker);
    }

    status() {
        const result = {
            icon: this.emoji,
            endPosition: this.position,
            finalTime: this.time
        }

        return result;
    }
}

let taxi = new Car('🚖');
let redCar = new Car('🚘');
let policeCar = new Car('🚔');

let time = 0;

const intervalId = setInterval(() => {
    console.clear();
    time += LAPSE
    console.log("  " + "-".repeat(100))

    if (taxi.position <= 100) {
        taxi.render();
        taxi.moveForward();
        taxi.time = time;
    }
    if (redCar.position <= 100) {
        redCar.render();
        redCar.moveForward();
        redCar.time = time;
    }
    if (policeCar.position <= 100) {
        policeCar.render();
        policeCar.moveForward();
        policeCar.time = time;
    }
    console.log("  " + "-".repeat(100))

    if (taxi.position >= 100 && redCar.position >= 100 && policeCar.position >= 100) {
        clearInterval(intervalId)
        const taxiResult = taxi.status()
        const redCardResult = redCar.status()
        const policeCarResult = policeCar.status()

        const results = []
        results.push(taxiResult, redCardResult, policeCarResult)
        console.log(results)

        const content = JSON.stringify(results)

        fs.writeFile('/Users/lucasdiaz/workspace/isdi-parttime-202303/staff/lucas-diaz/fullstack/game/results.txt', content, err => {
            if (err) {
                console.error(err);
            }
            // file written successfully
        });
    }

}, LAPSE);


// OBJETIVO ESCRIBIR LOS RESULTADOS EN UN ARCHIVO -->  DONE ✅

