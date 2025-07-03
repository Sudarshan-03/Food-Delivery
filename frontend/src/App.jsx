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

  
import { useEffect } from 'react';

 const App = () => {
  const [showLogin, setShowLogin] = useState(() => {
    const user = localStorage.getItem("user");
    return !user; // show login popup if no user is stored
  });
  //const isLogin = JSON.parse(localStorage.getItem("keepLogin"))
 

   return (
    <> 
    {showLogin?<LoginPopUp setShowLogin={setShowLogin} />:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/placeorder" element={<PlaceOrder setShowLogin={setShowLogin} />}/>
        <Route path='/verify' element={<Verify setShowLogin={setShowLogin} />} />
        <Route path='/myorders' element={<MyOrders setShowLogin={setShowLogin} />} />
      </Routes>
     </div>
     <Footer/>
    </>
     
   )
 }
 
 export default App