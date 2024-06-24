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
        <ul className="navbar">
          <li>
            <NavLink to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="active">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" activeClassName="active">
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="footer-right">
        <p className="login" to="/login">
          Login
        </p>
        <div className="button-header">
          <NavLink to="/login" activeClassName="active">
            <Button name="→Get Started" />
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
