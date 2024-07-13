import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogPage from "../components/LogPage.jsx";
import Button from "../components/Button.jsx";
import Elipse from "../assets/Register-Images/EllipseUser.png";
import UserImg from "../assets/Register-Images/user.png";
import "./Register-Mentor.css";

const skillsOptions = [
  "JavaScript",
  "Node.js",
  "Express.js",
  "React.js",
  "HTML",
  "CSS",
  "MongoDB",
];

const RegisterMentor = () => {
  // const [name, setName] = useState("");
  // const [password, setPassword] = useState("");
  const [skills, setSkills] = useState([]);
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);

  const navigate = useNavigate();

  const handleSkillsChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSkills((prevSkills) => [...prevSkills, value]);
    } else {
      setSkills((prevSkills) => prevSkills.filter((skill) => skill !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAccepted) {
      // console.log("name", name);
      // console.log("password", password);
      console.log("skills", skills);
      console.log("phone", phone);
      console.log("description", description);
      navigate("/");
    } else {
      alert(
        "You need to accept the Terms of use & Privacy Policy to register."
      );
    }
  };

  const toggleCheckbox = () => {
    setIsAccepted(!isAccepted);
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
              <label>Phone Number</label>
              <br />
              <input
                className="startup-input"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your phone number"
                required
              />
              <br />
              <label>Select your skills:</label> <br />
              <div className="skills-checkbox-group">
                {skillsOptions.map((skill) => (
                  <label key={skill} className="skills-checkbox-label">
                    <input
                      type="checkbox"
                      value={skill}
                      checked={skills.includes(skill)}
                      onChange={handleSkillsChange}
                    />
                    {skill}
                  </label>
                ))}
              </div>
              <br />
              <label>Description</label>
              <br />
              <textarea
                className="startup-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description about yourself"
                required
              />
              <br />
            </div>
            {/* <label>Mentor Name</label>
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
              /> */}
            <div className="register-startup-button">
              <Button type="submit" name="Register" />
            </div>
            <div className="under-button-text">
              <div className="checkbox-container" onClick={toggleCheckbox}>
                <div
                  className={`checkbox-custom ${
                    isAccepted ? "checked" : "unchecked"
                  }`}
                ></div>
                <span>
                  {" "}
                  By signing up to create an account I accept Company’s{" "}
                </span>
                <span className="terms-of-use-text-register-form">
                  Terms of use & Privacy Policy.
                </span>
              </div>
            </div>
          </form>
        </>
      }
    />
  );
};

export default RegisterMentor;
