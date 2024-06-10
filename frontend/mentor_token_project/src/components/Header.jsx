import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import Logo from "../assets/Logo.svg";
import Button from "./Button";

const Header = () => {
  const navigate = useNavigate();
  const [navigation, setNavigation] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setNavigation(location.pathname);
  }, [location]);
  const updateNavigation = (e, value) => {
    e.preventDefault();
    setNavigation(value);
    navigate(value);
  };

  return (
    <header>
      <img
        onclick={(e) => updateNavigation(e, "/")}
        src={Logo}
        className="app-logo"
        alt="logo-img"
      />
      <nav>
        <ul className="navbar">
          <li>
            <Link to={"/"} onClick={(e) => updateNavigation(e, "/")}>
              Home
            </Link>
          </li>
          <li>
            <Link to={"/about"} onClick={(e) => updateNavigation(e, "/about")}>
              About
            </Link>
          </li>
          <li>
            <Link
              to={"/contact"}
              onClick={(e) => updateNavigation(e, "/contact")}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <div className="footer-right">
        <p className="login" to="/login" onClick={(e) => updateNavigation(e, "/login")}>
          Login
        </p>
        <div className="button-header">
        <Link to={"/login"}>
        <Button  name={"→Get Started"} />
        </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
