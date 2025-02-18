import React from "react";
import { motion } from "framer-motion";

// Features data (same as before)
const features = [
  {
    icon: "/c1.png",
    title: "Personalized Care",
    description: "Tailored healthcare solutions for individual needs",
    bgGradient: "bg-gradient-to-br from-blue-100/60 to-teal-200/40",
    iconBg: "bg-gradient-to-bl from-blue-400 to-teal-500",
  },
  {
    icon: "/c2.png",
    title: "Expert Team",
    description: "Certified medical professionals",
    bgGradient: "bg-gradient-to-br from-blue-100/60 to-teal-200/40",
    iconBg: "bg-gradient-to-bl from-blue-400 to-teal-500",
  },
  {
    icon: "/c3.png",
    title: "24/7 Support",
    description: "Round-the-clock care availability",
    bgGradient: "bg-gradient-to-br from-blue-100/60 to-teal-200/40",
    iconBg: "bg-gradient-to-bl from-blue-400 to-teal-500",
  },
  {
    icon: "/c4.png",
    title: "Tech-Driven",
    description: "Smart healthcare technology",
    bgGradient: "bg-gradient-to-br from-blue-100/60 to-teal-200/40",
    iconBg: "bg-gradient-to-bl from-blue-400 to-teal-500",
  },
  {
    icon: "/c5.png",
    title: "Safety First",
    description: "HIPAA compliant services",
    bgGradient: "bg-gradient-to-br from-blue-100/60 to-teal-200/40",
    iconBg: "bg-gradient-to-bl from-blue-400 to-teal-500",
  },
  {
    icon: "/c6.png",
    title: "Easy Access",
    description: "Seamless service booking",
    bgGradient: "bg-gradient-to-br from-blue-100/60 to-teal-200/40",
    iconBg: "bg-gradient-to-bl from-blue-400 to-teal-500",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 px-8 mt-8">
      {/* Heading */}
      <div className="text-center mb-16">
        <motion.h2
          className="text-4xl font-extrabold bg-primary-blue bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose CareEase?
        </motion.h2>
        <motion.p
          className="mt-4 text-lg text-blue-800/90 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Delivering exceptional care through innovation and compassion
        </motion.p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`relative rounded-2xl p-8 overflow-hidden transition-all duration-300 group 
              ${feature.bgGradient} hover:-translate-y-1.5 shadow-lg hover:shadow-xl`}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{
              delay: index * 0.1,  // Slight stagger for the items
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />

            {/* Icon Container */}
            <div className={`w-16 h-16 flex items-center justify-center rounded-2xl mb-6 mx-auto ${feature.iconBg}`}>
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-8 h-8 filter brightness-0 invert"
              />
            </div>

            {/* Content */}
            <h3 className="text-xl font-semibold text-blue-900 text-center mb-4">
              {feature.title}
            </h3>
            <p className="text-blue-800/90 text-center">{feature.description}</p>

            {/* Animated Gradient Border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-all duration-300" />
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-4">
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="px-8 py-3.5 bg-gradient-to-r from-primary-blue to-teal-400 text-white rounded-full 
          shadow-xl hover:shadow-blue-400/20 hover:from-teal-400 hover:to-primary-blue transition-all 
          duration-300 font-semibold text-lg"
        >
          Get Started
        </motion.button>
      </div>
    </section>
  );
};

export default WhyChooseUs;
