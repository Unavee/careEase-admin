import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-16 border-t-2 border-gray-700">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-16 lg:gap-0">
          {/* Brand Section */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
            <img
              src="/care.png"
              alt="CareEase Logo"
              className="w-36 h-36 object-contain"
            />
            <div>
              <h2 className="text-3xl font-bold text-white">CareEase</h2>
              <p className="text-base text-gray-400 mt-2 max-w-sm">
                Empowering families with trusted, compassionate, and professional home care services.
              </p>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-base hover:text-blue-400 transition-all duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-base hover:text-blue-400 transition-all duration-300"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/how-it-works"
                  className="text-base hover:text-blue-400 transition-all duration-300"
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-base hover:text-blue-400 transition-all duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-4">
              <li className="text-base cursor-pointer hover:text-blue-400 transition-all duration-300">
                About Us
              </li>
              <li className="text-base cursor-pointer hover:text-blue-400 transition-all duration-300">
                Bookings
              </li>
              <li className="text-base cursor-pointer hover:text-blue-400 transition-all duration-300">
                FAQs
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-semibold text-white mb-4">Our Services</h3>
            <ul className="space-y-4">
              <li className="text-base cursor-pointer hover:text-blue-400 transition-all duration-300">
                Home Care
              </li>
              <li className="text-base cursor-pointer hover:text-blue-400 transition-all duration-300">
                Support Services
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Address and Contact Section */}
        <div className="mt-12 flex flex-col lg:flex-row justify-between items-center lg:items-start text-center lg:text-left">
          {/* Address */}
          <p className="text-lg flex items-center justify-center lg:justify-start space-x-2 text-gray-400 mb-6 lg:mb-0">
            <span className="text-pink-400">📍</span>
            <span>Greater Noida, Uttar Pradesh</span>
          </p>

          {/* Contact - Phone */}
          <p className="text-lg flex items-center justify-center lg:justify-start space-x-2 text-gray-400 mb-6 lg:mb-0">
            <span className="text-red-400">📞</span>
            <span>+91 9999999999</span>
          </p>

          {/* Contact - Email */}
          <p className="text-lg flex items-center justify-center lg:justify-start space-x-2 text-gray-400">
            <span className="text-blue-400">📧</span>
            <span>XYZ@gmail.com</span>
          </p>
        </div>

        {/* Footer Bottom Text */}
        <div className="mt-12 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} CareEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
