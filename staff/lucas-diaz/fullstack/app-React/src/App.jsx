import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Alert from "./components/Alert";
import AppContext from "./AppContext";
import CreateCube from "./components/CreateCube";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import isUserLoggedIn from "./logic/isUserLoggedIn.js"

const { Provider } = AppContext


export default function App() {
  const [feedback, setFeedback] = useState(null)
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  const handleAcceptAlert = () => setFeedback(null)
  const freeze = () => setLoader(true);
  const unFreeze = () => setLoader(false);


  return <Provider value={{ Alert: setFeedback, freeze, unFreeze, navigate }}>
    <Routes>
      <Route path="/login" element={isUserLoggedIn() ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={isUserLoggedIn() ? <Navigate to="/" /> : <Register />} />
      <Route path="/" element={isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />
    </Routes>

    {feedback && <Alert message={feedback} onAccept={handleAcceptAlert} />}
    {loader && <CreateCube />}
  </Provider>
}