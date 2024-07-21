import React, { useState, useEffect } from "react";
import LogPage from "../components/LogPage.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import StartupProfileImage from "../assets/Register-Images/profileImg.png";
import CameraImage from "../assets/Register-Images/photo.png";
import CheckMarkChecked from "../assets/checkbox/checkbox-checked.png";
import CheckMark from "../assets/checkbox/checkbox-unchecked.png";
import "./Register-Startup.css";

const RegisterStartup = () => {
  const [startupName, setStartupName] = useState("");
  const [nameSurname, setNameSurname] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
if(isAccepted){
    console.log("StartupName", startupName);
    console.log("nameSurname", nameSurname);
    console.log("address", address);
    console.log("email", email);
    navigate("/dashboard-startup");
  } else {
    alert("You need to accept the Terms of use & Privacy Policy to register.")
  }
  };

  const toggleCheckbox = () => {
    setIsAccepted(!isAccepted);
  };

  return (
    <LogPage
      logData={
        <>
          <h1 className="setup-startup-acc-title">SETUP STARTUP ACCOUNT</h1>
          <div className="startup-profile-img">
            <img
              src={StartupProfileImage}
              className="profile-img"
              alt="startup-profile-image"
            />
            <img
              src={CameraImage}
              className="camera-img"
              alt="startup-camera-image"
            />
          </div>
          <form className="startup-account-form" onSubmit={handleSubmit}>
            <div className="startup-inputs">
              <label>Startup Name</label>
              <br />
              <input
                className="startup-name-input"
                type="text"
                value={startupName}
                onChange={(e) => setStartupName(e.target.value)}
                placeholder="My Startup Name"
                required
              />
              <br />
              <label>
                Legal Representative{" "}
                <span className="required-asterisk">*</span>
              </label>
              <br />
              <input
                className="startup-input"
                type="text"
                value={nameSurname}
                onChange={(e) => setNameSurname(e.target.value)}
                placeholder="Name and surname"
                required
              />
              <br />
              <label>
                Registered Business Address{" "}
                <span className="required-asterisk">*</span>
              </label>
              <br />
              <input
                className="startup-input"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Registered Business Address"
                required
              />
              <br />
              <label>Invite Mentors via email</label>
              <br />
              <input
                className="startup-input"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address to invite mentor"
                required
              />
              <br />

              <div className="register-startup-button">
                <Button type="submit" name="Register" />
              </div>
              <div className="under-button-text">
                <div className="checkbox-container" onClick={toggleCheckbox}>
                  <div className={`checkbox-custom ${isAccepted ? "checked" : "unchecked"}`}>
                  </div>
                  <span> By signing up to create an account I accept Company’s{" "}</span>
                  <span className="terms-of-use-text-register-form">
                  Terms of use & Privacy Policy.</span>
                  </div>

               
              </div>
            </div>
          </form>
        </>
      }
    />
  );
};

export default RegisterStartup;
