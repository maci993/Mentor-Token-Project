import React, { useState } from "react";
import JobCard from "./JobCard";
import "./JobList.css"

const JobList = ({ jobs, onCardClick }) => {
    const [category, setCategory] = useState("All");
    const [sorting, setSorting] = useState("Popular")

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
      };
      const handleSorting = (event) => {
        setSorting(event.target.value);
      };

      const filteredJobs = jobs.filter((job) => {
        if (category === 'All') return true;
        return job.category === category;
      });

      const sortedJobs = filteredJobs.sort((a, b) => {
        if (sorting === 'Popular') return b.popularity - a.popularity;
        if (sorting === 'Recent') return new Date(b.postedDate) - new Date(a.postedDate);
        return 0;
      });

      return (
        <div className="job-list-container">
<div className="filter-bar">
<label className="filter-label">Sort by: 
    <select value={sorting} onChange={handleSorting} className="filter-select">
            <option value="Popular">Popular</option>
            <option value="Recent">Recent</option>
          </select></label>
          <label className="filter-label1">
          Category:
          <select value={category} onChange={handleCategoryChange} className="filter-select">
            <option value="All">All</option>
            <option value="Tech">Tech</option>
            <option value="Business">Business</option>
            <option value="Design">Design</option>
          </select>
        </label>
</div>
<div className="job-list-job-feed">
        {sortedJobs.map((job) => (
          <JobCard key={job.id} job={job} onCardClick={onCardClick} />
        ))}
      </div>
        </div>
      );
};

export default JobList;