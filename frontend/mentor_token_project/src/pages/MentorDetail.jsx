import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import UserDropdownInfo from "../components/UserDropdownInfo";
import UserInfoCard from "../components/UserInfoCard";
import UserAboutCard from "../components/UserAboutCard";
import AssignedJobs from "../components/AssignedJobs";
import PendingJobs from "../components/PendingJobs";
import OfferJobModal from "../components/OfferJobModal";
// import Kirra from "../assets/KirraPress.png";
import UserCompany from "../assets/userStartupAvatar.png";
import { jwtDecode } from "jwt-decode";
import defaultLogo from "../assets/Mentors-icons/profile.svg";
import "./MentorDetail.css";

const MentorDetail = () => {
  // const mentorData = {
  //   _id: "1234567890abcdef12345678",
  //   name: "Kierra Press",
  //   title: "Sales Representative",
  //   email: "mentormail@mail.com",
  //   phone: "+389 77 663 234",
  //   image: Kirra,
  //   skills: ["Sales", "Management", "Problem-solving"],
  //   desc: "Field sales training. 5+ years in an outside sales position",
  //   totalJobs: 132,
  //   totalAssignedJobs: 43,
  //   finishedJobs: 63,
  // };

  const { id: mentorId } = useParams();
  const [role, setRole] = useState(null);
  // const [mentor] = useState(mentorData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [mentorInfo, setMentorInfo] = useState(null);

  useEffect(() => {
    const fetchMentorInfo = async () => {
      try {
        const token = localStorage.getItem("jwt_token");
        if (!token) {
          throw new Error("Token not found. Please log in again.");
        }

        console.log("Token:", token);

        const myToken = jwtDecode(token);
        setRole(myToken.type);

        const res = await fetch(
          `http://localhost:10000/api/users/${mentorId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          const mentorData = await res.json();
          setMentorInfo(mentorData);
        } else {
          console.error("Error fetching mentor info:", res.statusText);
          setError(res.statusText);
        }
      } catch (error) {
        console.error("Error fetching mentor info:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorInfo();
  }, [mentorId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!mentorInfo) {
    return <div>No mentor information available</div>;
  }

  const handleSave = (newData) => {
    setDescription(newData.description);
    setSkills(newData.skills);
  };

  const handleOfferJob = () => {
    setShowOfferModal(true);
  };

  return (
    <div className="mentor-detail-page">
      <header className="mentor-detail-header">
        <SearchBar
          className="search-bar-mentor-detail-page"
          placeholder="Search"
        />
        <UserDropdownInfo
          userImg={UserCompany}
          userName="TechWave"
          userTitle="Innovations"
          className="user-dropdown-mentor-detail-page"
        />
      </header>
      <div className="sidebar-mentor-detail">
        <SideBar role={role} />
      </div>
      <div className="user-info-card-mentor-detail">
        <UserInfoCard
          image={mentorInfo.image || defaultLogo}
          name={mentorInfo.name}
          title={mentorInfo.title}
          email={mentorInfo.email}
          phone={mentorInfo.phone}
        />
      </div>
      <div className="user-about-card-mentor-detail">
        <UserAboutCard
          about="About Mentor"
          skills={mentorInfo.skills}
          description={mentorInfo.desc}
          onSave={handleOfferJob}
          onOfferJob={handleOfferJob}
          showOfferButton={true}
        />
      </div>
      <div className="assigned-jobs-section-mentor-detail">
        <AssignedJobs jobs={mentorInfo.assignedJobs} />
      </div>
      <div className="pending-jobs-section-mentor-detail">
        <h2 className="title-pending-jobs">Pending Job Offers</h2>
        <PendingJobs jobs={mentorInfo.pendingJobs} />
      </div>
      {showOfferModal && (
        <OfferJobModal
          mentorId={mentorInfo._id}
          onClose={() => setShowOfferModal(false)}
        />
      )}
    </div>
  );
};

export default MentorDetail;
