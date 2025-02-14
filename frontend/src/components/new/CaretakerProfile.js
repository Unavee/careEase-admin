import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";

const CaretakerProfile = () => {
  const [caretakerData, setCaretakerData] = useState({
    firstName: "John",
    lastName: "Doe",
    age: 30,
    gender: "Male",
    profileImage: "",
    quickSummary: "Experienced caretaker with over 5 years of service.",
    experience: 3, // Default rating
  });
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCaretakerData((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    setMessage("Profile updated successfully!");
    setEditMode(false);
  };

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
              src={caretakerData.profileImage || "https://via.placeholder.com/150"}
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
              {caretakerData.firstName} {caretakerData.lastName}
            </h1>
            <p className="text-gray-600">Age: {caretakerData.age}</p>
            <p className="text-gray-600">Gender: {caretakerData.gender}</p>
          </div>
        </div>

        {/* Editable Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600">First Name</label>
              <input
                type="text"
                value={caretakerData.firstName}
                disabled={!editMode}
                onChange={(e) =>
                  setCaretakerData({ ...caretakerData, firstName: e.target.value })
                }
                className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Last Name</label>
              <input
                type="text"
                value={caretakerData.lastName}
                disabled={!editMode}
                onChange={(e) =>
                  setCaretakerData({ ...caretakerData, lastName: e.target.value })
                }
                className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Age</label>
              <input
                type="number"
                value={caretakerData.age}
                disabled={!editMode}
                onChange={(e) =>
                  setCaretakerData({ ...caretakerData, age: e.target.value })
                }
                className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600">Gender</label>
              <select
                value={caretakerData.gender}
                disabled={!editMode}
                onChange={(e) =>
                  setCaretakerData({ ...caretakerData, gender: e.target.value })
                }
                className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600">Quick Summary</label>
              <textarea
                value={caretakerData.quickSummary}
                disabled={!editMode}
                onChange={(e) =>
                  setCaretakerData({ ...caretakerData, quickSummary: e.target.value })
                }
                className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
          </div>

          {/* Experience Rating */}
          <div>
            <label className="block text-sm text-gray-600">Experience (Rating)</label>
            <div className="flex space-x-2">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`cursor-pointer text-xl ${index < caretakerData.experience ? "text-yellow-400" : "text-gray-300"}`}
                  onClick={() => setCaretakerData({ ...caretakerData, experience: index + 1 })}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
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

export default CaretakerProfile;
