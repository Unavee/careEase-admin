"use client";

import { motion } from "framer-motion";
import { CallIcon, Heart, BestClass, Rapids } from "../icons";

export default function Hero() {
  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[700px] flex flex-col justify-center items-center text-center text-white overflow-hidden px-4">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/careease-intro.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 md:bg-black/30 lg:bg-black/20" />

      {/* Heading Section */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative text-lg md:text-3xl lg:text-4xl font-bold max-w-3xl leading-snug mb-32"
      >
        Rapid, Reliable, and Affordable Home Healthcare – Compassionate Caregivers at Your Doorstep!
      </motion.h2>

      {/* Cards Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        className="absolute bottom-6 md:bottom-16 w-full flex flex-wrap justify-center gap-6 md:gap-12 px-4 z-10"
      >
        {[
          { icon: <CallIcon />, text: "24/7 Emergency" },
          { icon: <Heart />, text: "Best Care" },
          { icon: <Rapids />, text: "Rapid Services" },
          { icon: <BestClass />, text: "World-Class Facility" },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center justify-center w-28 md:w-36 h-28 md:h-36 p-4 bg-white/20 backdrop-blur-md rounded-xl shadow-lg border border-white/30 text-white transition-all duration-300"
          >
            <div className="text-2xl md:text-4xl">{item.icon}</div>
            <p className="text-xs md:text-base font-semibold mt-2 text-center">
              {item.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}