import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setShowErrorPopup(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        firstName,
        lastName,
        email,
        password,
      });

      if (response.data.success) {
        setSuccess("Account created successfully!");
        setShowSuccessPopup(true);
        setTimeout(() => navigate("/signin"), 2000); // Redirect after success message
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
      setShowErrorPopup(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sans bg-gray-50 relative">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover min-w-full min-h-full"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Signup Card */}
      <div className="w-full max-w-md p-6 z-10">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl lg:text-3xl font-bold text-center text-primary-blue mb-6">
            Create Your Account
          </h1>

          {/* Error and Success Messages */}
          {error && (
            <p className="text-red-600 text-sm text-center mb-4">{error}</p>
          )}
          {success && (
            <p className="text-green-600 text-sm text-center mb-4">{success}</p>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
                required
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none"
              required
            />

            <button
              type="submit"
              className="w-full bg-primary-blue text-white py-3 rounded-lg font-medium hover:bg-primary-green transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/signin" className="text-primary-blue hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-8 rounded-lg shadow-lg animate__animated animate__fadeIn">
            <h2 className="text-xl font-bold text-green-600 text-center">
              Account Created Successfully!
            </h2>
            <p className="text-center text-gray-600 mt-4">
              You can now log in to your account.
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="bg-primary-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {showErrorPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-8 rounded-lg shadow-lg animate__animated animate__fadeIn">
            <h2 className="text-xl font-bold text-red-600 text-center">
              Error!
            </h2>
            <p className="text-center text-gray-600 mt-4">{error}</p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowErrorPopup(false)}
                className="bg-primary-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
