import React, { useState } from "react";
import { FaUserShield, FaCalendarAlt, FaPhoneAlt, FaCheckCircle, FaCommentAlt, FaDollarSign, FaStar, FaUserAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';


const HowItWorks = () => {
  const [activeSection, setActiveSection] = useState(null); // Active section state
  const [activeStep, setActiveStep] = useState(null); // Active step state

  // Toggle the visibility of a section (Patient or Caregiver)
  const toggleSection = (section) => {
    setActiveSection((prev) => (prev === section ? null : section)); // Toggle section visibility
  };

  // Toggle the visibility of a step inside a section
  const toggleStep = (stepNumber) => {
    setActiveStep((prevStep) => (prevStep === stepNumber ? null : stepNumber)); // Toggle step visibility
  };

  // Caregiver steps data
  const caregiverSteps = [
    { number: 1, title: "Apply and get vetted", icon: <FaUserShield size={24} />, description: "Sign up as a caregiver, create your profile, and upload qualifications. We’ll review and conduct background checks." },
    { number: 2, title: "Set your schedule", icon: <FaCalendarAlt size={24} />, description: "Set your availability and manage hours flexibly once approved." },
    { number: 3, title: "Connect with patients", icon: <FaPhoneAlt size={24} />, description: "Patients can view your profile, qualifications, and availability, book directly, and communicate their needs." },
    { number: 4, title: "Book and schedule", icon: <FaCheckCircle size={24} />, description: "Accept the booking, confirm the service, and get notified about the appointment." },
    { number: 5, title: "Provide care", icon: <FaUserAlt size={24} />, description: "Provide top-quality home care, from nursing to recovery support." },
    { number: 6, title: "Track service progress", icon: <FaCalendarAlt size={24} />, description: "Caregivers can track the service details and progress through the app." },
    { number: 7, title: "Caregiver feedback", icon: <FaCommentAlt size={24} />, description: "Caregivers can also rate the patient, ensuring a mutual trust system." },
    { number: 8, title: "Earn and grow", icon: <FaDollarSign size={24} />, description: "Get paid promptly for the services you provide and grow your client base." }
  ];

  // Patient steps data
  const patientSteps = [
    { number: 1, title: "Sign Up", icon: <FaUserAlt size={24} />, description: "Sign up with basic info—quick, easy, and secure." },
    { number: 2, title: "Select a service", icon: <FaCalendarAlt size={24} />, description: "Explore our home-care services: nursing, elderly care, post-surgery support, and more." },
    { number: 3, title: "Find the right caregiver", icon: <FaPhoneAlt size={24} />, description: "Search caregivers by location, service, and availability." },
    { number: 4, title: "Book and schedule", icon: <FaCheckCircle size={24} />, description: "Accept the booking, confirm the service, and get notified about the appointment." },
    { number: 5, title: "Receive quality care at home", icon: <FaUserAlt size={24} />, description: "Relax as your vetted caregiver arrives to deliver personalized care." },
    { number: 6, title: "Track service progress", icon: <FaCalendarAlt size={24} />, description: "Patients can track the service details and progress through the app." },
    { number: 7, title: "Seamless payment", icon: <FaDollarSign size={24} />, description: "Payments are processed securely through the app after service." },
    { number: 8, title: "Rate and Review", icon: <FaStar size={24} />, description: "Leave a rating and review for the caregiver after the service." }
  ];

  // FAQ data
  const faqs = [
    { question: "How do I book a caregiver?", answer: "Sign up, select the care needed, browse caregiver profiles, and choose your caregiver." },
    { question: "What types of care services do you offer?", answer: "We offer a wide range of services including nursing, elderly care, post-surgery assistance, and companionship." },
    { question: "Are caregivers vetted?", answer: "Yes, all caregivers go through background checks and a review process to ensure quality service." },
    { question: "Can I choose my caregiver?", answer: "Yes, browse profiles and choose the caregiver that best fits your needs." },
    { question: "How do I know if a caregiver is available?", answer: "Each caregiver’s profile shows availability, and you can filter results by schedule." },
    { question: "Can I modify my booking?", answer: "Yes, bookings can be modified or canceled within a specified timeframe." },
    { question: "Is payment secure?", answer: "Yes, payments are processed securely via our encrypted platform." }
  ];

  return (
    <section className="bg-gray-50 py-16 px-8 mt-20">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-gray-800">How It Works</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Whether you're a patient or a caregiver, our platform simplifies the process of receiving and providing high-quality care.
        </p>
      </div>

      {/* Patient and Caregiver Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-screen-xl mx-auto mb-16">
        {/* Patient Section */}
        <div className="bg-blue-50 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="text-center mb-6">
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.95 }}
              className="text-5xl text-primary-blue mb-4"
            >
              <FaUserAlt />
            </motion.div>
            <h3 className="text-2xl font-semibold text-gray-800">For Patients</h3>
            <p className="text-gray-600">Get the care you deserve, delivered right to your home.</p>
          </div>
          <button
            className="text-primary-blue font-semibold py-2 px-4 bg-transparent border border-primary-blue hover:bg-primary-blue hover:text-white duration-300 rounded-full mb-6"
            onClick={() => toggleSection("patient")}
          >
            {activeSection === "patient" ? "Hide Steps" : "Learn More"}
          </button>
          {activeSection === "patient" && (
            <div>
              {patientSteps.map((step) => (
                <div key={step.number} className="bg-white rounded-lg mb-6 p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleStep(step.number)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary-blue text-white rounded-full flex items-center justify-center">
                        {step.icon}
                      </div>
                      <span className="font-semibold text-gray-800">{step.title}</span>
                    </div>
                    <span className="text-primary-blue">{activeStep === step.number ? "▲" : "▼"}</span>
                  </div>
                  {activeStep === step.number && (
                    <p className="text-gray-600 mt-4">{step.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Caregiver Section */}
        <div className="bg-green-50 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="text-center mb-6">
            <motion.div 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.95 }}
              className="text-5xl text-primary-green mb-4"
            >
              <FaUserShield />
            </motion.div>
            <h3 className="text-2xl font-semibold text-gray-800">For Caregivers</h3>
            <p className="text-gray-600">Join our network and provide top-quality care to patients.</p>
          </div>
          <button
            className="text-primary-green font-semibold py-2 px-4 bg-transparent border border-primary-green hover:bg-primary-green hover:text-white duration-300 rounded-full mb-6"
            onClick={() => toggleSection("caregiver")}
          >
            {activeSection === "caregiver" ? "Hide Steps" : "Learn More"}
          </button>
          {activeSection === "caregiver" && (
            <div>
              {caregiverSteps.map((step) => (
                <div key={step.number} className="bg-white rounded-lg mb-6 p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleStep(step.number)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary-green text-white rounded-full flex items-center justify-center">
                        {step.icon}
                      </div>
                      <span className="font-semibold text-gray-800">{step.title}</span>
                    </div>
                    <span className="text-primary-green">{activeStep === step.number ? "▲" : "▼"}</span>
                  </div>
                  {activeStep === step.number && (
                    <p className="text-gray-600 mt-4">{step.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-screen-xl mx-auto mb-16">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">FAQs</h2>
        <div className="bg-white shadow-lg rounded-xl p-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`p-6 mb-6 cursor-pointer rounded-lg transition-all duration-300 ${activeStep === index ? "bg-blue-50" : "hover:bg-gray-100"}`}
              onClick={() => toggleStep(index)}
            >
              <div className="flex justify-between items-center font-semibold text-lg text-gray-800">
                <span>{faq.question}</span>
                <span>{activeStep === index ? "▲" : "▼"}</span>
              </div>
              {activeStep === index && (
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
