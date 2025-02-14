import React, { Profiler, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Activity, HeartPulse, Pill, Menu, X, User2 } from 'lucide-react';
import { FaHome } from "react-icons/fa";
const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    { label: "Dashboard", icon: <FaHome />, link: "/caredashboard" },
    { label: "Patients", icon: <Users size={20} />, link: "/caredashboard/patients" },
    { label: "Profile", icon: <User2 size={20} />, link: "/caredashboard/careProfile" },
    // { label: "Monitoring", icon: <Activity size={20} />, link: "/monitoring" },
    // { label: "Vitals", icon: <HeartPulse size={20} />, link: "/vitals" },
    // { label: "Medications", icon: <Pill size={20} />, link: "/medications" }
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ease-in-out bg-white text-black ${isExpanded ? "w-fit" : "w-16"} h-full shadow-md flex flex-col`}>
        <div className="flex justify-between items-center p-4">
          <h1 className={`text-lg font-bold ${!isExpanded && "hidden"}`}>CareEase</h1>
          <button onClick={toggleSidebar} className="text-black focus:outline-none">
            {isExpanded ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <ul className="mt-8 space-y-4 flex-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `flex items-center space-x-4 p-4 rounded-md transition-colors duration-200 ${
                    isActive ? "bg-gray-200" : "hover:bg-gray-100"
                  }`
                }
              >
                <span className="text-primary-blue text-xl">{item.icon}</span>
                {isExpanded && <span className="font-medium">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
