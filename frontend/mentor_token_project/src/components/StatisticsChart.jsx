import React, { useEffect, useState} from "react";
import Chart from "react-apexcharts";
import "./Statistics.css"

const StatisticsChart = ({ title, description, userType }) => {
    const [dataPoints, setDataPoints] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        const fetchedData = [10, 25, 35, 50, 20, 40, 60, 45, 80, 70, 90, 100]; // Example data
        setDataPoints(fetchedData);
        setLoading(false);
      }, 1000);
    }, []);
  
    useEffect(() => {
      if (dataPoints.length === 0) {
        setError("No data points available");
      } else {
        setError(null);
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
  
    const options = {
      chart: {
        id: "performance-chart",
        type: "line",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: [
          "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", 
          "May", "Jun", "Jul", "Aug", "Sep", "Oct"
        ],
        title: {
          text: "Time Span",
        },
      },
      yaxis: {
        title: {
          text: "Jobs Completed",
        },
      },
      stroke: {
        curve: "smooth",
      },
      dataLabels: {
        enabled: false,
      },
    };
  
    const series = [
      {
        name: "Jobs Completed",
        data: dataPoints,
      },
    ];
  
    return (
      <div className="statistics-card">
        <h2>{title}</h2>
        <p>{description}</p>
        <div className="statistics-chart">
          <Chart
            options={options}
            series={series}
            type="line"
            height="200"
          />
        </div>
      </div>
    );
  };
  
  export default StatisticsChart;