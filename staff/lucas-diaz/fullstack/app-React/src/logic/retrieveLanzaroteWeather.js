

export default function retrieveLanzaroteWeather() {
    return fetch("https://api.openweathermap.org/data/2.5/weather?lat=28.96129906535264&lon=-13.553940113479198&appid=26fb0678db44629f04dc85a19d221f38", {
        method: "GET",
    })
        .then(res =>  res.json())
}
