import React, { useState } from 'react';
import { Link } from 'react-router-dom';


import WhyChooseUs from './WhyChooseUs';
import Excellence from "./Excellence";
import Hero from './Hero';
import Faq from './Faq';
import HeroSection from './HeroSection';
import Stats from './Stats';
import Personalised from './PhysioSection';

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

      {/* Stats Section */}
     
      <Stats/>
     

      {/* Centres Of Excellence */}
      
         <Excellence/>
       <HeroSection/>
       <Personalised/>
      
     
      
      <WhyChooseUs />
  
      
        <Faq/>

        
      </div>
 
  );
};

export default Home;
