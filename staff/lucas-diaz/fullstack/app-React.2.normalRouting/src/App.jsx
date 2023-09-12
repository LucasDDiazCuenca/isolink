import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { context } from "./ui";
import Alert from "./components/alert";
import Context from "./Context"; 
import CreateCube from "./components/CreateCube";

export default function App() {
  const [view, setView] = useState(context.token ? "home" : "login")
  const [feedback, setFeedback] = useState(null)
  const [loader, setLoader] = useState(false)

  const handleGoToRegister = () => setView("register")
  const handleGoToLogin = () => setView("login");
  const handleGoToHome = () => setView("home");
  const handleAcceptAlert = () => setFeedback(null)
  const freeze = () => setLoader(true);
  const unFreeze = () => setLoader(false);


  return <Context.Provider value={{ alert: setFeedback, freeze, unFreeze}}>
    {view === "login" && <Login onRegisterClick={handleGoToRegister} onUserLogedin={handleGoToHome} />}
    {view === "register" && <Register onLoginClick={handleGoToLogin} onUserRegistered={handleGoToLogin} />}
    {view === "home" && <Home onLogOutClick={handleGoToLogin} />}
    {feedback && <Alert message={feedback} onAccept={handleAcceptAlert} />}
    {loader && <CreateCube/>}
  </Context.Provider>
}