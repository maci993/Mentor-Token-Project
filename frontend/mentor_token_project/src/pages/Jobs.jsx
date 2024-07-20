// import React, { useState, useEffect } from "react";

// const Jobs = () => {
//   const token = window.localStorage.getItem("token");
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchJobPosts = async () => {
//     try {
//       const res = await fetch("/api/jobs", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (res.ok) {
//         const data = await res.json();
//         setJobs(data);
//       } else {
//         console.error("Error fetching jobs:", res.statusText);
//         setError(res.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobPosts();
//   }, []);

//   if (loading) {
//     return <p>Loading jobs...</p>;
//   }

//   if (error) {
//     return <p>Error loading jobs: {error}</p>;
//   }

//   return (
//     <div>
//       <h1>JOBS</h1>
//       {jobs.map((job) => (
//         <div key={job._id}>
//           <h2>{job.title}</h2>
//           <p>{job.content}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Jobs;