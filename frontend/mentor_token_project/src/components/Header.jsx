import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import Logo from "../assets/Logo.svg";
import Button from "./Button";

const Header = () => {
  return (
    <header>
      <img src={Logo} className="app-logo" alt="logo-img" />
      <nav>
        <ul className="header">
          <li className="list-header-section">
            <NavLink activeStyle={{ color: "#696cff" }} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={{ color: "#696cff" }} to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={{ color: "#696cff" }} to="/contact">
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="header">
        <NavLink
          to="/login"
          className="login"
          activeStyle={{ color: "#696cff" }}
        >
          Login
        </NavLink>
        <div className="button-header">
          <NavLink to="/login" activeStyle={{ color: "#696cff" }}>
            <Button name="→Get Started" />
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
