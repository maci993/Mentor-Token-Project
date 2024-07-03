import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import DashboardIcon from "../assets/Sidebar-icons/category.svg"
import JobsIcon from "../assets/Sidebar-icons/disc.svg"
import MentorIcon from "../assets/Sidebar-icons/profile.svg"
import ArrowIcon from "../assets/Sidebar-icons/icon.svg"
import LogoutIcon from "../assets/Sidebar-icons/logout.svg"
import "./SideBar.css";

const SideBar = ({ role }) => {
  const menuItems = {
    company: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Mentors", path: "/mentors" },
      { name: "Jobs", path: "/jobs" },
    ],
    mentor: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "My Stats", path: "/my-stats" },
      { name: "Job Feed", path: "/job-feed" },
    ],
  };


  const items = menuItems[role];

  if (!items) {
    return <div>Invalid role</div>;
  }

  return (
    <div className="sidebar">
      <div className="logo-sidebar">
        <img src={Logo} alt="logo-sidebar" />
        <img className="arrow-icon-sidebar" src={ArrowIcon} alt="arrow-icon" />
      </div>
      <div className="sidebar-menu">
     
        <img src={DashboardIcon} alt="dashboard-icon" />
        <NavLink to="/dashboard" className="dasboard-sidebar">Dashboard<br />
        </NavLink><br />
        <img src={MentorIcon} alt="mentor-icon" />
        <NavLink to="/mentors" className="mentors-sidebar">Mentors<br />
        </NavLink><br />
        <img src={JobsIcon} alt="jobs-icon" />
        <NavLink to="/jobs" className="jobs-sidebar">Jobs<br />
        </NavLink>
        {items.map((item, index) => {
          <NavLink
            key={index}
            to={item.path}
            className={"menu-item"}
            ClassName={({ isActive }) => 
            `${isActive ? "menu-item active" : "menu-item"} ${item.className || ""}`}
          >
            <span>{item.name}</span>
          </NavLink>
        })}
      </div>
      <div className="sidebar-footer">
        <img src={LogoutIcon}  className="logout-icon-sidebar" alt="logout-icon-sidebar" />
        <span className="logout-span-sidebar">Logout</span>
      </div>
    </div>
  );
};

export default SideBar;
