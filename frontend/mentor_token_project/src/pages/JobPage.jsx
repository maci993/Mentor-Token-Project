import React, { useState } from "react";
import JobFeed from "../components/JobFeed";
import ApplicationSent from "../components/ApplicationSent";
import JobModal from "../components/JobModal";

const JobPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleJobApplied = () => {
    setRefreshTrigger(!refreshTrigger);
  };

  return (
    <div>
      <JobFeed onJobSelect={setSelectedJob} />
      <ApplicationSent
        title="Applications sent"
        description="Jobs you have applied to"
        refreshTrigger={refreshTrigger}
      />
      <JobModal
        isOpen={!!selectedJob}
        isClosed={() => setSelectedJob(null)}
        job={selectedJob}
        onJobApplied={handleJobApplied}
      />
    </div>
  );
};

export default JobPage;
