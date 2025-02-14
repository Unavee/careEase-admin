import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AboutUs from './Aboutus';
import Background from '../assest/hero.webp';
import WhyChooseUs from './WhyChooseUs';
import Hero from './Hero';
import Faq from './Faq';

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
     <Hero/>

      {/* About Us Section */}
      {/* <div className="bg-white py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <AboutUs />
        </div>
      </div> */}

      {/* Why Choose Us Section */}
      <div className="bg-white py-12">
        <Faq/>
        <div className="container mx-auto px-6 lg:px-12">
          <WhyChooseUs />
        </div>
      </div>
    </div>
  );
};

export default Home;
