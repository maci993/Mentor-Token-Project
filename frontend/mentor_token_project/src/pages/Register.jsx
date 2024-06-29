import React, { useState, useEffect } from "react";
import LogPage from "../components/LogPage.jsx";
import SwitchSelector from "react-switch-selector";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "./Register.css"

const options = [
  {
    label: "Startup",
    value: "startup",
    selectedBackgroundColor: "#696CFF",
    innerHeight: 20,
  },
  {
    label: "Mentor",
    value: "mentor",
    selectedBackgroundColor: "#696CFF",
  },
];

const onChange = (newValue) => {
  cosole.log(newValue);
};

const initialSelectedIndex = options.findIndex(({ value }) => value === "bar");

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Email", email);
    console.log("Password", password);
  };

  return (
    <LogPage
      logData={
        <>
          <h1 className="register-title">Choose Account type</h1>
          <div style={{ width: "528px", height: "46px" }}>
            <SwitchSelector
              onChange={onChange}
              options={options}
              initialSelectedIndex={initialSelectedIndex}
              backgroundColor={"#F5F5F9"}
              fontColor={"#566A7F"}
              optionBorderRadius={8}
              wrapperBorderRadius={8}
            />
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-inputs">
              <input
                className="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mentortoken@mail.com"
                required
              />
              <br />
              <span className="span-password">Password</span>
              <input
                className="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <div className="password-text">
                <span className="spacing">✓ Password Strength : Weak</span>
                <br />
                <span className="spacing">✓ Cannot contain your name or email address</span>
                <br />
                <span className="spacing">✓ At least 8 characters</span>
                <br />
                <span className="spacing">✓ Contains a number or symbol</span>
                <br />
              </div>
              <div className="register-button">
                <Button type="submit" name="Continue" />
              </div>
              <div className="under-button-text">
                <span className="whitespace-register-form">Already have account?</span>
                <NavLink to="/login" className="login-text-register-form">
                  Login.
                </NavLink>
              </div>
            </div>
          </form>
        </>
      }
    />
  );
};

export default Register;
