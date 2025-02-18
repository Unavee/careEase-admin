import { useState } from "react";
import { motion } from "framer-motion";

export default function Index() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [experienceRange, setExperienceRange] = useState([0]);
  const [shortlistedProviders, setShortlistedProviders] = useState([]);
  const [rating, setRating] = useState(0);
  const [minReviews, setMinReviews] = useState(0);

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

  const careProviders = [
    {
      id: "1",
      name: "Gayathri M",
      image: "/c1.png",
      experience: 5,
      category: ["Elderly Care", "Home Medical Services"],
      description: "Reading books, dancing, skilled in elderly care and medical procedures",
      location: "Chennai",
      rating: 4.5,
      reviews: 50
    },
    {
      id: "2",
      name: "Nagarathna G",
      image: "/c1.png",
      experience: 5,
      category: ["Intensive Care at Home", "Post-Accident Care"],
      description: "Well hospital experience, critically ill patients take carer, all procedure expert, 24hrs care",
      location: "Bangalore",
      rating: 4.0,
      reviews: 120
    },
    {
      id: "3",
      name: "Kavya K",
      image: "/c1.png",
      experience: 5,
      category: ["Special Needs Care", "Physiotherapy"],
      description: "Well trained nurse Tracheostomy care folys catherzation iv canullization",
      location: "Mumbai",
      rating: 3.8,
      reviews: 30,
    },
    {
      id: "4",
      name: "Suresh P",
      image: "/c1.png",
      experience: 7,
      category: ["Mother Care", "Child Care"],
      description: "Experienced in newborn care, child development, lactation support, and parenting guidance",
      location: "Delhi",
      rating: 3.9,
      reviews: 30,
    },
    {
      id: "5",
      name: "Priya S",
      image: "/c1.png",
      experience: 10,
      category: ["Post-Accident Care", "Physiotherapy"],
      description: "Specialized in post-surgery rehabilitation, physiotherapy treatments, and pain management",
      location: "Kolkata",
      rating: 3.8,
      reviews: 30,
    },
    {
      id: "6",
      name: "Vijay R",
      image: "/c1.png",
      experience: 12,
      category: ["Elderly Care", "Intensive Care at Home"],
      description: "Expert in managing chronic illness, critical care patients, and elderly assistance at home",
      location: "Chennai",
      rating: 3.8,
      reviews: 30,
    },
    {
      id: "7",
      name: "Ravi K",
      image: "/c1.png",
      experience: 6,
      category: ["Home Medical Services", "Special Needs Care"],
      description: "Offers at-home medical assistance, wound care, and support for patients with special needs",
      location: "Hyderabad",
      rating: 3.8,
      reviews: 30,
    },
    {
      id: "8",
      name: "Anjali V",
      image: "/c1.png",
      experience: 3,
      category: ["Mother Care", "Child Care"],
      description: "Specialist in maternity care, newborn screening, breastfeeding consultation, and pediatric care",
      location: "Mumbai",
      rating: 3.8,
      reviews: 30,
    },
    {
      id: "9",
      name: "Siddharth M",
      image: "/c1.png",
      experience: 8,
      category: ["Post-Accident Care", "Physiotherapy"],
      description: "Focuses on rehabilitation post-accident, pain relief therapies, and restoring mobility",
      location: "Bangalore",
      rating: 3.8,
      reviews: 30,
    },
    {
      id: "10",
      name: "Neelam S",
      image: "/c1.png",
      experience: 4,
      category: ["Elderly Care", "Home Medical Services"],
      description: "Specialized in elder care, managing elderly health conditions, and home medical assistance",
      location: "Pune",
      rating: 3.8,
      reviews: 30,
    },
    {
      id: "11",
      name: "Rajesh T",
      image: "/c1.png",
      experience: 9,
      category: ["Intensive Care at Home", "Post-Accident Care"],
      description: "Provides critical care support, rehabilitation, and post-accident assistance at home",
      location: "Chennai",
      rating: 3.8,
      reviews: 30,
    },
    {
      id: "12",
      name: "Nisha A",
      image: "/c1.png",
      experience: 15,
      category: ["Special Needs Care", "Physiotherapy"],
      description: "Trained physiotherapist for special needs children, pain management, and movement therapies",
      location: "Delhi",
      rating: 3.8,
      reviews: 30,
    },
  ];

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleShortlist = (providerId) => {
    setShortlistedProviders((prev) =>
      prev.includes(providerId)
        ? prev.filter((id) => id !== providerId)
        : [...prev, providerId]
    );
  };

  const filteredProviders = careProviders.filter((provider) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      provider.category.some((cat) => selectedCategories.includes(cat));
    const matchesExperience = provider.experience >= experienceRange[0];
    const matchesRating = provider.rating >= rating;
    const matchesReviews = provider.reviews >= minReviews;
    return matchesCategory && matchesExperience && matchesRating && matchesReviews;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className=" shadow-sm py-6">
        <div className="container">
          <h1 className="text-4xl font-bold text-center text-primary-blue">Care Services</h1>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <div>
              <h2 className="text-lg font-semibold mb-4 text-primary-blue">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`w-full text-left text-blue-800 px-4 py-2 rounded-md transition-colors ${
                      selectedCategories.includes(category)
                        ? "bg-primary-blue text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4 text-primary-blue">Experience (Years)</h2>
              <input
                type="range"
                min="0"
                max="20"
                value={experienceRange[0]}
                onChange={(e) => setExperienceRange([Number(e.target.value)])}
                className="w-full"
              />
              <p className="mt-2 text-sm text-gray-600">{experienceRange[0]}+ years</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4 text-primary-blue">Rating (Stars)</h2>
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full"
              />
              <p className="mt-2 text-sm text-gray-600">{rating} Stars & Above</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4 text-primary-blue">Minimum Reviews</h2>
              <input
                type="number"
                value={minReviews}
                onChange={(e) => setMinReviews(Number(e.target.value))}
                className="w-full p-2 border rounded-md"
                placeholder="Enter minimum number of reviews"
              />
            </div>
          </aside>

          {/* Care Providers Grid */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careProviders
                .filter((provider) => {
                  const matchesCategory =
                    selectedCategories.length === 0 ||
                    provider.category.some((cat) => selectedCategories.includes(cat));
                  const matchesExperience = provider.experience >= experienceRange[0];
                  return matchesCategory && matchesExperience;
                })
                .map((provider) => (
                  <motion.div
                    key={provider.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-4 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={provider.image}
                            alt={provider.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold">{provider.name}</h3>
                            <p className="text-sm text-gray-600">{provider.experience} years exp.</p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleShortlist(provider.id)}
                          className={`px-4 py-1 text-sm rounded-full border transition-colors ${
                            shortlistedProviders.includes(provider.id)
                              ? "bg-primary text-black border-primary"
                              : "border-gray-300 hover:border-primary hover:text-primary"
                          }`}
                        >
                          {shortlistedProviders.includes(provider.id)
                            ? "Selected"
                            : "Select"}
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">{provider.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {provider.category.map((cat) => (
                          <span key={cat} className="px-2 py-1 text-xs bg-gray-100 rounded-full">
                            {cat}
                          </span>
                        ))}
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-600">
                      <span className="mr-2">Rating: {provider.rating}⭐</span>
                      <span className="text-gray-400">({provider.reviews} reviews)</span>
                    </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
