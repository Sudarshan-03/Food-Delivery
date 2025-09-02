import React, { useState } from 'react';
import './Login.css';
import { assets } from '../../assets/assets';
import axios from 'axios';

const Login = ({ setIsLoggedIn }) => {
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/user/login-admin', data);
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                setIsLoggedIn(true);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    }

    return (
        <div className='login'>
            <form onSubmit={onLogin} className='login-container'>
                <div className="login-title">
                    <img src={assets.logo} alt="" />
                    <h2>Admin Login</h2>
                </div>
                <div className="login-inputs">
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button type='submit'>Login</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
}

export default Login;