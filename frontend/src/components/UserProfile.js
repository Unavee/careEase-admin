import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, update } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    profileImage: "",
  });
  const [formSubmissions, setFormSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const db = getDatabase();
          const userRef = ref(db, `users/${user.uid}`);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            setUserData(snapshot.val());
          }

          // Fetch forms submitted by the user
          const formRef = ref(db, `forms`);
          const formSnapshot = await get(formRef);

          if (formSnapshot.exists()) {
            const forms = [];
            formSnapshot.forEach((childSnapshot) => {
              const formData = childSnapshot.val();
              if (formData.userId === user.uid) {
                forms.push(formData);
              }
            });
            setFormSubmissions(forms);
          }
        }
      } catch (error) {
        setMessage("Error fetching user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}`);

        await update(userRef, userData);
        setMessage("Profile updated successfully!");
        setEditMode(false);
      }
    } catch (error) {
      setMessage("Error updating profile.");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        const storage = getStorage();
        const storageRefPath = storageRef(storage, `profileImages/${user.uid}`);

        await uploadBytes(storageRefPath, file);
        const downloadURL = await getDownloadURL(storageRefPath);

        setUserData((prev) => ({ ...prev, profileImage: downloadURL }));
      } catch (error) {
        setMessage("Error uploading profile image.");
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 space-y-6"
      >
        {/* Header Section */}
        <div className="flex items-center space-x-6 border-b pb-6">
          <div className="relative">
            <img
              src={
                userData.profileImage || "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
            />
            {editMode && (
              <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer">
                <FaEdit className="text-white" />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {userData.firstName || "First Name"} {userData.lastName || "Last Name"}
            </h1>
            <p className="text-gray-600">{userData.email || "user@example.com"}</p>
          </div>
        </div>

        {/* Editable Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600">First Name</label>
              <input
                type="text"
                value={userData.firstName}
                disabled={!editMode}
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
                className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Last Name</label>
              <input
                type="text"
                value={userData.lastName}
                disabled={!editMode}
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
                className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Phone</label>
              <input
                type="text"
                value={userData.phone}
                disabled={!editMode}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Address</label>
              <textarea
                value={userData.address}
                disabled={!editMode}
                onChange={(e) =>
                  setUserData({ ...userData, address: e.target.value })
                }
                className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
          </div>

          {/* Display Submitted Forms */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Forms You Submitted</h2>
            {formSubmissions.length > 0 ? (
              <ul className="mt-4 space-y-4">
                {formSubmissions.map((form, index) => (
                  <li
                    key={index}
                    className="p-4 bg-gray-100 rounded-md shadow-sm border"
                  >
                    <p className="text-lg font-medium">Category: {form.category}</p>
                    <p className="text-sm text-gray-600">City: {form.city}</p>
                    <p className="text-sm text-gray-600">State: {form.state}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-gray-500">No forms submitted yet.</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            {editMode ? (
              <>
                <button
                  onClick={() => setEditMode(false)}
                  className="py-2 px-6 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {message && (
          <div
            className={`mt-6 p-4 rounded-md text-center ${
              message.includes("Error")
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {message}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UserProfile;
