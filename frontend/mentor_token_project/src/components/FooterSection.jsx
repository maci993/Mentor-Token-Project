import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import LogoFooter from "../assets/Footer-Logos/logo1.svg";
import LogoFooter1 from "../assets/Footer-Logos/logo2.svg";
import LogoFooter2 from "../assets/Footer-Logos/logo3.svg";
import "./FooterSection.css";

const FooterSection = () => {
  const navigate = useNavigate();
  const [navigation, setNavigation] = useState("/");
  // const location = useLocation();

  useEffect(() => {
    setNavigation(location.pathname);
  }, [location]);
  const updateNavigation = (e, value) => {
    e.preventDefault();
    setNavigation(value);
    navigate(value);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <img className="logo-text" src={Logo} alt="mentor-token-logo" />
          <p>
            With Mentor Token, every failure
            <br /> transforms into an opportunity for
            <br /> growth.
          </p>
        </div>
        <div className="footer-section-div">
          <h4 className="pages-footer">Pages</h4>
          <ul className="footer-section-links">
            <li>
              <Link
                to={"/"}
                onClick={(e) => updateNavigation(e, "/")}
                className="footer-section-link"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/contact"}
                onClick={(e) => updateNavigation(e, "/contact")}
                className="footer-section-link"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div class="footer-section-div">
          <h4>Contact</h4>
          <p className="email-footer"> info@mentortoken.com</p>
          <p className="phone-number-footer">+(389) 123 456 789</p>
        </div>
        <div class="footer-section-div">
          <h4>Follow Us</h4>
          <br />
          <img className="logo" src={LogoFooter} alt="footer-logo" />
          <img className="logo" src={LogoFooter1} alt="footer-logo1" />
          <img className="logo" src={LogoFooter2} alt="foot-logo2" />
        </div>
      </div>
      <hr />
      <div class="footer-bottom">
        &copy; 2024 Mentor Token. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterSection;
