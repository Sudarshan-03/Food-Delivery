import React , {useState} from 'react'
import './Header.css'


const Header = ({menu,setMenu}) => {
   

  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order your favourite food here</h2>
            <p>lorem ipsum dolor sit amet consectetur adipisicing elit.Quisquam, voluptatum. Quisquam, voluptatum. Quisquam, voluptatum.
            </p>
            <a href='#explore-menu' onClick={()=>setMenu("Menu")} className={menu === "Menu" ? "active" : " "}><button >View Menu</button></a>
        </div>
    </div>
  )
}

export default Header