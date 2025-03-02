import React, { useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { FaDownload } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

const TrafficSale = () => {
  const [timeFilter, setTimeFilter] = useState("Month");

  const generateChartData = () => {
    const labels = timeFilter === "Day" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    return {
      labels,
      datasets: [
        {
          label: "New Patients",
          data: labels.map(() => Math.floor(Math.random() * 300)),
          borderColor: "#3B82F6",
          backgroundColor: "rgba(59, 130, 246, 0.6)",
          tension: 0.4,
          pointRadius: 3,
        },
        {
          label: "New Caregivers",
          data: labels.map(() => Math.floor(Math.random() * 200)),
          borderColor: "#10B981",
          backgroundColor: "rgba(16, 185, 129, 0.6)",
          tension: 0.4,
          pointRadius: 3,
        },
      ],
    };
  };


    const genderData = {
      labels: ["Male", "Female"],
      datasets: [
        {
          data: [53, 43], // Percentage values
          backgroundColor: ["#3b82f6", "#22c55e"], // Blue & Green
          hoverBackgroundColor: ["#2563eb", "#16a34a"],
        },
      ],
    };

    const genderOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
      layout: {
        padding: 20, // Adds space around the chart
      },
      elements: {
        arc: {
          borderWidth: 2, // Adjusts border for better clarity
          radius: 50, // Reduces pie chart size (default is full container)
        },
      },
    };
  
    const mediaData = {
      labels: ["Organic Search", "Facebook", "Instagram", "X (Twitter)", "LinkedIn"],
      datasets: [
        {
          data: [56, 15, 15, 11, 8], // Percentage values
          backgroundColor: ["#22c55e", "#1877F2", "#E1306C", "#1DA1F2", "#0077B5"],
          hoverBackgroundColor: ["#16a34a", "#0b5ed7", "#C13584", "#1991DA", "#005582"],
        },
      ],
    };
  
    const mediaOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
      layout: {
        padding: 20, // Adds space around the chart
      },
      elements: {
        arc: {
          borderWidth: 2, // Adjusts border for better clarity
          radius: 50,    // Reduces pie chart size (default is full container)
        },
      },
    };

  return (
    <div className="bg-gray-50 p-6 min-h-screen mt-2 rounded-lg shadow-md" >
      {/* Header */}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-blue-800">Traffic & Sales</h1>
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
      
      {/* Horizontal Bar Chart */}

      <div className="bg-white p-4 rounded-xl shadow-md h-80 mt-6">
        <Bar
          data={generateChartData()}
          options={{
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: true },
              tooltip: { enabled: true },
            },
            scales: {
              x: { grid: { color: "#E5E7EB" } },
              y: { grid: { display: false } },
            },
          }}
        />
      </div>
      
      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-around gap-4 mt-6">
        {[{ title: "New Patients", value: "9,123", percentage: 30 },
          { title: "New Caregivers", value: "5,213", percentage: 20 },
          
          { title: "Pageviews", value: "78,623", percentage: 60 }].map((item, i) => (
          <div key={i} className="bg-gradient-to-br from-blue-100/60 to-teal-200/40 p-4 rounded-xl shadow-md flex flex-col font-semibold items-center w-full">
            <p className="text-blue-800 text-sm">{item.title}</p>
            <p className="text-lg font-semibold">{item.value}</p>
            <p className={item.percentage > 50 ? "text-red-500" : "text-green-500"}>{item.percentage}% {item.percentage > 50 ? "↓" : "↑"}</p>
          </div>
        ))}
      </div>
      
      {/* Gender & Social Media Data */}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
  {/* Gender Stats with Progress Bars */}

  <div className="relative bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100 to-teal-200 opacity-20"></div>
    
    <h2 className="text-xl font-bold mb-4 flex  text-blue-800 items-center gap-2 relative">
      {/* <span className="">
        <i className="fas fa-user-friends"></i>
        </span>  */}
      Caregivers by Gender
    </h2>

    <div className="relative space-y-4 text-lg ">
    <Pie data={genderData} options={genderOptions} />
      <div className="flex justify-between items-center">
        <p className="text-primary-blue font-medium flex items-center gap-2">
          <i className="fas fa-mars"></i> Male
        </p>
        <span className="font-bold ">53%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className="bg-primary-blue h-3 rounded-full" style={{ width: "53%" }}></div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-primary-green font-medium flex items-center gap-2">
          <i className="fas fa-venus"></i> Female
        </p>
        <span className="font-bold">43%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className="bg-primary-green h-3 rounded-full" style={{ width: "43%" }}></div>
      </div>
    </div>
   
  </div>

  {/* Social Media Stats with Graphical Bars */}

  <div className="relative bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
    
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-100 to-blue-200 opacity-20"></div>
    
    <h2 className="text-xl font-bold mb-4 flex  text-blue-800 items-center gap-2 relative">
      {/* <span className="text-green-500"><i className="fas fa-chart-line"></i></span>  */}
      Social Media Reach
    </h2>

    <div className="relative space-y-4 text-lg">
    <Pie data={mediaData} options={mediaOptions} />
      <div className="flex justify-between items-center">
        <p className="text-green-500 flex items-center gap-2">
          <i className="fas fa-search"></i> Organic Search
        </p>
        <span className="font-bold">56%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className="bg-green-500 h-3 rounded-full" style={{ width: "56%" }}></div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-blue-800 flex items-center gap-2">
          <i className="fab fa-facebook"></i> Facebook
        </p>
        <span className="font-bold">15%</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className="bg-blue-500 h-3 rounded-full" style={{ width: "15%" }}></div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-blue-800 flex items-center gap-2">
          <i className="fab fa-facebook"></i> Instagram
        </p>
        <span className="font-bold">15%</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className="bg-blue-500 h-3 rounded-full" style={{ width: "30%" }}></div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-blue-800 flex items-center gap-2">
          <i className="fab fa-twitter"></i> X
        </p>
        <span className="font-bold">11%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className="bg-gray-500 h-3 rounded-full" style={{ width: "11%" }}></div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-blue-800 flex items-center gap-2">
          <i className="fab fa-linkedin"></i> LinkedIn
        </p>
        <span className="font-bold">8%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className="bg-blue-700 h-3 rounded-full" style={{ width: "8%" }}></div>
      </div>
    </div>
  </div>
</div>


    </div>
  );
};

export default TrafficSale;
