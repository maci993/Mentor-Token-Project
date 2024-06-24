import React, { useEffect, useState }  from 'react'
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import './LogPage.css'
import VectaryTexture from '../assets/log_pages/VectaryTexture.png'
import Logo from './../components/Logo.jsx'
import MentorLogo from './../assets/logo.svg'
import LogPage from './../components/LogPage.jsx'
import Button from './../components/Button.jsx';
import InputWithLabel from './../components/InputWithLabel.jsx';
import getUrl from '../../config.js';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [myToken, setMyToken] = useState('');
  const [myDecodedToken, setMyDecodedToken] = useState('');

  useEffect(()=> {
    
    // setMyData(getMoscData());
    console.log("email: ",email,", password: ", password, error);
  },[email,password])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("first step");
      const response = await fetch(getUrl('/api/user/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // if (!response.ok) {
      //   throw new Error('Login failed');
      // }

      const jwt_token = await response.json();

      if (jwt_token && jwt_token.token) {
        localStorage.setItem('jwt_token', jwt_token.token);
      }
    } catch (error) {
      console.log("This is the error: ", error);
      setError(`Failed to login. Please check your email and password. ${error.toString()}`);
    }
    setMyToken(localStorage.getItem('jwt_token'));

  setMyDecodedToken(jwtDecode(localStorage.getItem('jwt_token')));
  console.log(jwtDecode(localStorage.getItem('jwt_token')));
    };
  return (
      <LogPage
      logData ={
        <>
       <h2>LOG IN TO MENTOR TOKEN</h2>
       <span>Enter your email and pass to login.</span>
       <form  className='login_form' onSubmit={handleLogin}>

        <InputWithLabel
        value={email}
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="someone@somewhere.com"
        required
        />
        <InputWithLabel
        value={password}
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="password"
        required
        />
        <Button 
        name={"Log in"} 
        width={"100%"}
        // mySubmit={(e) => {handleLogin(e)}}
        />
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
    {myToken && <p>
      {myToken} 
      <br/>  
      {myDecodedToken.email}
      <br/>  
      {myDecodedToken.id}
      <br/>  
      {myDecodedToken.exp}
      <br/>  
      {myDecodedToken.iat}
      </p> }

       <p>Don’t have account? <Link to="/register"> Register.</Link></p>
        </>
      }
      />
     
  )
}

export default LoginPage