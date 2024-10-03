import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LogPage from "../components/LogPage.jsx";
import Button from "../components/Button.jsx";
import Elipse from "../assets/Register-Images/EllipseUser.png";
import UserImg from "../assets/Register-Images/user.png";
import CameraImage from "../assets/Register-Images/photo.png";
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

const RegisterMentor = ({
  email,
  username,
  password,
  confirmPassword,
}) => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  const [skills, setSkills] = useState([]);
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFilePath, setUploadedFilePath] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  //upload file
  const uploadFile = async () => {
    if (!selectedFile) {
      alert("Please select a profile picture.");
      return null;
    }

    const formData = new FormData();
    formData.append("document", selectedFile);

    try {
      const response = await fetch("http://localhost:10000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("File upload successful:", result);
        setUploadedFilePath(result.file_name);
        return result.file_name;
      } else {
        console.error("File upload failed:", await response.text());
        alert("File upload failed.");
        return null;
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      alert("There was an error uploading the file.");
      return null;
    }
  };

  const handleSkillsChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSkills((prevSkills) => [...prevSkills, value]);
    } else {
      setSkills((prevSkills) => prevSkills.filter((skill) => skill !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("Email:", email);
    // console.log("Username:", username);
    // console.log("Confirm Pass", confirmPassword);
    // console.log("Password:", password);
    // console.log("Phone:", phone);
    // console.log("Skills:", skills);
    // console.log("Description:", description);

    if (!isAccepted) {
      alert(
        "You need to accept the Terms of Use & Privacy Policy to register."
      );
      return;
    }

    if (
      !email ||
      !username ||
      !password ||
      !confirmPassword ||
      !phone ||
      !skills.length ||
      !description
    ) {
      alert("Please fill all the required fields!");
      return;
    }

    const filePath = await uploadFile();

    if (!filePath) {
      alert("File upload failed, please try again.");
      return;
    }

    const mentorData = {
      email,
      name: username,
      password,
      confirmPassword,
      type: "mentor",
      skills,
      phone,
      desc: description,
      profilePicture: filePath,
    };

    console.log("Mentor data being sent:", mentorData);

    try {
      const response = await fetch("http://localhost:10000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mentorData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Registration successful!", result);

        if (result.token) {
          console.log("Received token:", result.token);
          localStorage.setItem("jwt_token", result.token);
          navigate("/dashboard-mentor");
        } else {
          console.error("Token not found in registration response.");
          setErrorMessage("Token not found. Please try logging in.");
        }
      } else {
        const errorText = await response.text();
        console.error("Registration failed:", errorText);
        alert(errorText || "There was an error during registration.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("There was a problem registering the mentor.");
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
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                className="mentor-img"
                alt="mentor-profile"
              />
            ) : (
              <img src={UserImg} className="mentor-img" alt="mentor-image" />
            )}
            <label htmlFor="profilePictureInput" className="upload-label">
              <img
                src={CameraImage}
                alt="camera-picture"
                className="camera-picture"
                onClick={triggerFileUpload}
                style={{ cursor: "pointer" }}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="upload-input"
                style={{ display: "none" }}
              />
            </label>
          </div>
          <form className="startup-account-form" onSubmit={handleSubmit}>
            <div className="startup-inputs">
              <label>Phone Number</label>
              <br />
              <input
                id="phone"
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
                      id={skill}
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
                id="description"
                className="startup-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description about yourself"
                required
              />
              <br />
            </div>
            <div className="register-startup-button">
              <Button type="submit" name="Register" />
            </div>
            <div className="under-button-text">
              <div className="checkbox-container" onClick={toggleCheckbox}>
                <div
                  className={`checkbox-custom ${
                    isAccepted ? "checked" : "unchecked"
                  }`}
                >
                  <input
                    id="terms-checkbox"
                    type="checkbox"
                    checked={isAccepted}
                    onChange={toggleCheckbox}
                    style={{ display: "none" }}
                  />
                </div>
                <span className="span-terms-of-use">
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
