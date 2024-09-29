import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className='navbar'>
            <img src="" alt="" className='logo' />
            <ul>
                <li onClick={() => navigate('/')}> Profile</li>
                <li onClick={() => navigate('/map')}>Map</li>
                <li onClick={() => navigate('/queue')}>Queue</li>
            </ul>
            <img src="" alt="" className='toggle-icon' />
        </div>
    )

}

export default Navbar;

