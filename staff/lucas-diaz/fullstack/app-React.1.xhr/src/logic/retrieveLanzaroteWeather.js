

export default function retrieveLanzaroteWeather(callback) {
    console.log("Render --> lanzarote weather")
    var xhr = new XMLHttpRequest

    xhr.onload = () => {
        const payload = JSON.parse(xhr.response)

        callback(null, payload)
    }

    xhr.onerror = () => {
        callback(new Error("conection error"));
    }


    xhr.open("GET", "https://api.openweathermap.org/data/2.5/weather?lat=28.96129906535264&lon=-13.553940113479198&appid=26fb0678db44629f04dc85a19d221f38")
    xhr.send()
}
