import React, { useState } from "react";
import EditIcon from "../assets/MyStats/edit.svg"
import "./UserAboutCard.css"

const UserAboutCard = ({ about, skills = [], description, onSave}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDesc, setEditedDesc] = useState(description);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        onSave(editedDesc);
    };

    return (
        <div className="user-about-card">
            <div className="card-header">
                <h2>{about}</h2>
                <img src={EditIcon} alt="edit" className="edit-icon-my-stats" onClick={handleEdit}/>
            </div>
            <p className="skills-paragraph"><strong>Skills: </strong>{skills.join(" | ")}</p>
            {isEditing ? (
                <textarea className="edit-textarea" value={editedDesc} onChange={(e) => setEditedDesc(e.target.value)}/>
            ) : (
                <p className="user-about-desc">{description}</p>
            )}
            {isEditing && (
                <button className="save-button" onClick={handleSave}>Save</button>
            )}
        </div>
    );
};

export default UserAboutCard;