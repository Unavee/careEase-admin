import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { FaDownload } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TrafficDashboard = () => {
  const [timeFilter, setTimeFilter] = useState("Month");

  const generateChartData = () => {
    const labels = timeFilter === "Day" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    return {
      labels,
      datasets: [
        {
          label: "Visits",
          data: labels.map(() => Math.floor(Math.random() * 200)),
          borderColor: "#3B82F6",
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          tension: 0.4,
          pointRadius: 3,
        },
        {
          label: "Unique Users",
          data: labels.map(() => Math.floor(Math.random() * 150)),
          borderColor: "#10B981",
          backgroundColor: "rgba(16, 185, 129, 0.2)",
          tension: 0.4,
          pointRadius: 3,
        },
      ],
    };
  };

  return (
    <div className="bg-gray-50 p-6 min-h-screen mt-2 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-blue-800">Traffic</h1>
        <button className="bg-primary-blue text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-primary-green">
          <FaDownload /> Download
        </button>
      </div>
      
      {/* Time Filter */}
      <div className="flex space-x-2 mb-4">
        {["Day", "Month", "Year"].map((filter) => (
          <button 
            key={filter} 
            onClick={() => setTimeFilter(filter)} 
            className={`px-4 py-2 rounded ${timeFilter === filter ? "bg-gradient-to-br from-blue-100/60 to-teal-200/40 text-blue-800" : "bg-gradient-to-bl from-blue-400 to-teal-500 text-white"}`}
          >
            {filter}
          </button>
        ))}
      </div>
      
      {/* Line Chart */}
      <div className="bg-white p-4 rounded-xl shadow-md h-80">
        <Line 
          data={generateChartData()} 
          options={{ 
            responsive: true, 
            maintainAspectRatio: false,
            aspectRatio: 1.5,
            plugins: { 
              legend: { display: true }, 
              tooltip: { enabled: true },
            },
            scales: {
              x: { grid: { display: false } },
              y: { grid: { color: "#E5E7EB" } },
            },
          }} 
        />
      </div>
      
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-6 ">
        {[{ title: "Visits", value: "29,703 Users", percentage: 40 },
          { title: "Unique", value: "24,093 Users", percentage: 20 },
          { title: "Pageviews", value: "78,706 Views", percentage: 60 },
          { title: "New Users", value: "22,123 Users", percentage: 80 },
          { title: "Bounce Rate", value: "40.15%", percentage: 40 }].map((item, i) => (
          <div key={i} className="bg-gradient-to-br from-blue-100/60 to-teal-200/40 p-4 rounded-xl shadow-md flex flex-col items-center">
            <p className="text-blue-800 text-sm font-semibold">{item.title}</p>
            <p className="text-lg font-semibold">{item.value}</p>
            <p className={item.percentage > 50 ? "text-red-500" : "text-green-500"}>{item.percentage}% {item.percentage > 50 ? "↓" : "↑"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficDashboard;
