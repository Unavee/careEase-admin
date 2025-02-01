import React, { useEffect, useState } from "react";
import axios from "axios";

const UserInfo = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage

  useEffect(() => {
    if (!userId) {
      alert("User not logged in!");
      return;
    }

    axios
      .get(`http://localhost:5000/api/users/${userId}`)
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!userData) {
    return <p className="text-center text-red-500">No user data found.</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-700 mb-4">User Information</h2>
        <div className="space-y-3">
          <p className="text-gray-600"><strong>First Name:</strong> {userData.firstName}</p>
          <p className="text-gray-600"><strong>Last Name:</strong> {userData.lastName}</p>
          <p className="text-gray-600"><strong>Email:</strong> {userData.email}</p>
          <p className="text-gray-600"><strong>Phone:</strong> {userData.phone}</p>
          <p className="text-gray-600"><strong>Address:</strong> {userData.address}</p>
          <p className="text-gray-600"><strong>Pincode:</strong> {userData.pincode}</p>
          <p className="text-gray-600"><strong>State:</strong> {userData.state}</p>
          <p className="text-gray-600"><strong>City:</strong> {userData.city}</p>
          <p className="text-gray-600"><strong>Role:</strong> {userData.role}</p>
          {userData.patientImagePreview && (
            <img src={userData.patientImagePreview} alt="Patient" className="w-24 h-24 rounded-full mx-auto" />
          )}
          {userData.userImagePreview && (
            <img src={userData.userImagePreview} alt="User" className="w-24 h-24 rounded-full mx-auto" />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
