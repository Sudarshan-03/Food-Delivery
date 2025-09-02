import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = ({ handleLogout }) => {
    return (
        <div className='navbar'>
            <img src={assets.logo2} className='logo' alt="" />
            <div className="navbar-right">
                <img src={assets.profile_image} className='profile' alt="" />
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
        </div>
    );
}

export default Navbar;