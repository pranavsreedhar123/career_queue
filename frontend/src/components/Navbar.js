import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.png'; // Adjust the path based on your project structure

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className='navbar'>
            {/* Add the logo */}
            <img src={logo} alt="Logo" className='logo' />
            <ul>
                <li onClick={() => navigate('/')}>Profile</li>
                <li onClick={() => navigate('/map')}>Map</li>
                <li onClick={() => navigate('/queue')}>Queue</li>
            </ul>
            <img src="" alt="" className='toggle-icon' />
        </div>
    );
};

export default Navbar;
