import React from 'react'
import './LoginPopUp.css'
import  { useState, useContext } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify"

const LoginPopUp = ({setShowLogin}) => {
    const {url ,setToken } = useContext(StoreContext)
    
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
    const onLogin =async(event)=>{
      event.preventDefault();
      let newUrl = url;
      if(currState==="Login"){
        newUrl+="/api/user/login";
      }else{
        newUrl+="/api/user/register";
      }
      try {
        const response = await axios.post(newUrl,data);
        if (response.data.success) {
          toast.success(response.data.message || "Login Successful");
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setShowLogin(false);
        } else {
          toast.error(response.data.message || "Login Failed");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again.");
      }
    }

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
                {currState === "Sign Up" && (
                  <div className="login-popup-condition">
                      <input type="checkbox" required />
                      <p>I accept the <span>Terms & Conditions</span> and <span>Privacy Policy</span></p>
                  </div>
                )}
                { currState === "Sign Up" 
                ? <p> Already have an account ? <span className="a" onClick={()=>setCurrState("Login")}> Login</span></p>
                : <p> Create a new account ? <span className="a" onClick={()=>setCurrState("Sign Up")}> Sign Up</span></p>
                }        
        </form>
        <ToastContainer />
    </div>
  )
}

export default LoginPopUp