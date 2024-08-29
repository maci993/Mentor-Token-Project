import React, { useEffect, useState } from "react";
import "./Statistics.css";

const Statistics = ({ title, description, userType }) => {
  const [dataPoints, setDataPoints] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  if (dataPoints.length === 0) {
    return (
      <div className="statistics-card">
        <h2>{title}</h2>
        <p>{description}</p>
        <p className="no-data-message">
          No statistics available for this user.
        </p>
      </div>
    );
  }

  useEffect(() => {
    if (dataPoints.length === 0) {
      setError("No data points available");
    } else {
      setError(null);
      setLoading(false);
    }
  }, [dataPoints]);

  if (loading) {
    return <p>Loading statistics...</p>;
  }

  if (error) {
    return (
      <div className="statistics-card">
        <h2>{title}</h2>
        <p>{description}</p>
        <p className="no-data-message">{error}</p>
      </div>
    );
  }

  // Max value in data points
  const maxDataPoint = Math.max(...dataPoints, 5000);

  // //svg points-generate
  const points = dataPoints
    .map(
      (point, index) =>
        `${(index * 500) / (dataPoints.length - 1)},${
          150 - (point / maxDataPoint) * 150
        }`
    )
    .join(" ");

  //labels for moths
  const months = [
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
  ];

  return (
    <div className="statistics-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="statistics-chart">
        <svg
          width="100%"
          height="200%"
          viewBox="0 0 500 200"
          preserveAspectRatio="none"
        >
          {/*this line represent the data points */}
          <polyline
            fill="none"
            stroke="#696CFF"
            strokeWidth="4"
            points={points}
          />
          {/*y- axis (0 and max value) */}
          <text x="0" y="155" fill="#888" fontSize="10" textAnchor="start">
            0
          </text>

          {/*y-axis labels for months */}
          {months.map((month, index) => (
            <text
              key={index}
              x={(index * 500) / (months.length - 1)}
              y="170"
              fill="#888"
              fontSize="10"
              textAnchor="middle"
            >
              {month}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default Statistics;
