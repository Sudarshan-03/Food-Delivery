import React ,{ useState} from 'react'
import { assets } from '../../assets/assets'
import './Footer.css'
import { Link } from 'react-router-dom'
// Remove menu and setMenu import; expect them as props instead
const Footer = ({ menu, setMenu }) => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <div className="footer-logo-text">
                    <Link to='/' onClick={() => setMenu("Home")} className={menu=="Home" ? "active" : ""}>
                        <img className='logo2' src={assets.logo3} alt="" />
                    </Link>
                    <p>We are passionate about delivering fresh, delicious meals right to your doorstep. Our mission is to make dining easy, enjoyable, and accessible to everyone. With a dedicated team and a commitment to quality, we ensure every order meets the highest standards of taste and service.</p>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>Company</h2>
                <ul>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <li><Link to="/careers">Careers</Link></li>
                    <li><a href="/admin">Admin Login</a></li>
                    {/* <li><Link to="/blog">Blog</Link></li> */}
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get In Touch</h2>
                <ul>
                    <li>+91 9358073903</li>
                    <li>Email: firstbites@ZestyBites.in </li>
                </ul>
                 <div className="footer-social-icons-call">
                   
                     <img src={assets.call} alt="" />
                      <img src={assets.email} alt="" />
                     </div>
            </div>
            
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2025 © ZestyBites. All rights reserved. </p>
    </div>
  )
}

export default Footer