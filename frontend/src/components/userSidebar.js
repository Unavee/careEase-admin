import React, { useState } from "react";
import { FaHome, FaUser, FaHistory, FaCog, FaBars, FaChevronLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const UserSidebar = () => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const menuItems = [
        { label: "Dashboard", icon: <FaHome />, link: "/userdashboard" },
        { label: "Profile", icon: <FaUser />, link: "/userdashboard/profile" },
        { label: "History", icon: <FaHistory />, link: "/history" },
        { label: "Settings", icon: <FaCog />, link: "/settings" },
    ];

    return (
        <div
            className={`transition-all duration-300 ease-in-out bg-white text-black ${
                isExpanded ? "w-64" : "w-20"
            } h-full shadow-md`}
        >
            <div className="flex justify-between items-center p-4">
                <h1 className={`text-lg font-bold ${!isExpanded && "hidden"}`}>CareEase</h1>
                <button
                    onClick={toggleSidebar}
                    className="text-black focus:outline-none"
                >
                    {isExpanded ? (
                        <FaChevronLeft className="text-2xl" />
                    ) : (
                        <FaBars className="text-2xl" />
                    )}
                </button>
            </div>
            <ul className="mt-8 space-y-4">
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
    );
};

export default UserSidebar;
