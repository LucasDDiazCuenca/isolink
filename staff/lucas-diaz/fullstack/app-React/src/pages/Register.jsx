import registerUser from "../logic/registerUser.js"
import React, { useState } from "react";
import Form from "../components/library/Form.jsx";
import Plane3dFigure from "../components/library/Plane3dFigure.jsx";
import { Link } from "react-router-dom"
import { useAppContext } from "../hooks"



export default function Register() {
    const [errorMessage, setErrorMessage] = useState("");
    const { navigate } = useAppContext()


    function handleRegister(event) {
        event.preventDefault();

        const temporalUserName = event.target.name.value;
        const temporalEmail = event.target.email.value;
        const temporalPassword = event.target.password.value;

        try {
            registerUser(temporalUserName, temporalEmail, temporalPassword)
                .then(() => navigate("/login"))
                .catch(error => alert(error.message))

            event.target.reset();

        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    return <>
        <div className="container">
            <section className="h-1/2 z-20">
                <h1 className="app-h1">REGISTER</h1>
                {errorMessage && <p className="fail-warning red text-center">{errorMessage}</p>}
                <Form onSubmit={handleRegister}>
                    <div className="box-input">
                        <label>Your username:</label>
                        <input type="text" className="basis-full rounded-md pl-2 text-emerald-800" name="name" placeholder="Enter username" />
                    </div>
                    <div className="box-input">
                        <label>Your email:</label>
                        <input type="email" className="basis-full rounded-md pl-2 text-emerald-800" name="email" placeholder="Enter email"
                            autoComplete="current-password" />
                    </div>
                    <div className="box-input">
                        <label>Your password:</label>
                        <input type="password" name="password" placeholder="Enter password" className="basis-full rounded-md pl-2 text-emerald-800"
                            autoComplete="current-password" />
                    </div>
                    <button type="submit" className="form-button active:green">SIGN UP</button>
                    <p className="basis-full text-center pt-2">
                        Alreaddy logged?<Link className="register-login-anchor green" to="/login">Go to login!</Link>
                    </p>
                </Form>
            </section>
        </div>
        <Plane3dFigure />
    </>
}