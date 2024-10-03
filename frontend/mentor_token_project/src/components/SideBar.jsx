import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import DashboardIcon from "../assets/Sidebar-icons/category.svg";
import JobsIcon from "../assets/Sidebar-icons/disc.svg";
import MentorIcon from "../assets/Sidebar-icons/profile.svg";
import ArrowIcon from "../assets/Sidebar-icons/icon.svg";
import LogoutIcon from "../assets/Sidebar-icons/logout.svg";
import "./SideBar.css";

const SideBar = ({ role }) => {
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  const menuItems = {
    startup: [
      { name: "Dashboard", path: "/dashboard-startup", icon: DashboardIcon },
      { name: "Mentors", path: "/mentors", icon: MentorIcon },
      { name: "Jobs", path: "/jobs", icon: JobsIcon },
    ],
    mentor: [
      { name: "Dashboard", path: "/dashboard-mentor", icon: DashboardIcon },
      { name: "My Stats", path: "/my-stats", icon: MentorIcon },
      { name: "Job Feed", path: "/job-feed", icon: JobsIcon },
    ],
  };

  const items = menuItems[role];

  if (!items) {
    return <div>Invalid role</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    navigate("/");
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="logo-sidebar">
        {isOpen && <img src={Logo} alt="logo-sidebar" />}
        <img
          className={`arrow-icon-sidebar ${isOpen ? "" : "rotated"}`}
          src={ArrowIcon}
          alt="arrow-icon"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <div className="sidebar-menu">
        {items.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <img src={item.icon} alt={`${item.name.toLowerCase()}-icon`} />
            <span className={`menu-text ${isOpen ? "" : "hidden"}`}>
              {item.name}
            </span>
          </NavLink>
        ))}
      </div>
      {isOpen && (
        <div
          className="sidebar-footer"
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        >
          <img
            src={LogoutIcon}
            className="logout-icon-sidebar"
            alt="logout-icon-sidebar"
          />
          <span className={`logout-span-sidebar ${isOpen ? "" : "hidden"}`}>
            Logout
          </span>
        </div>
      )}
    </div>
  );
};

export default SideBar;
