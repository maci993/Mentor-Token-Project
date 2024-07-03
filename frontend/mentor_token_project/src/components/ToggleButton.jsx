import React, { useState, useEffect } from "react";
import Button from "./Button";

const ToggleButton = ({ roleChange }) => {
  const [role, setRole] = useState("Company");
  const [colorStartup, setColorStartup] = useState("");
  const [colorTextStartup, setColorTextStartup] = useState("");
  const [colorMentor, setColorMentor] = useState("");
  const [colorTextMentor, setColorTextMentor] = useState("");

  useEffect(() => {
    role === "Company"
      ? (setColorStartup("rgba(104, 108, 255, 1)"),
        setColorTextStartup("rgba(86, 104, 127, 1)"))
      : (setColorStartup("rgba(245, 245, 248, 1"),
        setColorTextStartup("white"));
    role === "Mentor"
      ? (setColorMentor("rgba(104, 108, 255, 1)"),
        setColorTextMentor("rgba(86, 104, 127, 1)"))
      : (setColorMentor("rgba(245, 245, 248, 1)"), setColorTextMentor("white"));
    roleChange(role);
  }, [role]);

  const updateRole = (e, value) => {
    e.preventDefault();
    setRole(value);
  };
  return (
    <div className="toggle-button-register">
      <Button
        mySubmit={(e) => updateRole(e, "Company")}
        name="Startup"
        width="50%"
        color={colorStartup}
        textColor={colorTextMentor}
      />
      <Button
        mySubmit={(e) => updateRole(e, "Mentor")}
        name="Mentor"
        width="50%"
        color={colorMentor}
        textColor={colorTextStartup}
      />
    </div>
  );
};

export default ToggleButton;
