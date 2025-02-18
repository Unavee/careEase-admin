import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserSidebar from "./userSidebar";
import UserHome from "./UserHome";
import UserProfile from "./UserProfile";
import CaregiverHistory from "./CaregiverHistory";
import FindCare from "./FindCare";

const UserDashboard = () => {
  const userId = localStorage.getItem('userId');
  const [userDetails, setUserDetails] = useState(null);
  const [caregiverHistory, setCaregiverHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(userId); // Logs the userId for debugging
    
    if (userId) {
      // Hardcoded mock data for userDetails
      const mockUserDetails = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      };
      setUserDetails(mockUserDetails);

      // Hardcoded mock data for caregiver history
      const mockCaregiverHistory = [
        { id: 1, service: "Nursing Care", status: "Completed", date: "2024-12-01" },
        { id: 2, service: "Physical Therapy", status: "In Progress", date: "2024-12-15" },
      ];
      setCaregiverHistory(mockCaregiverHistory);

      // Simulate loading state
      setLoading(false);
    } else {
      console.error('No userId found in localStorage');
      setLoading(false);
    }
  }, [userId]);  // Add `userId` to the dependency array

  useEffect(() => {
    // Hide the bottom navigation bar
    const bottomNavBar = document.getElementById('bottom-nav-bar');
    if (bottomNavBar) {
      bottomNavBar.style.display = 'none';
    }

    // Place the mobile sidebar at the bottom
    const mobileSidebar = document.getElementById('mobile-sidebar');
    if (mobileSidebar) {
      mobileSidebar.style.position = 'fixed';
      mobileSidebar.style.bottom = '0';
      mobileSidebar.style.width = '100%';
    }

    // Hide the mobile navigation bar
    const mobileNavBar = document.querySelector('.mobile-nav-bar');
    if (mobileNavBar) {
      mobileNavBar.style.display = 'none';
    }

    return () => {
      // Restore the bottom navigation bar and mobile sidebar styles on component unmount
      // if (bottomNavBar) {
      //   bottomNavBar.style.display = '';
      // }
      // if (mobileSidebar) {
      //   mobileSidebar.style.position = '';
      //   mobileSidebar.style.bottom = '';
      //   mobileSidebar.style.width = '';
      // }
      // // Restore the mobile navigation bar
      // if (mobileNavBar) {
      //   mobileNavBar.style.display = '';
      // }
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Content */}
      <div className="flex-grow bg-gray-100 p-6 overflow-y-auto">
        <Routes>
          {/* Default Route - User Home */}
          <Route path="/" element={<UserHome />} />

          {/* Profile Route */}
          <Route
            path="/profile"
            element={<UserProfile />}
          />
           <Route
            path="/findcare"
            element={<FindCare/>}
          />

          {/* Caregiver History Route */}
          <Route
            path="/history"
            element={<CaregiverHistory history={caregiverHistory} />}
          />
          
        </Routes>
      </div>
    </div>
  );
};

export default UserDashboard;
