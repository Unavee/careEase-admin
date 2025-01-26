import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserNurse, FaHandHoldingHeart, FaCalendarCheck, FaBaby, FaChild, FaAmbulance, FaCut, FaDumbbell, FaHospital, FaWheelchair, FaHeartbeat } from "react-icons/fa"; // Importing required icons

export default function Services() {
  const [activeTopic, setActiveTopic] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [activePopupTopic, setActivePopupTopic] = useState(null);

  const navigate = useNavigate();

  const handleLearnMore = (topic) => {
    setActiveTopic(topic);
    setPopupContent(content[topic].details);
    setActivePopupTopic(topic);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setActiveTopic(null);
  };

  const handleFutureDevelopment = (topic) => {
    if (topic === "findCaregiver") {
      navigate("/bookingPage");
    } else {
      navigate("/providecare");
    }
  };

  const content = {
    findCaregiver: {
      title: "Find Caregiver",
      icon: <FaUserNurse size={48} className="text-primary-blue" />,
      brief: "Discover compassionate and skilled caregivers to ensure the well-being of your loved ones.",
      details:
        "Finding the right caregiver is crucial to providing the care your loved ones deserve. At CareEase, we simplify the process by connecting you with trained professionals who are passionate about their work. Whether it's help with daily tasks, companionship, or specialized medical care, our network of caregivers is ready to meet your needs. Trust us to help you find personalized care solutions that ensure peace of mind for you and your family.",
    },
    provideCare: {
      title: "Provide Care",
      icon: <FaHandHoldingHeart size={48} className="text-primary-blue" />,
      brief: "Join our network of caregivers and make a meaningful difference in people's lives.",
      details:
        "Becoming a caregiver with CareEase allows you to support individuals in need while advancing your career. At CareEase, we deeply value the contributions of caregivers who are not only skilled and experienced but also compassionate and dedicated to improving the quality of life for others. Our platform connects you with individuals and families who rely on your expertise to ensure that their loved ones receive the best in-home care possible. Whether you're experienced in providing daily assistance, medical care, or companionship, CareEase gives you the opportunity to make a significant and lasting impact on the lives of those you care for.",
    },
  };

  const formatText = (text) => {
    return text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  const additionalServices = [
    {
      title: "Elderly Care",
      description: "Assistance with daily activities, health monitoring, and companionship.",
      icon: <FaUserNurse size={48} />,
      background: "#E3F2FD",
      borderColor: "#90CAF9",
    },
    {
      title: "Mother Care",
      description: "Support for mothers through pregnancy and postnatal recovery, ensuring well-being for both.",
      icon: <FaBaby size={48} />,
      background: "#E8F5E9",
      borderColor: "#A5D6A7",
    },
    {
      title: "Child Care",
      description: "Specialized pediatric care and support for families.",
      icon: <FaChild size={48} />,
      background: "#E3F2FD",
      borderColor: "#90CAF9",
    },
    {
      title: "Post-Accident Care",
      description: "Recovery support and rehabilitation for accident victims.",
      icon: <FaAmbulance size={48} />,
      background: "#E8F5E9",
      borderColor: "#A5D6A7",
    },
    {
      title: "Post-Surgery Care",
      description: "Wound care, medication management, and recovery support.",
      icon: <FaCut size={48} />,
      background: "#E3F2FD",
      borderColor: "#90CAF9",
    },
    {
      title: "Physiotherapy",
      description: "In-home rehabilitation and mobility assistance.",
      icon: <FaDumbbell size={48} />,
      background: "#E8F5E9",
      borderColor: "#A5D6A7",
    },
    {
      title: "Home Medical Services",
      description: "Basic medical treatments, health check-ups, and monitoring.",
      icon: <FaHospital size={48} />,
      background: "#E3F2FD",
      borderColor: "#90CAF9",
    },
    {
      title: "Special Needs Care",
      description: "Personalized care for individuals with disabilities or chronic conditions.",
      icon: <FaWheelchair size={48} />,
      background: "#E8F5E9",
      borderColor: "#A5D6A7",
    },
    {
      title: "Intensive Care at Home",
      description: "Advanced, critical care services provided by skilled nurses.",
      icon: <FaHeartbeat size={48} />,
      background: "#E3F2FD",
      borderColor: "#90CAF9",
    },
  ];

  return (
    <>
      {/* Header Section */}
      <section
        className="relative bg-cover bg-center h-[400px] flex items-center justify-center mt-24 rounded-lg shadow-lg"
        style={{ backgroundImage: "url('/i1.jpeg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-6 sm:px-10 max-w-3xl">
          <h2 className="text-4xl font-extrabold mb-4">Our Services</h2>
          <p className="text-lg font-light mb-6">
            Compassionate caregiving services tailored to enhance comfort, independence, and quality of life for your loved ones.
          </p>
        </div>
      </section>

      <div className="pt-2">
        {/* Services Section Grid */}
        <div className="py-16 px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {Object.entries(content).map(([key, { title, icon, brief }]) => (
              <div
                key={key}
                className="flex flex-col items-center bg-white shadow-lg rounded-xl overflow-hidden transition duration-300 hover:scale-105 transform p-6 border border-gray-200"
              >
                <div className="w-full text-center mb-6">{icon}</div>
                <div className="w-full text-center">
                  <h2 className="text-2xl font-semibold text-primary-dark mb-4">{title}</h2>
                  <p className="text-gray-600 mb-4 text-lg">{brief}</p>
                  <div className="flex gap-6 justify-center">
                    <button
                      onClick={() => handleLearnMore(key)}
                      className="bg-primary-blue text-white px-6 py-2 rounded-lg hover:bg-primary-green transition-all duration-300 ease-in-out"
                    >
                      Learn More
                    </button>
                    <button
                      onClick={() => handleFutureDevelopment(key)}
                      className="bg-primary-green text-white px-6 py-2 rounded-lg hover:bg-primary-blue transition-all duration-300 ease-in-out"
                    >
                      Click to Continue
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup for Learn More */}
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 w-3/4 md:w-1/2 rounded-xl shadow-2xl relative">
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-xl font-bold text-gray-600"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-primary-blue mb-4">Details</h2>
            <div className="text-gray-700">{formatText(popupContent)}</div>
          </div>
        </div>
      )}

      {/* Additional Services Section */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-dark">CareEase Services</h1>
        <p className="text-lg md:text-2xl text-dark mb-6">
          Connecting you with trusted caregivers for personalized care.
        </p>
      </div>

      <div className="py-16 px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {additionalServices.map((service, index) => (
            <div
              key={index}
              style={{ backgroundColor: service.background, borderColor: service.borderColor }}
              className="rounded-xl h-[350px] w-[300px] flex flex-col justify-center items-center mx-auto px-4 py-6 border-[3px] hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
            >
              {/* FontAwesome Icon (React Icons) */}
              <div className="text-center mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-2 text-gray-800">{service.title}</h3>
              <p className="text-base text-center text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
