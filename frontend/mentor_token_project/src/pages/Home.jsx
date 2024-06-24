import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "./Home.css";
import Computer from "../assets/computer.png";
import Logos from "../assets/Company-logos/Logos1.svg";
import Logos1 from "../assets/Company-logos/Logos2.svg";
// import Mentors from "../components/Mentors";
import Rocket from "../assets/Rocket.svg"
import Picture from "../assets/picture-group-hp.svg"
import Mentors from "../assets/Mentors-img.svg";
import FooterSection from "../components/FooterSection";
import Features from "../components/Features";

const Home = () => {
  const handleClick = () => {
    alert("Button clicked!");
  };

  const navigate = useNavigate;
  useEffect(() => {}, []);

  return (
    <div className="home-page">
      <div className="images-container">
        <div className="text-home-page">
          <h1>
            Grow your StartUp! <br />
            Monitoring and <br />
            Evaluating now is easy!
          </h1>
          <p>
            Welcome to Mentor Token, where we redifine the dynamic of start-up{" "}
            <br />
            succes. Our innovative platform offers a transformative approach to{" "}
            <br />
            mentorship, ensuring that mentors are not just engaged but motivated{" "}
            <br />
            to drive the success of the ventures they support.
          </p>
          <div className="button2">
            <Link to={"/login"}>
              <Button name={" → Get Started"} />
              {/* // hasIcon={true} iconSrc="../assets/arrow-right.svg" /> */}
            </Link>
            <Link to={"/contact"}>
              <span className="get-in-touch">Get in Touch</span>
            </Link>
          </div>
        </div>
        <div>
          <img className="computer" src={Computer} alt="computer-image" />
        </div>
      </div>
      <footer className="logo-container">
        <div className="logo">
          <img src={Logos} alt="company-logos" />
        </div>
        <div className="logo1">
          <img src={Logos1} alt="company-logos1" />
        </div>
      </footer>
      <div className="paragraph-startups">
        <p className="text-paragraph">
          More than 25+ Startups around the
          <br />
          world trusted Mentor Token.
        </p>
      </div>
      <div className="rocket-home">
        <img src={Rocket} alt="rocket-image" />
      </div>
      <Features />
      <div>
        <h1 className="success-paragraph">
          Every <span className="highlight">success</span> is rewarded!
        </h1>
      </div>
      <div className="mentors-component">
        {/* <Mentors /> */}
        <img className="mentors-image" src={Mentors} alt="mentors-img" />
      </div>
      <div className="picture-group-mentors">
<img src={Picture} alt="picture-group" />
      </div>
      <div>
        <FooterSection />
      </div>
    </div>
  );
};

export default Home;
