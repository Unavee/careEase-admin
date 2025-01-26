
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { db, collection, addDoc } from '../firebaseConfig'; // Import Firestore methods

const InformationPage = () => {
  const [role, setRole] = useState("Patient");
  const [patientImagePreview, setPatientImagePreview] = useState(null);
  const [userImagePreview, setUserImagePreview] = useState(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({}); // State to hold form errors
  const [emailExists, setEmailExists] = useState(false); // State to track email existence

  const location = useLocation();
  const { category } = location.state || {};

  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");  // Get email from local storage
    if (storedEmail) {
      setEmail(storedEmail);
      // Fetch userId from the users collection using the stored email
      axios.get(`http://localhost:5000/api/users?email=${storedEmail}`)
        .then(response => {
          console.log(response.data);  // Log the full response
          const { userId } = response.data;
          if (userId) {
            setUserId(userId);
            setIsLoading(false);
          } else {
            alert("User not found.");
            setIsLoading(false);
          }
        })
        .catch(error => {
          console.error("Error fetching user info:", error);
          setIsLoading(false);
        });
    } else {
      alert("Please log in first");
      navigate("/login");
    }
  }, [navigate]);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleImageUpload = (event, setImagePreview) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);  // Set the image preview
      };
      reader.readAsDataURL(file);  // Read the image file as a data URL
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!firstName) newErrors.firstName = "First name is required.";
    if (!lastName) newErrors.lastName = "Last name is required.";
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please enter a valid email address.";
    if (!phone || !/^\d{10}$/.test(phone)) newErrors.phone = "Please enter a valid 10-digit phone number.";
    if (!address) newErrors.address = "Address is required.";
    if (!pincode) newErrors.pincode = "Pincode is required.";
    if (!state) newErrors.state = "State is required.";
    if (!city) newErrors.city = "City is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return; // Don't submit if form is invalid
    
    // Check if email already exists in backend before submitting form
    try {
      const response = await axios.get(`http://localhost:5000/api/api/users?email=${email}`);
      if (response.data) {
        setEmailExists(false);
       // Stop form submission if email already exists
      }
      setEmailExists(false);
    } catch (error) {
      console.error("Error checking email:", error);
    }

    const formData = {
      userId,
      category,
      firstName,
      lastName,
      email,
      phone,
      address,
      pincode,
      state,
      city,
      role,
      patientImagePreview,
      userImagePreview
    };

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("You must be logged in to submit the form.");
      navigate("/login");
      return;
    }

    try {
      // Store form data in Firebase Firestore
      const userCollection = collection(db, "users"); // Specify your collection name
      const docRef = await addDoc(userCollection, formData);  // Add form data as a new document
      console.log("Document written with ID: ", docRef.id);
      alert("Form submitted successfully");
      navigate("/services"); // Redirect after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response && error.response.status === 409) {
        alert("Conflict: Email already exists. Please try a different one.");
      } else {
        alert("Error submitting form.");
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 mt-14">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg p-8 max-w-3xl mx-auto space-y-8"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Fill in Your Information
        </h2>

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-gray-700 font-medium">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter First Name"
              className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:ring-2 focus:ring-green-300"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-gray-700 font-medium">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter Last Name"
              className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:ring-2 focus:ring-green-300"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:ring-2 focus:ring-green-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailExists && <p className="text-red-500 text-sm">Email already exists.</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-700 font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter Phone Number"
              className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:ring-2 focus:ring-green-300"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-gray-700 font-medium">
            Address (Patient)
          </label>
          <textarea
            id="address"
            name="address"
            placeholder="Enter Address"
            className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:ring-2 focus:ring-green-300"
            rows="3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Pincode, State, and City */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="pincode" className="block text-gray-700 font-medium">
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              placeholder="Enter Pincode"
              className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:ring-2 focus:ring-green-300"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-gray-700 font-medium">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="Enter State"
              className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:ring-2 focus:ring-green-300"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-gray-700 font-medium">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Enter City"
              className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:ring-2 focus:ring-green-300"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Role Selection */}
        <div className="flex items-center space-x-4">
          <label htmlFor="role" className="text-gray-700 font-medium">
            Select Role:
          </label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={handleRoleChange}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-300"
          >
            <option value="Patient">Patient</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="space-y-4">
          <label htmlFor="patientImage" className="block text-gray-700 font-medium">
            Upload Patient Image (Optional)
          </label>
          <input
            type="file"
            id="patientImage"
            name="patientImage"
            className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300"
            onChange={(e) => handleImageUpload(e, setPatientImagePreview)}
          />
          {patientImagePreview && (
            <img
              src={patientImagePreview}
              alt="Patient Preview"
              className="mt-4 w-32 h-32 object-cover rounded-lg"
            />
          )}
        </div>

        <div className="space-y-4">
          <label htmlFor="userImage" className="block text-gray-700 font-medium">
            Upload User Image (Optional)
          </label>
          <input
            type="file"
            id="userImage"
            name="userImage"
            className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-300"
            onChange={(e) => handleImageUpload(e, setUserImagePreview)}
          />
          {userImagePreview && (
            <img
              src={userImagePreview}
              alt="User Preview"
              className="mt-4 w-32 h-32 object-cover rounded-lg"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg font-medium focus:ring-2 focus:ring-green-300 mt-6"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default InformationPage;
