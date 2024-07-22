import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import UserDropdownInfo from "../components/UserDropdownInfo";
import Kirra from "../assets/KirraPress.png";
import JobCard from "../components/JobCard";
import JobList from "../components/JobList"
import CompanyLogo from "../assets/Job-Feed/companyLogo.svg"
import CompanyLogo1 from "../assets/Job-Feed/companyLogo1.svg"
import CompanyLogo2 from "../assets/Job-Feed/companyLogo2.svg"
import CompanyLogo3 from "../assets/Job-Feed/companyLogo3.svg"
import CompanyLogo4 from "../assets/Job-Feed/companyLogo4.svg"
import "./JobFeed.css";

const JobFeed = () => {
    const [role, setRole] = useState(null);
    const [job, setJob] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        const myToken = jwtDecode(localStorage.getItem("jwt_token"));
        console.log("Retrieved role:", myToken.type);
        setRole(myToken.type);
    
    
    

      const jobs = [
        {
          id: 1,
          companyLogo: CompanyLogo,
          companyName: 'TechWave Innovations',
          jobTitle: 'New Job Offer',
          description: 'Lorem ipsum dolor sit amet consectetur. Facilisis nunc ut tellus augue a aliquam arcu. Libero imperdiet odio sed morbi quis felis proin.',
          category: 'Tech',
          popularity: 100,
          postedDate: '2023-07-20',
        },
        {
          id: 2,
          companyLogo: CompanyLogo1,
          companyName: 'TechWave Innovations',
          jobTitle: 'New Job Offer',
          description: 'Lorem ipsum dolor sit amet consectetur. Facilisis nunc ut tellus augue a aliquam arcu. Libero imperdiet odio sed morbi quis felis proin.',
          category: 'Business',
          popularity: 50,
          postedDate: '2023-07-21',
        },
        {
            id: 2,
            companyLogo: CompanyLogo2,
            companyName: 'TechWave Innovations',
            jobTitle: 'New Job Offer',
            description: 'Lorem ipsum dolor sit amet consectetur. Facilisis nunc ut tellus augue a aliquam arcu. Libero imperdiet odio sed morbi quis felis proin.',
            category: 'Business',
            popularity: 50,
            postedDate: '2023-07-21',
          },
          {
            id: 2,
            companyLogo: CompanyLogo3,
            companyName: 'TechWave Innovations',
            jobTitle: 'New Job Offer',
            description: 'Lorem ipsum dolor sit amet consectetur. Facilisis nunc ut tellus augue a aliquam arcu. Libero imperdiet odio sed morbi quis felis proin.',
            category: 'Business',
            popularity: 50,
            postedDate: '2023-07-21',
          },
          {
            id: 2,
            companyLogo: CompanyLogo4,
            companyName: 'TechWave Innovations',
            jobTitle: 'New Job Offer',
            description: 'Lorem ipsum dolor sit amet consectetur. Facilisis nunc ut tellus augue a aliquam arcu. Libero imperdiet odio sed morbi quis felis proin.',
            category: 'Business',
            popularity: 50,
            postedDate: '2023-07-21',
          },
          {
            id: 2,
            companyLogo: CompanyLogo1,
            companyName: 'TechWave Innovations',
            jobTitle: 'New Job Offer',
            description: 'Lorem ipsum dolor sit amet consectetur. Facilisis nunc ut tellus augue a aliquam arcu. Libero imperdiet odio sed morbi quis felis proin.',
            category: 'Business',
            popularity: 50,
            postedDate: '2023-07-21',
          },
          {
            id: 2,
            companyLogo: CompanyLogo3,
            companyName: 'TechWave Innovations',
            jobTitle: 'New Job Offer',
            description: 'Lorem ipsum dolor sit amet consectetur. Facilisis nunc ut tellus augue a aliquam arcu. Libero imperdiet odio sed morbi quis felis proin.',
            category: 'Business',
            popularity: 50,
            postedDate: '2023-07-21',
          },
          {
          id: 2,
          companyLogo: CompanyLogo2,
          companyName: 'TechWave Innovations',
          jobTitle: 'New Job Offer',
          description: 'Lorem ipsum dolor sit amet consectetur. Facilisis nunc ut tellus augue a aliquam arcu. Libero imperdiet odio sed morbi quis felis proin.',
          category: 'Business',
          popularity: 50,
          postedDate: '2023-07-21',
        },
      ];

      setJob(jobs);
      setFilteredJobs(jobs);
    }, []);

    const handleSearch = (query) => {
        const filtered = job.filter((job) =>
          job.companyName.toLowerCase().includes(query.toLowerCase()) ||
          job.jobTitle.toLowerCase().includes(query.toLowerCase()) ||
          job.description.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredJobs(filtered);
      };

    return(
     <div className="job-feed-page">
        <div className="sidebar-job-feed">
        <SideBar role={role} />
      </div>
      <div className="search-bar-job-feed">
        <SearchBar placeholder="Search" onSearch={handleSearch}/>
      </div>
      <div className="user-dropdown-menu-stats">
        <UserDropdownInfo
          userImg={Kirra}
          userName="Kirra Press"
          userTitle="Mentor"
        />
         </div>
         <div className="job-card-job-feed">
            <h1>Your Startup Jobs</h1>
            <JobList jobs={filteredJobs} />
         </div>
     </div>
    )
}

export default JobFeed;