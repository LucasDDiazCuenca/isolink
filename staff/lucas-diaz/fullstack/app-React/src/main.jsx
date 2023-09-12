import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css'
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <App />
    </Router>
)

//  <React.StrictMode> meter el <App/> dentro </React.StrictMode>

