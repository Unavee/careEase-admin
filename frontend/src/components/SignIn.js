import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from '../firebaseConfig';  // Import the signIn method
import { auth } from '../firebaseConfig';  // Import Firebase auth

const SignIn = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPopup, setErrorPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorPopup(false); // Reset error popup
    setLoading(true);

    try {
      // Use the signInWithEmailAndPassword method from Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Login successful, get user data
      const user = userCredential.user;
      console.log("User ID:", user.uid);
      // Save data to localStorage
      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userId", user.uid);

      onLogin(user); // Pass user data to parent via onLogin
      setShowSuccessPopup(true); // Show success popup
    } catch (err) {
      console.error(err);
      setErrorPopup(true); // Show error popup
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleContinue = () => {
    setShowSuccessPopup(false); // Close success popup

    // Add a delay of 3 seconds (3000ms) before navigating
    setTimeout(() => {
      navigate("/services"); // Navigate to /services
    }, 3000); // Adjusted delay to 3 seconds
  };
  const handleCaretakerLogin = () => {
    navigate("/caretakerlogin"); // Navigate to caretaker login
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center font-sans bg-gray-50 relative">
      {/* Background video */}
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
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="w-full max-w-md p-6 z-10">
        {/* Login Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl lg:text-3xl font-bold text-center text-primary-blue mb-6">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-center mb-6">
            Please log in to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none transition-all duration-300"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:outline-none transition-all duration-300"
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-blue text-white py-3 rounded-lg font-medium hover:bg-primary-green transition duration-300 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Log In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-primary-blue hover:underline cursor-pointer"
            >
              Sign Up
            </span>
          </p>
          <p
  onClick={handleCaretakerLogin}
  className="text-primary-blue text-sm text-center mt-4 cursor-pointer hover:underline"
>
  Continue as a Caretaker
</p>


          <p
            onClick={() => navigate("/forgot-password")}
            className="text-primary-blue text-sm text-center mt-2 cursor-pointer hover:underline"
          >
            Forgot Password?
          </p>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-8 rounded-lg shadow-lg animate__animated animate__fadeIn">
            <h2 className="text-xl font-bold text-green-600 text-center">
              Login Successful!
            </h2>
            <p className="text-center text-gray-600 mt-4">
              Welcome back! You have successfully logged in.
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleContinue}
                className="bg-primary-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {errorPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-8 rounded-lg shadow-lg animate__animated animate__fadeIn">
            <h2 className="text-xl font-bold text-red-600 text-center">
              Login Failed
            </h2>
            <p className="text-center text-gray-600 mt-4">
              Invalid email or password. Please try again.
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setErrorPopup(false)}
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

export default SignIn;
