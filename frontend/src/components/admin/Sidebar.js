import React, { useState } from "react";
import {
  FaHome,
  FaUserNurse,
  FaUserInjured,
  FaHospitalUser,
  FaChartBar,
  FaBars,
  FaChevronLeft,
  FaHourglassHalf,
} from "react-icons/fa";

const Sidebar = ({ setSelectedComponent }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  console.log("Sidebar -> setSelectedComponent:", setSelectedComponent); 

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    { label: "Dashboard", icon: <FaHome  className="text-blue-800"/> },
    { label: "CareGiver", icon: <FaUserNurse className="text-blue-800"/> },
    { label: "Pendings", icon: <FaHourglassHalf className="text-blue-800"/> },
    { label: "Patients", icon: <FaUserInjured className="text-blue-800"/> },
    { label: "Reports", icon: <FaChartBar className="text-blue-800"/> },
  ];

  return (
    <div
      className={`w-${
        isExpanded ? "64" : "16"
      } transition-all duration-300 bg-white h-screen`}
    >
      
       
  <button
  onClick={toggleSidebar}
  className="flex items-center text-blue-800 justify-center p-2 rounded-md hover:bg-teal-50 transition duration-200"
>
  {isExpanded ? (
    <FaChevronLeft className="text-2xl" />
  ) : (
    <FaBars className="text-2xl" />
  )}
</button>

      
    

<ul className="mt-4 space-y-2">
  {menuItems.map((item, index) => (
    <li key={index} className="relative group">
      <button
        onClick={() => setSelectedComponent(item.label)}
        className="flex items-center space-x-4 rounded-md p-4 w-full text-left hover:bg-teal-100"
      >
        <span className="text-xl">{item.icon}</span>
        {isExpanded && <span >{item.label}</span>}
      </button>

      {/* Tooltip (Visible only when sidebar is collapsed) */}
      {!isExpanded && (
        <span className="absolute z-50 left-14 top-1/2 transform -translate-y-1/2 bg-primary-blue text-white text-sm px-2 font-semibold py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          {item.label}
        </span>
      )}
    </li>
  ))}
</ul>

    </div>
  );
};

export default Sidebar;
