"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserNurse, FaHandHoldingHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Services = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const navigate = useNavigate();

  const handleLearnMore = (content) => {
    setPopupContent(content);
    setShowPopup(true);
  };
  
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  
  const handleNavigation = (path) => {
    navigate(path);  // Use React Router's navigate instead of Next.js router.push
  };

  const services = [
    {
      title: "Find Caregiver",
      description: "Discover skilled caregivers for your loved ones.",
      icon: <FaUserNurse size={50} className="text-blue-500 drop-shadow-lg" />,
      path: "/userdashboard",
      details:
        "We connect you with trusted caregivers for personalized care and professional support tailored to individual needs.",
    },
    {
      title: "Provide Care",
      description: "Join our network and help those in need.",
      icon: <FaHandHoldingHeart size={50} className="text-green-500 drop-shadow-lg" />,
      path: "/providecare",
      details:
        "Become a caregiver and make a meaningful impact by providing compassionate care to those who need it the most.",
    },
  ];

  return (
    <div className="p-6 pt-20 min-h-screen bg-white flex flex-col items-center">
      {/* Header - No Background, Clean iOS Look */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-3xl font-bold text-gray-900 tracking-tight mt-4"
      >
        Our Services
      </motion.h2>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 w-full max-w-2xl">
        {services.map((service, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-gray-50 p-6 rounded-2xl shadow-md text-center flex flex-col items-center border border-gray-200"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <div className="flex gap-4 justify-center">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleLearnMore(service.details)}
                className="bg-blue-500 text-white px-5 py-2 rounded-xl shadow-md hover:bg-blue-600 transition-all"
              >
                Learn More
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation(service.path)}
                className="bg-green-500 text-white px-5 py-2 rounded-xl shadow-md hover:bg-green-600 transition-all"
              >
                Continue
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 p-4"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md relative border border-gray-200"
            >
              <button
                onClick={handleClosePopup}
                className="absolute top-2 right-2 text-2xl font-bold text-gray-500 hover:text-gray-800 transition-transform transform hover:scale-110"
              >
                &times;
              </button>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Details</h3>
              <p className="text-gray-700">{popupContent}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;
