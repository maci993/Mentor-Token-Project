import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import LogPage from "../components/LogPage.jsx";
import { jwtDecode } from "jwt-decode";
// import { useUser } from '../context/UserContext';

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [myToken, setMyToken] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log("email:", email, "password:", password, message);
  }, [email, password, message]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 200) {
        const data = await res.json();
        // const { jwt_token, type, id } = data;
        localStorage.setItem("jwt_token", data.token);
        console.log(data, "data from login");
        const decodedToken = jwtDecode(data.token);
        setMessage("Login successful!");
        const type = decodedToken.type;
        console.log("User role:", type);

        if (type === "company") {
          navigate("/dashboard-startup");
        } else if (type === "mentor") {
          navigate("/dashboard-mentor");
        }
      } else {
        setMessage("Please check your email and password!");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later");
    }
    // setMyToken(localStorage.getItem("jwt_token"));
  };
  // const jwt_token = await res.json();
  // const token = jwt_token.token;

  
  return (
    <LogPage
      logData={
        <>
          <h1>LOG IN TO MENTOR TOKEN</h1>
          <p>Enter your email and pass to login.</p>
          <form className="log-in-form" onSubmit={handleLogin}>
            <div className="log-in-inputs">
              <input
                className="email-login"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mentortoken@mail.com"
                required
              />
              <br />
              <input
                className="password-login"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <div className="log-in-button">
                <Button type="submit" name="Login" />
              </div>
              <div className="under-button-text">
                <span className="whitespace">Don't have account?</span>
                <NavLink to="/register" className="register">
                  Register.
                </NavLink>
              </div>
            </div>
          </form>
          {message && <p className="log-in-message">{message}</p>}
          {/* {myToken && <p>{myToken}</p>} */}
        </>
      }
    />
  );
};

export default Login;
