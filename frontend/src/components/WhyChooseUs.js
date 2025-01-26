import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-16 px-8">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-gray-800 animate-fade-in">
          Why Choose <span className="text-primary-blue">CareEase?</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto animate-slide-up">
          At CareEase, we focus on delivering exceptional care to your doorstep
          with compassion, professionalism, and trust.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-screen-xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="relative bg-white border border-gray-200 rounded-3xl p-8 overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
          >
            {/* Icon Container */}
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 mx-auto mb-6">
              <img
                src={feature.icon}
                alt={`${feature.title} Icon`}
                className="w-8 h-8"
              />
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-center">{feature.description}</p>

            {/* Underline Animation */}
            <div className="absolute inset-x-0 bottom-[-1px] h-[2px] bg-primary-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <button className="px-8 py-3 bg-primary-blue text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
          Get Started
        </button>
      </div>
    </section>
  );
};

// Feature Data
const features = [
  {
    icon: "/c1.png",
    title: "Personalized Care",
    description: "Care plans tailored to every patient’s unique needs.",
  },
  {
    icon: "/c2.png",
    title: "Qualified Professionals",
    description: "Certified caregivers providing safe and expert care.",
  },
  {
    icon: "/c3.png",
    title: "Compassionate Service",
    description:
      "Empathetic caregivers who deliver trust and warmth to your home.",
  },
  {
    icon: "/c4.png",
    title: "Easy Booking",
    description: "Effortlessly book and manage services on our platform.",
  },
  {
    icon: "/c5.png",
    title: "24/7 Support",
    description: "Round-the-clock support for all your care needs.",
  },
  {
    icon: "/c6.png",
    title: "Trusted Professionals",
    description:
      "Verified caregivers ensure reliable and secure healthcare services.",
  },
];

export default WhyChooseUs;
