import React, { useState, useEffect } from "react";
import LogPage from "../components/LogPage.jsx";
import { NavLink } from "react-router-dom";
import Button from "../components/Button.jsx";
import Elipse from "../assets/Register-Images/EllipseUser.png";
import UserImg from "../assets/Register-Images/user.png";
import CheckMark from "../assets/Register-Images/check.png";
import "./Register-Mentor.css";

const RegisterMentor = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("name", name);
    console.log("password", password);
  };
  return (
    <LogPage
      logData={
        <>
          <h1 className="setup-mentor-acc-title">SETUP MENTOR ACCOUNT</h1>
          <div className="startup-profile-image">
            <img
              src={Elipse}
              className="mentor-image-elipse"
              alt="mentor-image-elipse"
            />
            <img src={UserImg} className="mentor-img" alt="mentor-image" />
          </div>
          <form className="startup-account-form" onSubmit={handleSubmit}>
            <div className="startup-inputs">
              <label>Mentor Name</label>
              <br />
              <input
                className="startup-name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name and surname"
                required
              />
              <br />
              <label>Mentor's Password</label>
              <br />
              <input
                className="startup-input"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
              />
            </div>
            <div className="register-startup-button">
              <Button type="submit" name="Register" />
            </div>
            <div className="under-button-text">
              <span className="whitespace-register-startup-form">
                <img src={CheckMark} alt="" />
                By signing up to create an account I accept Company’s{" "}
              </span>
              <NavLink to="/" className="terms-of-use-text-register-form">
                Terms of use & Privacy Policy.
              </NavLink>
            </div>
          </form>
        </>
      }
    />
  );
};

export default RegisterMentor;
