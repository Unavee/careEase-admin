import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowDownCircle, RefreshCcw } from "lucide-react";
import { useLocation } from "react-router-dom";
const categories = [
  "Elderly Care",
  "Mother Care",
  "Child Care",
  "Post-Accident Care",
  "Physiotherapy",
  "Home Medical Services",
  "Special Needs Care",
  "Intensive Care at Home",
];

const experienceLevels = ["Junior", "Mid", "Senior"];

const caretakers = [
  {
    id: 1,
    name: "John Doe",
    rating: 4.8,
    charges: "₹25/hr",
    image: "https://via.placeholder.com/150",
    category: "Elderly Care",
    language: "English",
    experience: "Senior",
    price: 25,
  },
  {
    id: 2,
    name: "Emily Smith",
    rating: 4.7,
    charges: "₹30/hr",
    image: "https://via.placeholder.com/150",
    category: "Child Care",
    language: "Spanish",
    experience: "Mid",
    price: 30,
  },
  {
    id: 3,
    name: "David Johnson",
    rating: 4.5,
    charges: "₹22/hr",
    image: "https://via.placeholder.com/150",
    category: "Physiotherapy",
    language: "French",
    experience: "Junior",
    price: 22,
  },
  {
    id: 4,
    name: "Sophia Lee",
    rating: 4.9,
    charges: "₹28/hr",
    image: "https://via.placeholder.com/150",
    category: "Home Medical Services",
    language: "German",
    experience: "Senior",
    price: 28,
  },
  {
    id: 5,
    name: "Michael Brown",
    rating: 4.6,
    charges: "₹20/hr",
    image: "https://via.placeholder.com/150",
    category: "Post-Accident Care",
    language: "English",
    experience: "Mid",
    price: 20,
  },
];

