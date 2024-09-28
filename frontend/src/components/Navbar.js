import React from 'react'
import './Navbar.css'
import Map from "./Map";
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className = 'navbar'>
            <img src = "" alt = "" className = 'logo' />
            <ul>
                <li>Profile</li>
                {/* <li>Map</li> */}
                <li><Link to="/map">Map</Link></li>
                <li>Queue</li>
            </ul>
            <img src ="" alt = "" className = 'toggle-icon' />
        </div>
    )

}

export default Navbar;

