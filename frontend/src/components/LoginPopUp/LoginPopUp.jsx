import React from 'react'
import './LoginPopUp.css'
import  { useState, useContext } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopUp = ({setShowLogin}) => {
    const {url ,setToken} = useContext(StoreContext)
    
    const [currState, setCurrState] = useState("Sign Up");

    const [data ,setData] = useState({
        name:"",
        email:"",
        password:""
    })
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }
    const onLogin = async (event) => {
        event.preventDefault();
        let apiUrl = url;
        if (currState === "Login") {
            apiUrl += "/api/user/login"
        } else {
            apiUrl +=  "/api/user/register"
        }

        const response = await axios.post(apiUrl, data);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
            
        } 
        else {
            alert(response.data.message);
        }
    };

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} action="" className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-input">
                {currState === "Login" ?<></>:  <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Enter your email' required/>
                <input name='password' onChange={onChangeHandler} value={data.password}  type="password" placeholder='Enter your password' required/>
               
            </div>
             <button type='submit'>
                    {currState === "Sign Up" ? "Create Account" : "Login"}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox"  required/>
                    <p>I accept the <span>Terms & Conditions</span> and <span>Privacy Policy</span></p>
                </div>
                { currState === "Sign Up" 
                ? <p> Already have an account ? <span className="a" onClick={()=>setCurrState("Login")}> Login</span></p>
                : <p> Create a new account ? <span className="a" onClick={()=>setCurrState("Sign Up")}> Sign Up</span></p>
                }        
        </form>
    </div>
  )
}

export default LoginPopUp