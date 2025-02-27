import { useState } from "react";

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

const pendingcaregivers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@gmail.com",
    phone: "98765-43210",
    appliedOn: "2025-02-10",
    verified: false,
    category: "Elderly Care",
    formData: "",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@gmail.com",
    phone: "98234-56789",
    appliedOn: "2025-02-12",
    verified: false,
    category: "Mother Care",
    formData: "",
  },
  {
    id: 3,
    name: "Amit Verma",
    email: "amit.verma@gmail.com",
    phone: "98987-65432",
    appliedOn: "2025-02-15",
    verified: false,
    category: "Child Care",
    formData: "",
  },
  {
    id: 4,
    name: "Sneha Iyer",
    email: "sneha.iyer@gmail.com",
    phone: "97654-32109",
    appliedOn: "2025-02-18",
    verified: false,
    category: "Post-Accident Care",
    formData: "",
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram.singh@gmail.com",
    phone: "99456-78901",
    appliedOn: "2025-02-20",
    verified: false,
    category: "Physiotherapy",
    formData: "",
  },
  {
    id: 6,
    name: "Anjali Nair",
    email: "anjali.nair@gmail.com",
    phone: "98321-45678",
    appliedOn: "2025-02-21",
    verified: false,
    category: "Home Medical Services",
    formData: "",
  },
  {
    id: 7,
    name: "Rohan Das",
    email: "rohan.das@gmail.com",
    phone: "97890-12345",
    appliedOn: "2025-02-22",
    verified: false,
    category: "Special Needs Care",
    formData: "",
  },
  {
    id: 8,
    name: "Meera Reddy",
    email: "meera.reddy@gmail.com",
    phone: "99001-23456",
    appliedOn: "2025-02-23",
    verified: false,
    category: "Intensive Care at Home",
    formData: "",
  },
  {
    id: 9,
    name: "Arjun Menon",
    email: "arjun.menon@gmail.com",
    phone: "97543-21098",
    appliedOn: "2025-02-24",
    verified: false,
    category: "Elderly Care",
    formData: "",
  },
  {
    id: 10,
    name: "Divya Patel",
    email: "divya.patel@gmail.com",
    phone: "98876-54321",
    appliedOn: "2025-02-25",
    verified: false,
    category: "Mother Care",
    formData: "",
  },
];

export default function PendingCaregivers() {
  const [pending, setPending] = useState(pendingcaregivers);
  const [approved, setApproved] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const approveCaregiver = (id) => {
    const caregiver = pending.find((c) => c.id === id);
    setApproved([...approved, { ...caregiver, verified: true }]);
    setPending(pending.filter((c) => c.id !== id));
  };

  const rejectCaregiver = (id) => {
    setPending(pending.filter((c) => c.id !== id));
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedDate("");
    setCurrentPage(1);
  };

  const filteredCaregivers = pending.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedDate === "" || c.appliedOn === selectedDate) &&
      (selectedCategory === "" || c.category === selectedCategory)
  );

  const totalPages = Math.ceil(filteredCaregivers.length / itemsPerPage);
  const displayedCaregivers = filteredCaregivers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


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
    <div className="p-6 bg-gray-50 mt-2 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 flex justify-evenly text-primary-blue">
        Pending Caregiver Approvals
      </h2>
      <div className="mb-4 flex space-x-4 justify-evenly">
        <input
          type="text"
          placeholder="Search by name"
          className="p-2 border rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border rounded-md"
        />
        <button
          onClick={resetFilters}
          className="p-2 bg-primary-blue text-white rounded"
        >
          Reset Filters
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-200 mb-6 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Applied On</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Form</th>
            <th className="border p-2">Actions </th>
          </tr>
        </thead>
        <tbody>
          {displayedCaregivers.map((c) => (
            <tr key={c.id} className="border">
              <td className="border p-2">{c.name}</td>
              <td className="border p-2">{c.email}</td>
              <td className="border p-2">{c.phone}</td>
              <td className="border p-2 text-center">{c.appliedOn}</td>
              <td className="border p-2 text-center">{c.category}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => openModal(c)}
                  className="bg-primary-blue text-white px-3 py-1 rounded"
                >
                  View Form
                </button>
              </td>
              
              <td className="border p-2 text-center">
                <button
                  onClick={() => approveCaregiver(c.id)}
                  className="bg-teal-500 text-white px-3 py-1 rounded mr-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => rejectCaregiver(c.id)}
                  className="bg-pink-500 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-xl font-bold mb-4 text-primary-blue flex justify-evenly">
        Approved Caregivers
      </h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Applied On</th>
            <th className="border p-2">Category</th>
            
          </tr>
        </thead>
        <tbody>
          {approved.map((c) => (
            <tr key={c.id} className="border">
              <td className="border p-2">{c.name}</td>
              <td className="border p-2">{c.email}</td>
              <td className="border p-2">{c.phone}</td>
              <td className="border p-2 text-center">{c.appliedOn}</td>
              <td className="border p-2 text-center">{c.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          className={`px-4 py-2 text-white border rounded-lg ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "bg-primary-blue"
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 border text-white rounded-lg ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "bg-primary-blue"
          }`}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>



            {/* Modal */}
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
}
