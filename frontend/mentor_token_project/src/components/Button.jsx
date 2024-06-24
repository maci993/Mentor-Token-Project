import React from "react";
import "./Button.css";

const Button = ({ onClick, name, hasIcon = false, iconSrc }) => {
  return <button className="button">{name}</button>;
  // <button className="button" onClick={onClick}>
  //     {hasIcon && (
  //       <img
  //         style={{ height: "24px", width: "24px" }}
  //         src={iconSrc}
  //         alt="arrow"
  //       />
  //     )}
  //     {name}
  //   </button>
};

export default Button;
