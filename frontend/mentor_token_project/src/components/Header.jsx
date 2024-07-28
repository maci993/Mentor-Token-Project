import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import Logo from "../assets/Logo.svg";
import Button from "./Button";

const Header = () => {
  // const navigate = useNavigate();
  // const [navigation, setNavigation] = useState("/");
  // const location = useLocation();

  // useEffect(() => {
  //   setNavigation(location.pathname);
  // }, [location]);
  // const updateNavigation = (e, value) => {
  //   e.preventDefault();
  //   setNavigation(value);
  //   navigate(value);
  // };

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
