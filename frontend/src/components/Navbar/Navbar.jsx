import React, { useState, useContext, useEffect } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");

  const { getTotalCartAmount, token, setToken, user, setSearchTerm } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    navigate('/');
  }
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const nextTheme = !prev;
      localStorage.setItem("theme", nextTheme ? "dark" : "light");
      return nextTheme;
    });
  };

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDark);
    document.body.classList.toggle('dark-mode', isDark);
  }, [isDark]);

  return (
    <div className='navbar'>
      <Link to='/' ><img src={assets.logo2} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("Home")} className={menu == "Home" ? "active" : " "}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("Menu")} className={menu == "Menu" ? "active" : " "}>Menu</a>
        <a href='#app-download' onClick={() => setMenu("Mobile-App")} className={menu == "Mobile-App" ? "active" : " "}>Mobile-App</a>
        <a href='#footer' onClick={() => setMenu("Contact Us")} className={menu == "Contact Us" ? "active" : " "}>Company </a>
      </ul>
      <div className="navbar-right">
        { /* Search Icon and Input */}
        <div className="navbar-search-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const element = document.getElementById('food-display');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className="navbar-search-input"
            />
          </div>
          {/* <img src={assets.search_icon} alt="" /> */}
        </div>

        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>

          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        <div>
          <button onClick={toggleTheme} className="theme-toggle-btn">
            <img
              src={isDark ? assets.dark : assets.light}
              alt="Toggle theme"
              className="theme-icon"
            />
          </button>
        </div>
        {!token ? <button className='ass' onClick={() => setShowLogin(true)}>Sign In</button>
          : <div className='navbar-profile'>
            <Link to='/profile'><img src={assets.profile_icon} alt="" /></Link>

          </div>}

      </div>
    </div>
  )
}

export default Navbar