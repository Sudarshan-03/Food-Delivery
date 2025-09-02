import React from 'react'
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/cart';
import PlaceOrder from './pages/PlaceOrder/placeorder';
import { useState } from 'react';
import LoginPopUp from './components/LoginPopUp/LoginPopUp';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
//import { Navigate } from 'react-router-dom';
import AboutUs from "./pages/AboutUs/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import Careers from "./pages/Careers/Careers";
//import Blog from "./pages/Blog/Blog";
  
import { useEffect } from 'react';
import { toast } from 'react-toastify';

 const App = () => {
  const [showLogin, setShowLogin] = useState(() => {
    const user = localStorage.getItem("user");
    return !user; // show login popup if no user is stored
  });

   return (
    <> 
    {showLogin?<LoginPopUp setShowLogin={setShowLogin} />:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/placeorder" element={<PlaceOrder /*setShowLogin={setShowLogin}*/ />}/>
        <Route path='/verify' element={<Verify setShowLogin={setShowLogin} />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/careers" element={<Careers />} />
        {/* <Route path="/blog" element={<Blog />} /> */}
        <Route path='/myorders' element={<MyOrders setShowLogin={setShowLogin} />} />
      </Routes>
     </div>
     <Footer/>
    </>
     
   )
 }
 
 export default App