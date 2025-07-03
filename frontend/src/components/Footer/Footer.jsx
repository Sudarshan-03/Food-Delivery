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
                <Link to = '/' onClick={()=>setMenu("Home")} className={menu=="Home"?"active":" "}><img className='logo2'src={assets.logo3} alt="" /></Link>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium doloremque doloribus dolor eveniet animi voluptas modi nobis, obcaecati mollitia pariatur magnam maiores, sapiente fugit excepturi repellendus rerum quod! Numquam laborum sed distinctio adipisci natus, deleniti alias quisquam minus consectetur repellat eveniet labore! Ipsum ad quisquam maiores, accusantium eveniet voluptatem dignissimos.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook} alt="" />
                     <img src={assets.youtube} alt="" />
                    <img src={assets.linkedin} alt="" />
                    <img src={assets.instagram} alt="" />
                   
                </div>
            </div>
            <div className="footer-content-center">
                <h2>Company</h2>
                <ul>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Careers</li>
                    <li>Blog</li>
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