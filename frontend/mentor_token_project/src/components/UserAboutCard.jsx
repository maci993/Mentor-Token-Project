import React, { useState } from "react";
import EditIcon from "../assets/MyStats/edit.svg";
import "./UserAboutCard.css";

const UserAboutCard = ({ about, skills = [], description, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDesc, setEditedDesc] = useState(description);
  const [editedSkills, setEditedSkills] = useState(skills.join(" | "));

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave({ description: editedDesc, skills: editedSkills.split(" | ") });
  };

  return (
    <div className="user-about-card">
      <div className="card-header">
        <h2>{about}</h2>
        <img
          src={EditIcon}
          alt="edit"
          className="edit-icon-my-stats"
          onClick={handleEdit}
        />
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
      {/* {isEditing && (
                <button className="save-button" onClick={handleSave}>Save</button>
            )} */}
    </div>
  );
};

export default UserAboutCard;
