import React from 'react';
import { NavLink, } from 'react-router-dom'

function TopNavbar() {
    return (
        <div>
            <div className="nav-container">
                <ul className="top-nav">
                <li className="nav-item"><NavLink className="nav-item" to="/">5-Day Forecast</NavLink></li>
                <li className="nav-item"><NavLink className="nav-item" to="/daily">Daily Forecast</NavLink></li>
                <li className="nav-item"><NavLink className="nav-item" to="/extended">Extended Forecast</NavLink></li>
                </ul>
            </div>
            <div className="home-container">
                <NavLink to="/"><img className="logo" src="https://upload.wikimedia.org/wikipedia/en/4/4a/Logo_for_the_Web_Channel_Channel_5.jpeg"></img></NavLink>
                <NavLink className="home-text" to="/">Channel 5 Weather</NavLink>
            </div>
        </div>
    )
}

export default TopNavbar