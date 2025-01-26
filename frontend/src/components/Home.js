import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AboutUs from './Aboutus';
import Background from '../assest/hero.webp';
import WhyChooseUs from './WhyChooseUs';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Simulated login functionality
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-full h-screen overflow-hidden bg-gradient-to-r from-blue-500 via-white to-blue-500">
        {/* Animated Background */}
        <div
          className="absolute inset-0 bg-cover bg-center animate-scroll bg-fixed"
          style={{
            backgroundImage: `url(${Background})`,
            animation: 'moveBackground 10s linear infinite',
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-white bg-opacity-80 z-10"></div>

        {/* Hero Content */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center text-[#043339]">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Personalised In-Home Health Care at Your Fingertips
          </h1>
          <p className="text-lg md:text-2xl text-[#043339] mb-6 animate-slide-in">
            Connecting You with Trusted Caregivers for Personalised Care
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <Link
              to="/signin"
              className="bg-primary-blue text-white py-3 px-8 rounded-lg text-lg hover:bg-primary-green transition duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <AboutUs />
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <WhyChooseUs />
        </div>
      </div>
    </div>
  );
};

export default Home;
