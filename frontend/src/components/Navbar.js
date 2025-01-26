import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prevState) => !prevState);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white p-4 shadow-md fixed top-0 left-0 w-full z-40">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-gray-800 text-2xl font-bold flex items-center">
          <img
            src="care.png"
            alt="CareEas"
            className="h-16 w-16 scale-150 mr-2 object-cover rounded-full hover:rounded-none hover:duration-700"
          />
          <Link to="/" className="hover:text-gray-600 transition duration-300">
            CareEase
          </Link>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <button
          className="md:hidden text-gray-800 hover:text-gray-600 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-8 absolute md:static top-16 left-0 w-full bg-white md:w-auto p-4 md:p-0`}
        >
          <Link
            to="/"
            className="block text-gray-800 hover:text-gray-600 transition duration-300 py-2 md:py-0"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
                to="/how-it-works"
                className="block text-gray-800 hover:text-gray-600 transition duration-300 py-2 md:py-0"
                onClick={closeMenu}
              >
                How it Works
              </Link>
              <Link
                to="/services"
                className="block text-gray-800 hover:text-gray-600 transition duration-300 py-2 md:py-0"
                onClick={closeMenu}
              >
                Services
              </Link>
          {isLoggedIn ? (
            <>
              
              <Link
                to="/userdashboard"
                className="block text-white hover:text-gray-300 transition duration-300 py-2 md:py-0 flex items-center"
                onClick={closeMenu}
              >
                <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 48 48" viewBox="0 0 48 48" id="profile" className="h-10 w-10 fill-primary-blue hover:fill-primary-green">
                  <path id="Layer_1" d="M24,6C14.1,6,6,14.1,6,24s8.1,18,18,18s18-8.1,18-18S33.9,6,24,6z M24,13c2.2,0,4,1.8,4,4c0,2.2-1.8,4-4,4c-2.2,0-4-1.8-4-4C20,14.8,21.8,13,24,13z M14,34c0-5.5,4.5-10,10-10c5.5,0,10,4.5,10,10H14z"></path>
                </svg>
              </Link>
              <button
                onClick={() => {
                  onLogout();
                  closeMenu();
                }}
                className="block text-white bg-primary-blue hover:bg-primary-green px-4 py-2 rounded-md shadow-lg transform hover:scale-105 transition duration-300 mt-2 md:mt-0"
              >
                Logout
              </button>
              
            </>
          ) : (
            <Link
              to="/signin"
              className="block text-white bg-primary-blue hover:bg-primary-green px-4 py-2 rounded-md shadow-md transform hover:scale-105 transition duration-300 mt-2 md:mt-0"
              onClick={closeMenu}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
