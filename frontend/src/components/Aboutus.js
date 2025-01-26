import React from "react";

const AboutUs = () => {
  const title = "About Us";
  const subtitle = "Your Trusted Partner in Healthcare Services";
  const description = `
    At CareEase, we are on a mission to make professional, personalized healthcare services accessible and seamless. 
    We connect individuals and families with licensed nurses and caregivers who provide compassionate in-home services tailored to your needs.
  `;
  const mission = `
    To empower individuals with healthcare solutions that bring comfort, dignity, and exceptional care right into their homes. 
    We strive to bridge the gap between patients and trusted caregivers, fostering peace of mind and well-being for everyone.
  `;
  const vision = `
    To redefine home healthcare with innovative and personalized care that improves lives, one home at a time.
  `;
  const videoUrl = "/careease-intro.mp4";

  return (
    <div className="bg-white py-16">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h3 className="text-3xl font-semibold text-primary-blue uppercase tracking-wide">
          {title}
        </h3>
        <h1 className="text-5xl font-bold text-gray-800 mt-4">
          {subtitle}
        </h1>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-start gap-16">
        {/* Left Column */}
        <div className="lg:flex-1 space-y-8">
          <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
          <div>
            <h2 className="text-2xl font-bold text-primary-blue mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">{mission}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-primary-blue mb-4">
              Our Vision
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">{vision}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:flex-1">
          {/* Video */}
          <div className="w-full h-[300px] lg:h-[400px] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 relative">
            <video
              src={videoUrl}
              controls
              className="w-full h-full object-cover rounded-xl"
            ></video>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="mt-16 py-16 bg-gradient-to-r from-gray-100 via-white to-gray-100">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <blockquote className="text-gray-800 text-2xl italic font-light max-w-3xl mx-auto">
            "Caring is not just about helping — it’s about creating an environment 
            of trust, comfort, and dignity for every individual we serve."
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
