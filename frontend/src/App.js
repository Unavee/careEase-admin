import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import Signup from "./components/Signup";
import Services from "./components/Services";
import BookingPage from "./pages/BookingPage";
import InformationPage from "./pages/InformationPage";
import ProvideCare from "./pages/ProvideCare";
import Footer from "./components/Footer";
import NurseForm from "./pages/NurseForm";
import UserDashboard from "./components/UserDashboard"; // UserDashboard Component
import HowItWorks from "./components/HowItWorks";
import Physiotherapy from "./pages/Physiotherapy";
import Contact from "./components/Contact";
import AttendantCareForm from "./pages/AttendantCareForm";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    localStorage.setItem("userId", user.uid); // Store userId in localStorage
  };
  

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("userId"); // Remove userId from localStorage
  };

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/signin" />;
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signin"
          element={isLoggedIn ? <Navigate to="/services" /> : <SignIn onLogin={handleLogin} />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/services" /> : <Signup />}
        />
        <Route
          path="/how-it-works"
          element={<HowItWorks />}
        />
         <Route
          path="/contact"
          element={<Contact />}
        />
        <Route
        path="/attendantCareForm/register"
        element={<AttendantCareForm/>}
        />
        <Route path="/services" element={<Services />} />
        {/* <Route
          path="/services"
          element={<ProtectedRoute><Services /></ProtectedRoute>}
        /> */}
        <Route
          path="/bookingPage"
          element={<ProtectedRoute><BookingPage /></ProtectedRoute>}
        />
        <Route
          path="/fill-info"
          element={<ProtectedRoute><InformationPage /></ProtectedRoute>}
        />
        <Route
          path="/providecare"
          element={<ProtectedRoute><ProvideCare /></ProtectedRoute>}
        />
        <Route
          path="/nurse/register"
          element={<ProtectedRoute><NurseForm /></ProtectedRoute>}
        />
        <Route
        path="/physiotherapy/register"
        element={<ProtectedRoute><Physiotherapy /></ProtectedRoute>}
        />
        {/* UserDashboard Route */}
        <Route
          path="/userdashboard/*"
          element={
            <ProtectedRoute>
              <UserDashboard /> {/* No need to pass user details here */}
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
