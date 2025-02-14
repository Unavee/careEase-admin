import { FaPhoneAlt } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { MdPerson } from "react-icons/md";
import { useState, useEffect, useCallback } from "react";
import { BsHospital, BsPeopleFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import { FaUserCircle } from "react-icons/fa"; // Profile icon
import { IoClose } from "react-icons/io5";
import { FaUserNurse, FaHeadphonesAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, handleLogout}) => {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState("/");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNotificationPanel = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  

  if (!isClient) return null;

  return (
    <div className="w-full container mx-auto">
      {/* 🔹 Mobile Navbar */}
      <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="lg:hidden top-0 left-0 w-screen -translate-x-1/2 bg-white shadow-xl p-1 flex justify-between items-center rounded-xl border border-gray-200 backdrop-blur-xl z-50 fixed"
    >
      {/* 🔹 Logo */}
      <Link to="/" className="flex flex-row items-center space-x-2">
        <img
          src="/care.png"
          alt="CareEase"
          className="object-contain h-20 w-fit"
        />
      </Link>

      <div className="flex items-center space-x-4">
        {/* 🔔 Notification Icon */}
        <button className="relative p-2 rounded-full hover:bg-gray-100"  onClick={toggleNotificationPanel}>
          <Bell className="w-6 h-6 text-gray-700" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>

        {/* 👤 Profile Icon (Only when logged in) */}
        {isLoggedIn && (
          <Link to="/userdashboard">
            <FaUserCircle className="w-8 h-8 text-gray-700 hover:text-blue-500 transition" />
          </Link>
        )}
      </div>
    </motion.div>

      {/* 🔹 Desktop Navbar */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hidden lg:flex bg-white shadow-lg p-4 items-center justify-between rounded-lg"
      >
        <Link to="/" className="text-gray-800 text-2xl font-bold flex items-center space-x-2">
          <img src="/care.png" alt="CareEase" className="object-contain h-20 w-fit" />
          <span>CareEase</span>
        </Link>

        <nav className="flex space-x-16 text-gray-700 font-medium">
          <Link to="/" className="hover:text-purple-600">Home</Link>
          <Link to="/services" className="hover:text-purple-600">Services</Link>
          <Link to="/blog" className="hover:text-purple-600">Blog</Link>
          <Link to="/contact" className="hover:text-purple-600">Contact</Link>
        </nav>

        {/* 📞 Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <button className="flex bg-purple-600 text-white px-6 py-2 rounded-lg border border-transparent hover:border-purple-600 hover:bg-white hover:text-purple-600 transition">
            <FaPhoneAlt />
            <span className="ml-2">Appointment</span>
          </button>
          <button className="flex bg-red-500 text-white px-6 py-2 rounded-lg border border-transparent hover:border-red-500 hover:bg-white hover:text-red-500 transition">
            <FaHeadphonesAlt />
            <span className="ml-2">Help</span>
          </button>
        </div>
        <div className="flex items-center space-x-4">
        {/* 🔔 Notification Icon */}
        <button className="relative p-2 rounded-full hover:bg-gray-100"  onClick={toggleNotificationPanel}>
          <Bell className="w-6 h-6 text-gray-700" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>

        {/* 👤 Profile Icon (Only when logged in) */}
        {isLoggedIn && (
          <Link to="/userdashboard">
            <FaUserCircle className="w-8 h-8 text-gray-700 hover:text-blue-500 transition" />
          </Link>
        )}
      </div>
      </motion.header>

      {/* 🔹 Mobile Floating Navigation */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="lg:hidden fixed bottom-1 w-screen -translate-x-1/2 bg-white shadow-xl p-1 flex justify-between items-center rounded-2xl border border-gray-200 backdrop-blur-xl z-50"
      >
        <NavItem to="/" icon={<FiHome />} label="Home" activeTab={activeTab} setActiveTab={setActiveTab} />
        <NavItem to="/services" icon={<BsPeopleFill />} label="Services" activeTab={activeTab} setActiveTab={setActiveTab} />
        <NavItem to="#" icon={<FaUserNurse />} label="Find Caregiver" danger activeTab={activeTab} setActiveTab={setActiveTab} />
        <NavItem  onClick={toggleSidebar} icon={<MdPerson />} label="Profile" activeTab={activeTab} setActiveTab={setActiveTab} />
      </motion.nav>

      {/* 🔹 Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-80 h-full bg-gradient-to-b from-primary-blue to-primary-green shadow-2xl z-50 p-6 flex flex-col items-start space-y-6 rounded-l-2xl"
          >
            {/* Close Button */}
            <button 
              className="self-end text-2xl font-bold text-white hover:text-gray-300 transition-transform transform hover:scale-110"
              onClick={() => setIsSidebarOpen(false)}
            >
              ×
            </button>

            {/* Sidebar Links */}
            {[
  { to: "/profile", label: "Profile" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/appointments", label: "My Appointments" },
  { to: "/payments", label: "Payment History" },
  { to: "/notifications", label: "Notifications" },
  { to: "/settings", label: "Settings" },
  { to: "/help", label: "Help & Support" },
  { to: "/terms", label: "Terms & Conditions" },
  isLoggedIn
    ? { to: "/logout", label: "Logout", danger: true }
    : { to: "/signin", label: "Login", danger: false },
].map(({ to, label, danger }) => (
  <Link
    key={to}
    to={to}
    className={`w-full text-lg font-medium px-4 py-2 rounded-lg transition-all transform ${
      danger
        ? "hover:bg-red-500 text-white bg-red-500"
        : "text-white hover:bg-white hover:text-purple-600"
    }`}
    onClick={isLoggedIn && label === "Logout" ? handleLogout : null}
  >
    {label}
  </Link>
))}

          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔽 Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 🔲 Background Blur Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              onClick={toggleNotificationPanel} // Click outside to close
            ></motion.div>

            {/* 🔔 Sliding Panel */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="fixed top-0 left-0 right-0 h-fit bg-white shadow-2xl rounded-b-3xl p-6 z-50"
            >
              {/* Close Button */}
              <button
                onClick={toggleNotificationPanel}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-transform transform hover:scale-110"
              >
                <IoClose className="w-6 h-6" />
              </button>

              {/* 🔔 Notifications Content */}
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Latest Messages</h2>
              <div className="space-y-3">
                <div className="p-3 bg-gray-100 rounded-lg shadow-sm">🔹 New appointment scheduled!</div>
                <div className="p-3 bg-gray-100 rounded-lg shadow-sm">🔹 Your caregiver request has been approved.</div>
                <div className="p-3 bg-gray-100 rounded-lg shadow-sm">🔹 You received a new message.</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const NavItem = ({ to, onClick, icon, label, activeTab, setActiveTab }) => {
  const isActive = activeTab === to;

  return (
    <motion.div whileTap={{ scale: 0.9 }} className="flex flex-col items-center px-3" onClick={() => setActiveTab(to)}>
      <Link to={to} onClick={onClick} className="relative">
        <div className={`w-10 h-8 flex items-center justify-center rounded-lg transition-all ${isActive ? "text-white bg-primary-blue" : "text-gray-700"}`}>
          {icon}
        </div>
        <span className="mt-1 text-xs font-medium">{label}</span>
      </Link>
    </motion.div>
  );
};

export default Navbar;
