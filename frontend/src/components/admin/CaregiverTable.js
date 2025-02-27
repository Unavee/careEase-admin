import React, { useState } from "react";

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
      reviews: 50,
      status: "Available",
      form: "/",
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
      reviews: 120,
        status: "Busy",
        form: "/",
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
    status: "Unavailable",
    form: "/",
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
    status: "Available",
    form: "/",
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
      status: "Aavailable",
      form: "/",
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
       status: "Unavailable",
       form: "/",
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
       status: "Busy",
       form: "/",
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
       status: "Busy",
       form: "/",
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
       status: "Aavailable",
       form: "/",
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
       status: "Aavailable",
       form: "/",
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
       status: "Busy",
       form: "/",
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
       status: "Aavailable",
       form: "/",
    },
  ];

const CaregiverTable = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchName, setSearchName] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredProviders = careProviders.filter((provider) => {
    return (
      (selectedCategory === "" || provider.category.includes(selectedCategory)) &&
      (selectedLocation === "" || provider.location === selectedLocation) &&
      (selectedStatus === "" || provider.status === selectedStatus) &&
      (searchName === "" || provider.name.toLowerCase().includes(searchName.toLowerCase())) &&
      (selectedRating === "" || provider.rating >= parseFloat(selectedRating))
    );
  });

  const totalPages = Math.ceil(filteredProviders.length / itemsPerPage);
  const paginatedProviders = filteredProviders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  //modal
  const [selectedCaregiver, setSelectedCaregiver] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (caregiver) => {
    setSelectedCaregiver(caregiver);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCaregiver(null);
    setIsModalOpen(false);
  };

  return (



    <div className="overflow-x-auto p-6 bg-gray-50 rounded-lg shadow-md mt-2">

<div className="round-lg flex  justify-evenly font-semibold p-4 mb-2">

<h1 className="text-primary-blue text-2xl text-center">CareGivers Table</h1>

</div>

      <div className="flex flex-wrap gap-4 mb-4 items-center w-full justify-evenly">

      <div>
        <input
          type="text"
          className="border p-2 rounded-lg w-full "
          placeholder="Search by Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        </div>  
        <div>
        <select className="border p-2 rounded-lg w-full" onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
          <option value="">All Categories</option>
          {Array.from(new Set(careProviders.flatMap((p) => p.category))).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        </div>
       
<div>
<select className="border p-2 rounded-lg" onChange={(e) => setSelectedLocation(e.target.value)} value={selectedLocation}>
          <option value="">All Locations</option>
          {Array.from(new Set(careProviders.map((p) => p.location))).map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
</div>
        

<div>
<select className="border p-2 rounded-lg w-full" onChange={(e) => setSelectedRating(e.target.value)} value={selectedRating}>
          <option value="">All Ratings</option>
          <option value="4.5">4.5 & Above</option>
          <option value="4.0">4.0 & Above</option>
          <option value="3.5">3.5 & Above</option>
          <option value="3.0">3.0 & Above</option>
        </select>
</div>
        
       
    <div>
        <button className="border px-2 py-2 rounded-lg bg-primary-blue text-white   " onClick={() => {
          setSelectedCategory("");
          setSelectedLocation("");
          setSelectedStatus("");
          setSearchName("");
          setSelectedRating("");
        }}>Clear Filters</button> 
        </div>
       
      </div>

      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="p-3 border-b">Name</th>
            <th className="p-3 border-b">Experience</th>
            <th className="p-3 border-b">Category</th>
            <th className="p-3 border-b">Location</th>
            <th className="p-3 border-b">Rating</th>
            <th className="p-3 border-b">Reviews</th>
            <th className="p-3 border-b">Forms</th>
            <th className="p-3 border-b">Status</th>
            
          </tr>
        </thead>
        <tbody>
          {paginatedProviders.map((provider) => (
            <tr key={provider.id} className="border-b hover:bg-gray-50">
              <td className="p-3 flex items-center space-x-3">
                <img src={provider.image} alt={provider.name} className="w-10 h-10 rounded-full" />
                <span>{provider.name}</span>
              </td>
              <td className="p-3">{provider.experience} yrs</td>
              <td className="p-3">{provider.category.join(", ")}</td>
              <td className="p-3">{provider.location}</td>
              <td className="p-3">{provider.rating}</td>
              <td className="p-3">{provider.reviews}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => openModal(provider)}
                  className="bg-primary-blue text-white px-3 py-1 rounded"
                >
                  View Form
                </button>
              </td>
              
              <td className={`p-3 font-bold ${provider.status === "Available" ? "text-green-500" : provider.status === "Busy" ? "text-yellow-500" : "text-red-500"}`}>{provider.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button 
          className={`px-4 py-2 text-white border rounded-lg ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "bg-primary-blue"}`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          className={`px-4 py-2 border text-white rounded-lg ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "bg-primary-blue"}`}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >Next</button>
      </div>


      {isModalOpen && selectedCaregiver && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
          {/* Modal Header */}
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Caregiver Details</h2>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              ✕
            </button>
          </div>
      
          {/* Modal Content */}
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Name</p>
                <p className="font-medium text-gray-900">{selectedCaregiver.name}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="font-medium text-gray-900">{selectedCaregiver.email}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Phone</p>
                <p className="font-medium text-gray-900">{selectedCaregiver.phone}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Applied On</p>
                <p className="font-medium text-gray-900">{selectedCaregiver.appliedOn}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600 text-sm">Category</p>
                <p className="font-medium text-gray-900">{selectedCaregiver.category}</p>
              </div>
            </div>
      
            {/* Form Data Section */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Form Data</p>
              <p className="text-gray-900 font-medium">{selectedCaregiver.form}</p>
            </div>
          </div>
      
          {/* Modal Footer */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-primary-blue hover:bg-blue-300 text-white font-medium rounded-lg transition"
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

export default CaregiverTable;