const FindCare = ({ selectedCategoryFromHome }) => {
  const [showMore, setShowMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryFromHome || "");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(10000); // Default price
  const [selectedExperience, setSelectedExperience] = useState("");
  const [sortedCaretakers, setSortedCaretakers] = useState(caretakers);

  const { state } = useLocation();
  const { patientDetails = {}, category = "" } = state || {}; // Fallback to empty object or string

  // Log patientDetails and category to console
  useEffect(() => {
    console.log("Patient Details:", patientDetails);
    console.log("Category:", category);
  }, [patientDetails, category]);


  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedLanguage("");
    setSelectedRating("");
    setSelectedPrice(10000);
    setSelectedExperience("");
  };

  useEffect(() => {
    let filteredCaretakers = caretakers;

    if (selectedCategory) {
      filteredCaretakers = filteredCaretakers.filter(
        (caretaker) => caretaker.category === selectedCategory
      );
    }

    if (selectedLanguage) {
      filteredCaretakers = filteredCaretakers.filter(
        (caretaker) => caretaker.language === selectedLanguage
      );
    }

    if (selectedRating) {
      filteredCaretakers = filteredCaretakers.filter(
        (caretaker) => caretaker.rating >= parseFloat(selectedRating)
      );
    }

    if (selectedExperience) {
      filteredCaretakers = filteredCaretakers.filter(
        (caretaker) => caretaker.experience === selectedExperience
      );
    }

    if (selectedPrice) {
      filteredCaretakers = filteredCaretakers.filter(
        (caretaker) => caretaker.price <= selectedPrice
      );
    }

    if (searchTerm) {
      filteredCaretakers = filteredCaretakers.filter((caretaker) =>
        caretaker.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setSortedCaretakers(filteredCaretakers);
  }, [
    selectedCategory,
    selectedLanguage,
    selectedRating,
    selectedPrice,
    selectedExperience,
    searchTerm,
  ]);

  // Sorting function
  const handleSort = (order) => {
    const sorted = [...sortedCaretakers];
    sorted.sort((a, b) => {
      if (order === "A-Z") return a.name.localeCompare(b.name);
      if (order === "Z-A") return b.name.localeCompare(a.name);
    });
    setSortedCaretakers(sorted);
  };  
  return (
    <div className="w-full flex flex-col md:flex-row bg-gray-100 text-black">
      {/* Left Sidebar */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg p-6 w-full md:w-1/4 shadow-md mb-6 md:mb-0"
      >
        {/* Section 1: Categories */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Available Categories</h2>
          {categories.slice(0, showMore ? categories.length : 5).map((category, index) => (
            <p
              key={index}
              className="p-2 border rounded-md mb-2 cursor-pointer hover:bg-primary-blue hover:text-white"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </p>
          ))}
          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-2 text-primary-blue hover:text-primary-green"
          >
            {showMore ? "Show Less" : "More Categories"}
          </button>
        </div>

        {/* Section 2: Ratings */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Ratings</h2>
          <select
            className="w-full p-2 border rounded-md"
            onChange={(e) => setSelectedRating(e.target.value)}
          >
            <option value="">All Ratings</option>
            <option value="4">⭐ 4 & Above</option>
            <option value="4.5">⭐ 4.5 & Above</option>
            <option value="5">⭐ 5 Only</option>
          </select>
        </div>

        {/* Section 3: Languages */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Languages</h2>
          <select
            className="w-full p-2 border rounded-md"
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="">All Languages</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </div>

        {/* Section 4: Experience Level */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Experience Level</h2>
          <select
            className="w-full p-2 border rounded-md"
            onChange={(e) => setSelectedExperience(e.target.value)}
          >
            <option value="">All Experience Levels</option>
            {experienceLevels.map((level, index) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Section 5: Price Range */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Price Range</h2>
          <input
            type="range"
            min="10"
            max="100000"
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="w-full"
          />
          <div className="flex justify-between">
            <span>₹10</span>
            <span>₹1 Lakh</span>
          </div>
        </div>
      </motion.div>

      {/* Right Section */}
      <div className="w-full md:w-3/4 px-6">
        {/* Top Bar: Search & Sort */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          {/* Search input */}
          <div className="flex items-center border p-2 rounded-md w-full bg-white shadow-md">
            <Search className="text-gray-500" />
            <input
              type="text"
              placeholder="Search caretakers..."
              className="ml-2 w-full outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Sort and Reset buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 sm:mt-0 w-full sm:w-auto">
            <button
              className="flex items-center gap-2 bg-primary-blue text-white px-4 py-3 rounded-md hover:bg-primary-green w-full sm:w-32"
              onClick={() => handleSort("A-Z")}
            >
              <ArrowDownCircle />
              A-Z
            </button>
            <button
              className="flex items-center gap-2 bg-primary-green text-white px-4 py-3 rounded-md hover:bg-primary-blue w-full sm:w-32"
              onClick={() => handleSort("Z-A")}
            >
              <ArrowDownCircle />
              Z-A
            </button>

            {/* Reset Filters */}
            <div className="text-right sm:text-left md:mt-3 sm:mt-0">
              <RefreshCcw
                className="cursor-pointer text-primary-blue hover:text-primary-green"
                onClick={resetFilters}
              />
            </div>
          </div>
        </div>

        {/* Caretakers List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedCaretakers.map((caretaker) => (
            <div key={caretaker.id} className="bg-white p-4 rounded-lg shadow-md">
              <img src={caretaker.image} alt={caretaker.name} className="w-full h-40 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold">{caretaker.name}</h3>
              <p className="text-gray-500">{caretaker.category}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-primary-blue">{caretaker.charges}</span>
                <div className="flex items-center gap-1">
                  <span>{caretaker.rating}</span>
                  <span>⭐</span>
                </div>
              </div>
              {/* Continue Button */}
              <button className="w-full py-2 bg-primary-blue text-white rounded-md hover:bg-primary-green transition-colors duration-200">
                Continue
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindCare;
