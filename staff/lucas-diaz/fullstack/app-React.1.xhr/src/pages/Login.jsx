import { context } from "../ui.js";
import authenticateUser from "../logic/authenticateUser.js"
import { useState, useEffect } from "react";
import retrieveLanzaroteWeather from "../logic/retrieveLanzaroteWeather.js"
import Form from "../components/library/Form.jsx"
import Plane3dFigure from "../components/library/Plane3dFigure.jsx";


export default function Login(props) {
    const [errorMessage, setErrorMessage] = useState("");
    const [weatherMessage, setWeatherMessage] = useState();

    useEffect(() => {
        try {
            retrieveLanzaroteWeather((error, weather) => {
                if (error) {
                    alert(error.message)
                    return
                }
                setWeatherMessage(`We're in ${weather.name}, with ${Math.round(weather.main.temp - 273.15)} celsius grades of temperature, but it actually feels like ${Math.round(weather.main.feels_like - 273.15)} grades. In terms of forecast, we are in presence of ${weather.weather[0].main}.`)
            })
        } catch (error) {
            alert(error.message)
        }
    }, [])


    function handleRegisterClick(event) {
        event.preventDefault();
        props.onRegisterClick();
    }

    function handleLogin(event) {
        event.preventDefault();

        const email = event.target.email.value 
        const password = event.target.password.value 

        try {
            authenticateUser(email, password, (error, token) => {
                if (error) {
                    setErrorMessage(error.message)
                    return;
                }

                context.token = token;
                console.log(token)
                props.onUserLogedin();

            })
        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    return <>
        <div className="container">
            <section className="h-1/2 z-10">
                <h1 className="app-h1">LOG IN</h1>

                {errorMessage && <p className="fail-warning text-center red">{errorMessage}</p>}
                <Form onSubmit={handleLogin}>
                    <div className="box-input">
                        <label>Your email</label>
                        <input type="email" className="basis-full rounded-md pl-2 text-emerald-800" name="email" placeholder="Enter email" autoComplete="current-password" />
                    </div>
                    <div className="box-input">
                        <label>Your password</label>
                        <input type="password" className="basis-full rounded-md pl-2 text-emerald-800" name="password" placeholder="Enter password" autoComplete="current-password" />
                    </div>
                    <div className="mt-4 basis-full flex items-center justify-around">
                        <div>
                            <input type="checkbox" name="remember" className="mr-2" id="log-in-checkbox" />
                            <label htmlFor="log-in-checkbox">Remember me</label>
                        </div>
                        <a className="forgot-password-anchor green" href="">Forgot password?</a>
                    </div>
                    <button type="submit" className="form-button active:green">LOG IN</button>

                    <p className="text-white text-center basis-full ">
                        Not a member? <a href="" onClick={handleRegisterClick} className="login-register-anchor green">register here</a>
                    </p>
                </Form>
                <p className="weather-message text-white text-center m-8 text-sm">{weatherMessage}</p>
            </section>
        </div>
        <Plane3dFigure/>
    </>
}