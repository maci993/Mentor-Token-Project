import React, { useState, useRef } from "react";
import LogPage from "../components/LogPage.jsx";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import StartupProfileImage from "../assets/Register-Images/profileImg.png";
import CameraImage from "../assets/Register-Images/photo.png";
import "./Register-Startup.css";

const RegisterStartup = ({ email, name, password, confirmPassword }) => {
  // const [startupName, setStartupName] = useState("");
  // const [nameSurname, setNameSurname] = useState("");
  const [representative, setRepresentative] = useState("");
  const [address, setAddress] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!representative || !address || !isAccepted) {
      alert("Please fill all the required fields!");
      return;
    }

    const filePath = await uploadFile();
    if (!filePath) {
      alert("File upload failed, please try again.");
      return;
    }

    const startupData = {
      email,
      name,
      password,
      confirmPassword,
      type: "startup",
      representative,
      address,
      profilePicture: filePath,
    };

    console.log("Startup data being sent:", startupData);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(startupData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Registration successful!", result);
        navigate("/dashboard-startup");
      } else {
        const errorText = await response.text();
        console.error("Registration failed:", errorText);
        alert(errorText || "There was an error during registration.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("There was a problem registering the startup.");
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
          {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                className="profile-img"
                alt="startup-profile"
              />
            ) : (
              <img
                src={StartupProfileImage}
                className="profile-img"
                alt="startup-profile-image"
              />
            )}
            <label htmlFor="profilePictureInput" className="upload-label">
              <img
                src={CameraImage}
                className="camera-img"
                alt="startup-camera-image"
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
              <label>Startup Name</label>
              <br />
              <input
                className="startup-name-input"
                type="text"
                value={name}
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
                value={representative}
                onChange={(e) => setRepresentative(e.target.value)}
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
            </div>
          </form>
        </>
      }
    />
  );
};

export default RegisterStartup;
