import React, { useState, useEffect } from "react";
import LogPage from "../components/LogPage.jsx";
import SwitchSelector from "react-switch-selector";
import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import "./Register.css";

const options = [
  {
    label: "Startup",
    value: "startup",
    selectedBackgroundColor: "rgba(104, 108, 255, 1)",
    selectedFontColor: "#FFFFFF",
    unselectedFontColor: "#566A7F",
    innerHeight: 20,
  },
  {
    label: "Mentor",
    value: "mentor",
    selectedBackgroundColor: "rgba(104, 108, 255, 1)",
    selectedFontColor: "#FFFFFF",
    unselectedFontColor: "#566A7F",
  },
];

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("Company");
  const [passwordStrength, setPasswordStrength] = useState(false);
  const [noNameAndEmail, setNoNameAndEmail] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [numberSymbol, setNumberSymbol] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [emailAddressPattern, setEmailAddressPattern] = useState(false);
  const [continueButton, setContinueButton] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setNoNameAndEmail(
      !password.toUpperCase().includes(username.toUpperCase()) &&
        !password.toUpperCase().includes(email.toUpperCase())
    );

    setCharacters(/^.{8,}$/.test(password));

    setNumberSymbol(/^.[0-9!@#$%^&*(),.?":{}|<>]/.test(password));

    setPasswordMatch(password === confirmPassword && password !== "");
    setEmailAddressPattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email));
    setPasswordStrength(noNameAndEmail && characters && numberSymbol);
  }, [
    password,
    confirmPassword,
    username,
    email,
    noNameAndEmail,
    characters,
    numberSymbol,
  ]);

  const updateRole = (userRole) => {
    setRole(userRole);
    console.log("The role is:", userRole);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      alert("Please enter a valid email address!");
      return;
    }
    if (!passwordMatch) {
      alert("Passwords do not match!");
      return;
    }
    setContinueButton(true);
    console.log("Form submitted successfully!");
  };

  const customStyles = (selected) => ({
    backgroundColor: selected
      ? "rgba(104, 108, 255, 1)"
      : "rgba(245, 245, 248, 1)",
    color: selected ? "#FFFFFF" : "#566A7F",
  });

  return (
    <LogPage
      logData={
        <>
          <h1 className="register-title">Choose Account type</h1>
          <div style={{ width: "528px", height: "46px" }}>
            <SwitchSelector
              onChange={updateRole}
              options={options}
              initialSelectedIndex={0}
              backgroundColor={"#F5F5F9"}
              fontColor={"#566A7F"}
              optionBorderRadius={8}
              wrapperBorderRadius={8}
              borderWidth={2}
              borderColor={"rgba(104, 108, 255, 1)"}
              selectedFontColor={"#FFFFFF"}
              unselectedFontColor={"#566A7F"}
            />
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-inputs">
              <div className="input-container">
                <label htmlFor="email" className="input-label">
                  Email
                </label>
                <input
                  className="email-register"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mentortoken@mail.com"
                  required
                />
              </div>
              <br />
              <div className="input-container">
                <label htmlFor="username" className="input-label">
                  Username
                </label>
                <input
                  className="username-register"
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <input
                  className="password-register"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              <br />
              <div className="input-container">
                <label htmlFor="confirmPassword" className="input-label">
                  Confirm Password
                </label>
                <input
                  className="confirm-password-register"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <div className="password-text">
                <span
                  className={`spacing ${
                    passwordStrength ? "valid" : "invalid"
                  }`}
                >
                  ✓ Password Strength : {passwordStrength ? "Strong" : "Weak"}
                </span>
                <br />
                <span
                  className={`spacing ${noNameAndEmail ? "valid" : "invalid"}`}
                >
                  ✓ Cannot contain your name or email address
                </span>
                <br />
                <span className={`spacing ${characters ? "valid" : "invalid"}`}>
                  ✓ At least 8 characters
                </span>
                <br />
                <span
                  className={`spacing ${numberSymbol ? "valid" : "invalid"}`}
                >
                  ✓ Contains a number or symbol
                </span>
                <br />
              </div>
              <div className="register-button">
                <Button type="submit" name="Continue" />
              </div>
              <div className="under-button-text">
                <span className="whitespace-register-form">
                  Already have account?
                </span>
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
