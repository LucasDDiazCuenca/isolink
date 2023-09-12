import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import EditProfile from "./pages/EditProfile"
import Friends from "./pages/Friends"
import Avatar from "./pages/Avatar"
import AppContext from "./AppContext"
import World from "./pages/World"
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import isUserLoggedIn from "./logic/isUserLoggedIn"
import { useState } from "react"


const { Provider } = AppContext

function App() {
  const navigate = useNavigate()
  const [avatars, setAvatars] = useState([])

  return <Provider value={{ navigate, avatars, setAvatars }}>
    <Routes>
      <Route path="/login" element={isUserLoggedIn() ? <Navigate to="/" /> : <Login />} />

      <Route path="/register" element={isUserLoggedIn() ? <Navigate to="/" /> : <Register />} />

      <Route path="/" element={isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />

      <Route path="/profile" element={isUserLoggedIn() ? <EditProfile /> : <Navigate to="/login" />} />

      <Route path="/friends" element={isUserLoggedIn() ? <Friends /> : <Navigate to="/login" />} />

      <Route path="/avatar" element={isUserLoggedIn() ? <Avatar /> : <Navigate to="/login" />} />

      <Route path="/world" element={isUserLoggedIn() ? <World /> : <Navigate to="/login" />} />
    </Routes>
  </Provider>
}

export default App
