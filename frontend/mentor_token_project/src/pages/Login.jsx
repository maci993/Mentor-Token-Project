import React from "react";
import Logo from "../assets/Logo.svg"
import Vector from "../assets/Vector.svg"
import Button from "../components/Button"
import Rocket from "../assets/Rocket.svg"
import "./Login.css"

const Login = () => {
return (
    <div className="login-page">
        <div className="main-login-title">
            <h1>Grow <br /> your startup!</h1>
            <p>Monitoring and avaluating now is easy!</p>
        </div>
        <div className="mentor-token-logo">
<img className="mentor-token-image"src={Logo} alt="mentor-token-logo" />
<p>mentortoken.com</p>
        </div>
        <div className="rocket-img">
            <img src={Rocket} alt="" />
        </div>
        <div className="log-in-section">
<img src={Vector} alt="vector-logo" />
<div className="log-in-paragraph">
   <h1>Log in to mentor token</h1>
   <p>Enter your email and pass to login.</p>
</div>
<div className="log-in-inputs">
    <input className="email" type="email" placeholder="mentortoken@mail.com" required/> <br />
    <input  className="password" type="password" placeholder="Password" required/>
</div>
<div className="log-in-button">
<Button name={"Log in"}/>
</div>
<div>
    <span className="whitespace">Don't have account?</span>
    <span className="register">Register.</span>
</div>
        </div>

    </div>
)
}

export default Login;