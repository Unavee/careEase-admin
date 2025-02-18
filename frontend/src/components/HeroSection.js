import { motion } from "framer-motion";
import { FiActivity } from "react-icons/fi";
import { useRef } from "react";

export default function HeroSection() {
  const containerRef = useRef(null);

  return (
    <motion.div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-primary-blue to-teal-400 flex items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Star-like background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Keep existing star animations here */}
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 text-center lg:text-left"
        >
          <motion.h1 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.5 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
          >
            AI Powered
            <span className="block mt-2 text-yellow-300">Matching for Quality Care</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.5 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-200 mb-8 max-w-xl mx-auto tracking-wider"
          >
            At CareEase, we leverage cutting-edge technology to ensure the perfect match 
            between patients and caregivers. Our AI assesses patient conditions and 
            requirements, pairing them with the most suitable caregivers or nurses.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ amount: 0.5 }}
            transition={{ delay: 0.6 }}
            className="bg-white text-primary-blue px-6 py-2 rounded-lg border border-transparent hover:border-primary-green hover:bg-white hover:text-primary-green transition items-center"
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Illustration Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 relative"
        >
          <div className="relative max-w-md mx-auto">
            {/* Atom-like rotating rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* First Orbit Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="absolute w-80 h-80 rounded-full border-2 border-white/30"
                style={{ transform: 'rotateX(60deg)' }}
              >
                {/* Electron 1 */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ amount: 0.5 }}
                  transition={{ delay: 0.2 }}
                  className="absolute top-0 left-1/2 -ml-3 w-6 h-6 bg-blue-400 rounded-full shadow-lg shadow-blue-500/50"
                />
                {/* Electron 2 */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ amount: 0.5 }}
                  transition={{ delay: 0.4 }}
                  className="absolute bottom-0 left-1/2 -ml-3 w-6 h-6 bg-green-400 rounded-full shadow-lg shadow-green-500/50"
                />
              </motion.div>
              
              {/* Second Orbit Ring */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute w-72 h-72 rounded-full border-2 border-white/20"
                style={{ transform: 'rotateY(60deg)' }}
              >
                {/* Electron 3 */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ amount: 0.5 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-1/2 left-0 -mt-3 w-6 h-6 bg-yellow-400 rounded-full shadow-lg shadow-yellow-500/50"
                />
                {/* Electron 4 */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ amount: 0.5 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-1/2 right-0 -mt-3 w-6 h-6 bg-purple-400 rounded-full shadow-lg shadow-purple-500/50"
                />
              </motion.div>
              
              {/* Third Orbit Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                className="absolute w-64 h-64 rounded-full border-2 border-white/10"
                style={{ transform: 'rotateZ(30deg) rotateY(30deg)' }}
              >
                {/* Electron 5 */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ amount: 0.5 }}
                  transition={{ delay: 0.4 }}
                  className="absolute top-1/4 right-0 w-6 h-6 bg-pink-400 rounded-full shadow-lg shadow-pink-500/50"
                />
                {/* Electron 6 */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ amount: 0.5 }}
                  transition={{ delay: 0.6 }}
                  className="absolute bottom-1/4 left-0 w-6 h-6 bg-teal-400 rounded-full shadow-lg shadow-teal-500/50"
                />
              </motion.div>
            </div>

            {/* Main Circle */}
            <div className="w-64 h-64 rounded-full bg-yellow-500 flex items-center justify-center mx-auto shadow-lg relative z-10">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-white/20"
              />
              
              <FiActivity className="w-20 h-20 text-white" />
              
              {/* Star-like shine effects around main circle */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ amount: 0.5 }}
                transition={{ delay: 0.2 }}
                className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-200 rounded-full blur-md"
              />
              {/* Other star effects with similar whileInView animations */}
            </div>

            {/* Animated Dots */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ amount: 0.5 }}
              transition={{ delay: 0.3 }}
              className="absolute top-0 -left-0 w-4 h-4 bg-indigo-400 rounded-full"
            />
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ amount: 0.5 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-20 -right-8 w-4 h-4 bg-green-400 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
