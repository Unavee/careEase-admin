import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserNurse, FaDumbbell, FaUserAlt,FaHandsHelping } from "react-icons/fa"; // Importing necessary icons

export default function ProvideCare() {
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
    if (topic === "nurse") {
      navigate("/nurse/register");
    } else if (topic === "physiotherapist") {
      navigate("/physiotherapy/register");
    } else {
      navigate("/attendantCareForm/register")
    }
  };

  const content = {
    nurse: {
      title: "Nurse Services",
      icon: <FaUserNurse size={48} className="text-primary-blue" />,
      brief: "Professional nursing care tailored to your health needs.",
      details: `
        Our Nurse Services provide professional and compassionate care for patients in the comfort of their homes.
        Whether you need post-surgical care, chronic illness management, or general health monitoring, our trained
        nurses ensure that you receive personalized attention. With a focus on quality and empathy, we strive to
        support your journey to recovery and well-being.
      `,
    },
    physiotherapist: {
      title: "Physiotherapy",
      icon: <FaHandsHelping size={48} className="text-primary-blue" />,
      brief: "Rehabilitation and physical therapy to restore mobility and strength.",
      details: `
        Our Physiotherapy Services are designed to help individuals regain mobility and strength after an injury,
        surgery, or chronic condition. With personalized treatment plans, our skilled physiotherapists focus on
        improving your quality of life through targeted exercises and therapeutic techniques. Let us assist you
        in your journey toward a healthier and more active lifestyle.
      `,
    },
    attendant: {
      title: "Attendant Care",
      icon: <FaUserAlt size={48} className="text-primary-blue" />,
      brief: "Reliable and compassionate care for individuals with specific needs.",
      details: `
        Attendant care focuses on helping individuals with various needs, including elderly care, post-operative
        assistance, and long-term medical conditions. Our caregivers are trained to assist with mobility, personal
        hygiene, medication management, and other daily activities. Trust us to provide respectful, personalized
        care in the comfort of your own home.
      `,
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

  return (
    <>
      {/* Header Section */}
      <section
        className="relative bg-cover brightness-90 bg-center h-[400px] flex items-center justify-center mt-24 rounded-lg shadow-lg"
        style={{ backgroundImage: "url('/pc.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-6 sm:px-10 max-w-3xl">
          <h2 className="text-4xl font-extrabold mb-4">Provide Care Services</h2>
          <p className="text-lg font-light mb-6">
            Empowering caregivers and connecting them with individuals in need of professional healthcare services.
          </p>
        </div>
      </section>

      <div className="pt-24">
        {/* Services Section */}
        <div className="min-h-fit bg-white pb-16 px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          {Object.entries(content).map(([key, { title, icon, brief }]) => (
            <div
              key={key}
              className="flex flex-col items-center bg-white shadow-lg rounded-xl overflow-hidden transition duration-300 hover:scale-105 transform p-6 border border-gray-200"
            >
              <div className="w-full text-center mb-6">
                {icon}
              </div>
              <div className="w-full text-center">
                <h2 className="text-2xl font-semibold text-primary-dark mb-4">{title}</h2>
                <p className="text-gray-600 mb-4 text-lg">{brief}</p>
                <div className="flex gap-6 justify-center">
                  <button
                    onClick={() => handleLearnMore(key)}
                    className="bg-primary-blue text-white px-6 py-2 rounded-lg hover:bg-primary-green transition-all duration-300 ease-in-out"
                  >
                    {activePopupTopic === key ? "Learn More" : "Learn More"}
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

      {/* Popup Section */}
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
    </>
  );
}
