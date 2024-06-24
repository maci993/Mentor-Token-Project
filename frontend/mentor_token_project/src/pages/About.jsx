import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./About.css";
import UserCard from "../components/UserCard";
import hero from "../assets/hero.svg";
import Button from "../components/Button";
import Ian from "../assets/Team-Members/ian.png";
import Maya from "../assets/Team-Members/MayaMatt.svg";
import Alex from "../assets/Team-Members/AlexJensen.svg";
import Keira from "../assets/Team-Members/KeiraBattye.svg";
import Dominic from "../assets/Team-Members/DominicGame.svg";
import James from "../assets/Team-Members/JamesVial.svg";
import Footer from "../components/FooterSection"

// import ian from "../assets/Team-Members/ian.jpg"
// import maya from "../assets/Team-Members/maya.jpg"
import alex from "../assets/Team-Members/alex.jpg"
const users = [
  {
    img: Ian,
    name: "Ian Sorell",
    position: "CEO",
    hobby:
      "Enjoys adventurous travel, seeks new cultures and offbeat destinations",
  },
  {
    img: Maya,
    name: "Maya Matt",
    position: "Founder",
    hobby: "Pop music lover, seeks joy and exciting pop concerts",
  },
  {
    img: alex,
    name: "Alex Jensen",
    position: "CTO",
    hobby: "Bookworm, creative software developer with precision",
  },
  {
    img: Keira,
    name: "Keira Battye",
    position: "Product Designer",
    hobby: "Creative painter capturing beauty with imaginative artwork",
  },
  {
    img: Dominic,
    name: "Dominic Game",
    position: "3D Artist",
    hobby: "Football enthusiast, enjoys movie nights with friends",
  },
  {
    img: James,
    name: "James Vial",
    position: "Head of Front-End",
    hobby: "Culinary artist, explores diverse flavors, skilled in cooking",
  },
];

const About = () => {
  const navigate = useNavigate;
  useEffect(() => {});

  return (
    <div className="about-page">
        <div className="team-container">
          {/* <div className="bg-image"> */}
            {/* <img src={hero} alt="hero-background" /> */}
            {/* <div className="text-section"> */}
              <h1>Meet our team members</h1>
              <p>
                We Focus on the details of everything we do. All to help
                businesses around the world
                <br />
                Focus on what's most important to them.
              </p>
              <div className="about-button">
              <Link to={"/contact"}>
                <Button name={"→ Get in touch"} />
              </Link>
              </div>
        </div>
        <div className="user-cards">
        {users.map((user, index) => (
          <UserCard key={index} img={user.img} name={user.name} position={user.position} hobby={user.hobby}/>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default About;
