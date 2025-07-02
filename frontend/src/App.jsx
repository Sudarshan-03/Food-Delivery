import React from 'react'
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/home';
import Cart from './pages/Cart/cart';
import PlaceOrder from './pages/PlaceOrder/placeorder';
import { useState } from 'react';
import LoginPopUp from './components/LoginPopUp/LoginPopUp';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';

  
import { useEffect } from 'react';

 const App = () => {
  const [showLogin, setShowLogin] = useState(false);

 

   return (
    <> 
    {showLogin?<LoginPopUp setShowLogin={setShowLogin} />:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/placeorder" element={<PlaceOrder />}/>
         <Route path='/verify' element={<Verify/>} />
        <Route path='/myorders' element={<MyOrders/>} />
      </Routes>
     </div>
     <Footer/>
    </>
     
   )
 }
 
 export default App