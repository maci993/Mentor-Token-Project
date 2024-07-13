import React from "react";
import "./Statistics.css";
import PropTypes from "prop-types";

const Statistics = ({ title, description, dataPoints }) => {
  const points = dataPoints
    .map((point, index) => `${index * 50},${150 - point}`)
    .join(" ");

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
  const yNumbers = [0, 5000];

  return (
    <div className="statistics-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="statistics-chart">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 500 200"
          preserveAspectRatio="none"
        >
          <polyline
            fill="none"
            stroke="#696CFF"
            strokeWidth="4"
            points={points}
          />
          {yNumbers.map((label, index) => (
            <text
              key={index}
              x="0"
              y={150 - index * 75} 
              fill="#888"
              fontSize="10"
              textAnchor="start"
            >
              {label}
            </text>
          ))}
          {months.map((month, index) => (
            <text
              key={index}
              x={index * 44} 
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

Statistics.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  dataPoints: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Statistics;
