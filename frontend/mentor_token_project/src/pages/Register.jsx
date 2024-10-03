import React, { useState, useEffect } from "react";
import LogPage from "../components/LogPage.jsx";
import SwitchSelector from "react-switch-selector";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import RegisterMentor from "./Register-Mentor.jsx";
import RegisterStartup from "./Register-Startup.jsx";
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
  const [name, setName] = useState("");
  const [type, setType] = useState("mentor");
  const [passwordStrength, setPasswordStrength] = useState(false);
  const [noNameAndEmail, setNoNameAndEmail] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [numberSymbol, setNumberSymbol] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [emailAddressPattern, setEmailAddressPattern] = useState(false);
  const [continueButton, setContinueButton] = useState(false);

  const updateType = (userType) => {
    setType(userType);
    console.log("The role is:", userType);
  };

  // const navigate = useNavigate();

  useEffect(() => {
    const noNameAndEmail =
      !password.toLowerCase().includes(name.toLowerCase()) ||
      !password.toLowerCase().includes(email.toLowerCase());
    // (!password.toUpperCase().includes(username.toUpperCase()) ||
    //       !password.toUpperCase().includes(email.toUpperCase())
    //   ) ? setNoNameAndEmail(false) : setNoNameAndEmail(true);

    noNameAndEmail && characters && numberSymbol
      ? setPasswordStrength(true)
      : setPasswordStrength(false);

    /^.{8,}$/.test(password) ? setCharacters(true) : setCharacters(false);

    /^.[0-9!@#$%^&*(),.?":{}|<>]/.test(password)
      ? setNumberSymbol(true)
      : setNumberSymbol(false);

    password.toString() === confirmPassword.toString()
      ? setPasswordMatch(true)
      : setPasswordMatch(false);
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
      ? setEmailAddressPattern(true)
      : setEmailAddressPattern(false);
    setPasswordStrength(
      noNameAndEmail && characters && numberSymbol && passwordMatch
    );

    const isFormValid =
      passwordMatch &&
      passwordStrength &&
      emailAddressPattern &&
      name.trim() !== "";
    setContinueButton(isFormValid);

    console.log("No Name and Email:", noNameAndEmail);
    console.log("Characters:", characters);
    console.log("Number Symbol:", numberSymbol);
    console.log("Password Match:", passwordMatch);
    console.log("Email Pattern:", email);
  }, [
    password,
    confirmPassword,
    name,
    email,
    noNameAndEmail,
    characters,
    numberSymbol,
    passwordMatch,
  ]);

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
    if (!passwordStrength) {
      alert("Password is not strong enough!");
      return;
    }
    if (!emailAddressPattern) {
      alert("Please enter a valid email address!");
      return;
    }

    const userData = {
      email,
      name,
      password,
      confirmPassword,
      type,
    };
    setContinueButton(true);
    console.log("Form submitted successfully!", userData);
  };

  const customStyles = (selected) => ({
    backgroundColor: selected
      ? "rgba(104, 108, 255, 1)"
      : "rgba(245, 245, 248, 1)",
    color: selected ? "#FFFFFF" : "#566A7F",
  });

  return continueButton ? (
    type === "mentor" ? (
      <RegisterMentor
        email={email}
        setEmail={setEmail}
        username={name}
        setName={setName}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        goBack={() => setContinueButton(false)}
      />
    ) : (
      <RegisterStartup
        email={email}
        setEmail={setEmail}
        name={name}
        setUsername={setName}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        goBack={() => setContinueButton(false)}
      />
    )
  ) : (
    <LogPage
      logData={
        <>
          <h1 className="register-page-title">CHOOSE ACCOUNT TYPE</h1>
          <div style={{ width: "528px", height: "46px" }}>
            <SwitchSelector
              onChange={updateType}
              options={options}
              initialSelectedIndex={type === "mentor" ? 1 : 0}
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
              <div className="input-container">
                <label htmlFor="username" className="input-label">
                  Username
                </label>
                <input
                  className="username-register"
                  type="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="password" className="input-label-pass">
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
                <Button
                  type="submit"
                  name="Continue"
                  style={{
                    backgroundColor: continueButton ? "#696CFF" : "#D3D3FF",
                    color: "white",
                    cursor: continueButton ? "pointer" : "not-allowed",
                  }}
                  disabled={!continueButton}
                />
              </div>
              <div className="under-button-text">
                <span className="whitespace-register-form">
                  Already have account?
                </span>
                <NavLink to="/login" className="login-text-register-form">
                  Login.
                </NavLink>
              </div>
              <NavLink to="/forgot-password" className="forgot-password-link">
                Forgot password?
              </NavLink>
            </div>
          </form>
        </>
      }
    />
  );
};

export default Register;
