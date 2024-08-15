import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import UserDropdownInfo from "../components/UserDropdownInfo";
import UserInfoCard from "../components/UserInfoCard";
import UserAboutCard from "../components/UserAboutCard";
import AssignedJobs from "../components/AssignedJobs";
import PendingJobs from "../components/PendingJobs";
import QuickOverviewCard from "../components/QuickOverviewCard";
import OfferJobModal from "../components/OfferJobModal";
import Kirra from "../assets/KirraPress.png";
import UserCompany from "../assets/userStartupAvatar.png";
import { jwtDecode } from "jwt-decode";
import "./MentorDetail.css";

const MentorDetail = () => {
  const mentorData = {
    _id: "1234567890abcdef12345678",
    name: "Kierra Press",
    title: "Sales Representative",
    email: "mentormail@mail.com",
    phone: "+389 77 663 234",
    image: Kirra,
    skills: ["Sales", "Management", "Problem-solving"],
    desc: "Field sales training. 5+ years in an outside sales position",
    totalJobs: 132,
    totalAssignedJobs: 43,
    finishedJobs: 63,
  };

  const [role, setRole] = useState(null);
  const [mentor] = useState(mentorData);
  const [showOfferModal, setShowOfferModal] = useState(false);

  useEffect(() => {
    const myToken = jwtDecode(localStorage.getItem("jwt_token"));
    console.log("Retrieved role:", myToken.type);
    setRole(myToken.type);
  }, []);

  const handleOfferJob = () => {
    setShowOfferModal(true);
  };

  return (
    <div className="mentor-detail-page">
      <header className="mentor-detail-header">
        <SearchBar placeholder="Search" />
        <UserDropdownInfo
          userImg={UserCompany}
          userName="TechWave"
          userTitle="Innovations"
        />
      </header>
      <div className="sidebar-mentor-detail">
        <SideBar role={role} />
      </div>
      <div className="user-info-card-mentor-detail">
        <UserInfoCard
          image={mentor.image}
          name={mentor.name}
          title={mentor.title}
          email={mentor.email}
          phone={mentor.phone}
          
        />
        </div>
        <div className="user-about-card-mentor-detail">
        <UserAboutCard
          about="About Mentor"
          skills={mentor.skills}
          description={mentor.desc}
          onSave={handleOfferJob}

        />
        </div>
        {showOfferModal && (
          <OfferJobModal
            mentorId={mentor._id}
            onClose={() => setShowOfferModal(false)}
          />
        )}
        <div className="assigned-jobs-section-mentor-detail">
          <AssignedJobs jobs={mentor.assignedJobs} />
        </div>
        <div className="pending-jobs-section">
          <h2>Pending Job Offers</h2>
          <PendingJobs jobs={mentor.pendingJobs} />
        </div>
        <div className="quick-overview-section">
          <QuickOverviewCard
            totalJobs={mentor.totalJobs}
            totalAssignedJobs={mentor.totalAssignedJobs}
            finishedJobs={mentor.finishedJobs}
          />
        </div>
      </div>

  );
};

export default MentorDetail;
