import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHospital, FaWheelchair, FaHeartbeat, FaUserNurse, FaBaby, FaChild, FaAmbulance, FaCut, FaDumbbell, FaChevronDown } from "react-icons/fa";

const BookingPage = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [pincodes, setPincodes] = useState([]);
  const [filteredPincodes, setFilteredPincodes] = useState([]);
  const [selectedPincode, setSelectedPincode] = useState(null); // To track selected pincode
  const [expandedPincodes, setExpandedPincodes] = useState([]); // Track which pincodes are expanded
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        if (response.data && response.data.categories) {
          setCategories(response.data.categories);
          setFilteredCategories(response.data.categories);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("Unable to fetch categories. Please ensure the backend is running.");
      }
    };
    fetchCategories();

    const fetchPincodes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/pincodes");
        if (response.data) {
          setPincodes(response.data);
          setFilteredPincodes(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching pincodes:", error);
        alert("Unable to fetch pincodes. Please ensure the backend is running.");
      }
    };
    fetchPincodes();
  }, []);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/users?email=${storedEmail}`);
          const user = response.data;
          if (user && user.uid) {
            setUserId(user.uid);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUser();
    }
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    const filtered = categories.filter((category) =>
      category.title.toLowerCase().includes(value)
    );
    setFilteredCategories(filtered);
    const filteredPin = pincodes.filter((pincode) => {
      return Object.keys(pincode).some((key) => pincode[key].some((code) => code.includes(value)));
    });
    setFilteredPincodes(filteredPin);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    const sorted = [...filteredCategories].sort((a, b) =>
      order === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
    setFilteredCategories(sorted);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(
      category._id === selectedCategory?._id ? null : category
    );
  };

  const handlePincodeSelect = (pincodeObj, pincode) => {
    setSelectedPincode(
      selectedPincode === pincode ? null : { name: pincodeObj.name, pincode }
    );
  };

  const handleTogglePincode = (pincodeName) => {
    setExpandedPincodes((prevExpanded) =>
      prevExpanded.includes(pincodeName)
        ? prevExpanded.filter((name) => name !== pincodeName)
        : [...prevExpanded, pincodeName]
    );
  };

  const storeduserId = localStorage.getItem("userId");
  const handleInfo = () => {
    if (!selectedCategory) {
      alert("Please select a category first.");
      return;
    }
    if (!selectedPincode) {
      alert("Please select a pincode first.");
      return;
    }
    if (!storeduserId) {
      alert("User not found. Please log in again.");
      return;
    }

    navigate("/fill-info", {
      state: { category: selectedCategory.title, userId, pincode: selectedPincode.pincode },
    });
  };

  // Helper function to render the appropriate icon using switch case
  const renderIcon = (category) => {
    switch (category.category) {
      case "elderly_care":
        return <FaUserNurse size={68} />;
      case "mother_care":
        return <FaBaby size={68} />;
      case "child_care":
        return <FaChild size={68} />;
      case "post_accident_care":
        return <FaAmbulance size={68} />;
      case "post_surgery_care":
        return <FaCut size={68} />;
      case "physiotherapy":
        return <FaDumbbell size={68} />;
      case "home_medical_services":
        return <FaHospital size={68} />;
      case "special_needs_care":
        return <FaWheelchair size={68} />;
      case "intensive_care_at_home":
        return <FaHeartbeat size={68} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen relative mt-20">
      <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-96 lg:h-full bg-gray-200 rounded-lg">
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345096346!2d144.9537363155047!3d-37.81627974202144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5772ab00f8b6d0!2sMelbourne%2C%20Australia!5e0!3m2!1sen!2sin!4v1623746058855!5m2!1sen!2sin"
            className="w-full h-full rounded-lg border-0"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-black mb-4">Available Pincodes</h2>
          <div className="overflow-y-auto h-96">
            <ul className="space-y-4">
              {filteredPincodes.length === 0 ? (
                <p>No pincodes found.</p>
              ) : (
                filteredPincodes.map((pincodeObj, index) => (
                  <li key={index} className="px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-200 transition-all">
                    <div className={`flex justify-between items-center`}>
                      <div>{pincodeObj.name}</div>
                      <button
                        onClick={() => handleTogglePincode(pincodeObj.name)}
                        className="text-primary-blue"
                      >
                        <FaChevronDown
                          size={20}
                          className={`transition-transform ${
                            expandedPincodes.includes(pincodeObj.name) ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                    {expandedPincodes.includes(pincodeObj.name) && (
                      <div className="mt-2">
                        {pincodeObj.pincodes.map((pincode, idx) => (
                          <div
                            key={idx}
                            onClick={() => handlePincodeSelect(pincodeObj, pincode)}
                            className={`cursor-pointer py-1 px-2 rounded-lg hover:bg-primary-blue hover:text-white transition-all ${
                              selectedPincode?.pincode === pincode ? "bg-primary-blue text-white" : ""
                            }`}
                          >
                            {pincode}
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>

      <section className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-primary-blue text-center mb-6">
          Choose Category
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-6">
          <input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Search categories or pincodes..."
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow focus:ring focus:ring-green-300 focus:outline-none"
          />
          <div className="flex gap-4">
            <button
              onClick={() => handleSortChange("asc")}
              className={`px-4 py-2 rounded-lg shadow ${
                sortOrder === "asc" ? "bg-primary-blue text-white" : "bg-white border border-gray-300"
              } hover:bg-primary-green hover:text-white transition-all`}
            >
              Sort A-Z
            </button>
            <button
              onClick={() => handleSortChange("desc")}
              className={`px-4 py-2 rounded-lg shadow ${
                sortOrder === "desc" ? "bg-primary-blue text-white" : "bg-white border border-gray-300"
              } hover:bg-primary-green hover:text-white transition-all`}
            >
              Sort Z-A
            </button>
          </div>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-4">
          {filteredCategories.length === 0 ? (
            <p>No categories found.</p>
          ) : (
            filteredCategories.map((category) => (
              <div
                key={category._id}
                className={`min-w-[180px] rounded-lg shadow-md transform hover:scale-105 transition-all text-center ${
                  selectedCategory === category ? "bg-white text-black" : "bg-white"
                }`}
              >
                <div className="w-full h-32 flex justify-center items-center bg-gray-200">
                  {renderIcon(category)} {/* Render the icon based on the category */}
                </div>
                <div className="p-4">
                  <p>{category.title || "Untitled"}</p>
                  <button
                    onClick={() => handleCategorySelect(category)}
                    className="mt-4 w-full py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-green transition-all"
                  >
                    {selectedCategory === category ? "Deselect" : "Select"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={handleInfo}
            className="px-6 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-green transition-all"
          >
            Fill Information
          </button>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;
