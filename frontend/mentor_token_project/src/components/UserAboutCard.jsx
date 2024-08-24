import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import EditIcon from "../assets/MyStats/edit.svg";
import "./UserAboutCard.css";

const UserAboutCard = ({
  about,
  skills = [],
  description,
  onSave,
  showOfferButton,
  onOfferJob,
  role,
  userId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDesc, setEditedDesc] = useState(description);
  const [editedSkills, setEditedSkills] = useState(skills.join(" | "));

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);
    const updatedData = {
      desc: editedDesc,
      skills: editedSkills.split(" | "),
    };
    onSave(updatedData);

    try {
      const token = window.localStorage.getItem("jwt_token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      console.log("User ID:__________________", userId);

      const res = await fetch(`http://localhost:10000/api/auth/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        alert("User information updated successfully", updatedUser);
      } else {
        console.error("Error updating user information:", res.statusText);
      }
    } catch (error) {
      console.error("Error updating user information:", error.message);
    }
  };

  return (
    <div className="user-about-card">
      <div className="card-header">
        <h2>{about}</h2>
        {role === "mentor" && (
          <img
            src={EditIcon}
            alt="edit"
            className="edit-icon-my-stats"
            onClick={handleEdit}
          />
        )}
        {role === "startup" && (
          <button className="offer-job-button" onClick={handleSave}>
            Offer New Job
          </button>
        )}
      </div>
      {/* <p className="skills-paragraph"><strong>Skills: </strong>{skills.join(" | ")}</p> */}
      {isEditing ? (
        <div>
          <div className="edit-section">
            <label htmlFor="skills-input">
              <strong>Skills:</strong>
            </label>
            <input
              id="skills-input"
              type="text"
              className="edit-input"
              value={editedSkills}
              onChange={(e) => setEditedSkills(e.target.value)}
            />
          </div>
          <textarea
            className="edit-textarea"
            value={editedDesc}
            onChange={(e) => setEditedDesc(e.target.value)}
          />
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      ) : (
        // <textarea className="edit-textarea" value={editedDesc} onChange={(e) => setEditedDesc(e.target.value)}/>
        <div>
          <p className="skills-paragraph">
            <strong>Skills:</strong> {skills.join(" | ")}
          </p>
          <p className="user-about-desc">{description}</p>
        </div>
      )}
      {showOfferButton && (
        <button className="offer-job-button" onClick={onOfferJob}>
          + Offer New Job
        </button>
      )}
    </div>
  );
};

export default UserAboutCard;
