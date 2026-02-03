import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = ({ handleLogout }) => {
    return (
        <div className='navbar'>
            <a href="https://food-delivery-snowy-nu.vercel.app/" target="_blank" rel="noopener noreferrer">
                <img src={assets.logo2} className="logo" alt="ZestyBites" />
            </a>
            <div className="navbar-right">
                <img src={assets.profile_image} className='profile' alt="" />
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
        </div>
    );
}

export default Navbar;
