import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import DashboardIcon from "../assets/Sidebar-icons/category.svg";
import JobsIcon from "../assets/Sidebar-icons/disc.svg";
import MentorIcon from "../assets/Sidebar-icons/profile.svg";
import ArrowIcon from "../assets/Sidebar-icons/icon.svg";
import LogoutIcon from "../assets/Sidebar-icons/logout.svg";
import "./SideBar.css";

const SideBar = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = {
    startup: [
      { name: "Dashboard", path: "/dashboard-startup", icon: DashboardIcon },
      { name: "Mentors", path: "/mentors", icon: MentorIcon },
      { name: "Jobs", path: "/jobs", icon: JobsIcon },
    ],
    mentor: [
      { name: "Dashboard", path: "/dashboard-mentor", icon: DashboardIcon },
      { name: "My Stats", path: "/my-stats", icon: MentorIcon },
      { name: "Job Feed", path: "/job-feed", JobsIcon },
    ],
  };

  const items = menuItems[role];

  if (!items) {
    return <div>Invalid role</div>;
  }

  return (
//     <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
//       <div className="logo-sidebar">
//         {isOpen && <img src={Logo} alt="logo-sidebar" />}
//         <img className={`arrow-icon-sidebar ${isOpen ? "" : "rotated"}`} src={ArrowIcon} alt="arrow-icon" onClick={() => setIsOpen(!isOpen)}/>
//       </div>
//       {isOpen && (
//       <div className="sidebar-menu">
//         {items.map((item, index) => {
//           <NavLink
//             key={index}
//             to={item.path}
//             className={"menu-item"}
//             ClassName={({ isActive }) =>
//               `menu-item ${isActive ? "active" : ""}`
//             }
//           >
//             <span className={`menu-text ${isOpen ? "" : "hidden"}`}>{item.name}</span>
//           </NavLink>;
//         })}
//         <img src={DashboardIcon} alt="dashboard-icon" />
//         <NavLink to="/dashboard-startup" className="dasboard-sidebar">
//           Dashboard
//           <br />
//         </NavLink>
//         <br />
//         <img src={MentorIcon} alt="mentor-icon" />
//         <NavLink to="/mentors" className="mentors-sidebar">
//           Mentors
//           <br />
//         </NavLink>
//         <br />
//         <img src={JobsIcon} alt="jobs-icon" />
//         <NavLink to="/jobs" className="jobs-sidebar">
//           Jobs
//           <br />
//         </NavLink>
//       </div>
// )}
// {isOpen && (
//       <div className="sidebar-footer">
//         <img
//           src={LogoutIcon}
//           className="logout-icon-sidebar"
//           alt="logout-icon-sidebar"
//         />
//         <span className={`logout-span-sidebar ${isOpen ? "" : "hidden"}`}>Logout</span>
//       </div>
//        )}
//     </div>
//   );

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
            className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
          >
            <img src={item.icon} alt={`${item.name.toLowerCase()}-icon`} />
            <span className={`menu-text ${isOpen ? "" : "hidden"}`}>
              {item.name}
            </span>
          </NavLink>
        ))}
      </div>
      {isOpen && (
        <div className="sidebar-footer">
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
