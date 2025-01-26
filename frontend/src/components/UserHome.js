import React, { useState, useEffect } from "react";
import { FaUsers, FaRegListAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth } from "firebase/auth"; // Import Firebase Auth

const UserHome = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const storedEmail = localStorage.getItem("userEmail");
          console.log("Stored Email:", storedEmail);

          if (storedEmail === user.email) {
            // Proceed with fetching data from Firebase Realtime Database if the user is authenticated and emails match
            const db = getDatabase();
            const usersRef = ref(db, "users");

            // Fetch all users from Realtime Database and find the matching email
            const snapshot = await get(usersRef);

            if (snapshot.exists()) {
              let userFound = false;

              snapshot.forEach((userSnapshot) => {
                const userData = userSnapshot.val();

                // Check if the user's email matches the stored email
                if (userData.email === storedEmail) {
                  setFirstName(userData.firstName || ""); // Set firstName
                  setLastName(userData.lastName || "");   // Set lastName
                  userFound = true;
                  return; // Exit loop once user is found
                }
              });

              if (!userFound) {
                console.error("No user found with the given email.");
              }
            } else {
              console.error("No data found in the users collection.");
            }
          } else {
            console.error("Stored email does not match authenticated user email");
          }
        } else {
          console.error("User is not authenticated");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Set loading to false once fetching is done
      }
    };

    const storedEmail = localStorage.getItem("userEmail");

    if (storedEmail) {
      fetchUser();
    } else {
      setLoading(false); // Set loading to false if no email is stored
    }
  }, []); // Empty dependency array means this will run once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Show loading while checking user data
  }

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome, {firstName || "Guest"} {lastName || ""}!
      </h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white p-6 shadow-lg rounded-lg flex items-center">
          <FaUsers className="text-4xl text-blue-500 mr-4" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Total Services</h2>
            <p className="text-sm text-gray-600">5 completed</p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-white p-6 shadow-lg rounded-lg flex items-center">
          <FaRegListAlt className="text-4xl text-green-500 mr-4" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Active Orders</h2>
            <p className="text-sm text-gray-600">2 in progress</p>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-white p-6 shadow-lg rounded-lg flex items-center">
          <FaClock className="text-4xl text-yellow-500 mr-4" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Average Response Time</h2>
            <p className="text-sm text-gray-600">15 minutes</p>
          </div>
        </div>
        {/* Card 4 */}
        <div className="bg-white p-6 shadow-lg rounded-lg flex items-center">
          <FaMapMarkerAlt className="text-4xl text-red-500 mr-4" />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Caregiver Near You</h2>
            <p className="text-sm text-gray-600">3 available</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <ul className="divide-y divide-gray-200">
          <li className="py-4 flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800">
                Booked Nursing Care
              </p>
              <p className="text-xs text-gray-600">2 days ago</p>
            </div>
            <span className="text-sm text-green-500 font-semibold">Completed</span>
          </li>
          {/* More activities */}
        </ul>
      </div>
    </div>
  );
};

export default UserHome;
