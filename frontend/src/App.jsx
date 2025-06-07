 import React from 'react'
 import Navbar from './components/Navbar/Navbar' ;
  import { Routes, Route } from 'react-router-dom'
  import Home from './pages/Home/home'
  import Cart from './pages/Cart/cart'
  import PlaceOrder from './pages/PlaceOrder/placeorder'
  
 const App = () => {
   return (
     <div className='app'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/placeorder" element={<PlaceOrder />}/>
      </Routes>
     </div>
   )
 }
 
 export default App