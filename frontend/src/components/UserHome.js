import React, { useState, useEffect } from "react";
import { FaUsers, FaRegListAlt, FaClock, FaMapMarkerAlt, FaEdit, FaTrash, FaEye, FaSearch } from "react-icons/fa";
import { getDatabase, ref, get, push, update, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const categories = [
  "Elderly Care", "Mother Care", "Child Care", "Post-Accident Care",
  "Physiotherapy", "Home Medical Services", "Special Needs Care", "Intensive Care at Home"
];

const UserHome = ({ patientDetails, category }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [patients, setPatients] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newPatient, setNewPatient] = useState({
    name: "", age: "", gender: "", email: "", number: "", category: "",
    state: "", district: "", city: "", pincode: "", street: "", address: "", patientImage: null
  });
  const navigate = useNavigate();

  const handleFindCaregiver = (patient) => {
    const patientData = {
      name: patient.name,
      category: patient.category,
      email: patient.email, // Include more patient details as needed
      number: patient.number,
      address: patient.address,
    };
    // Now passing category along with patient data to the next page
    navigate('/userdashboard/findcare', { state: { patient: patientData, category } });
  };
  
  
  

  useEffect(() => {
    const fetchUser = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const storedEmail = localStorage.getItem("userEmail");
        if (storedEmail === user.email) {
          const db = getDatabase();
          const usersRef = ref(db, "users");
          const snapshot = await get(usersRef);
          if (snapshot.exists()) {
            snapshot.forEach((userSnapshot) => {
              const userData = userSnapshot.val();
              if (userData.email === storedEmail) {
                setFirstName(userData.firstName || "");
                setLastName(userData.lastName || "");
              }
            });
          }
        }
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchPatients = async () => {
      const userId = localStorage.getItem("userId");
      const db = getDatabase();
      const patientsRef = ref(db, `patients/${userId}`);
      const snapshot = await get(patientsRef);
      if (snapshot.exists()) {
        const patientList = [];
        snapshot.forEach((childSnapshot) => {
          patientList.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
        setPatients(patientList);
      }
    };
    fetchPatients();
  }, []);

  const handleInputChange = (e) => {
    setNewPatient({ ...newPatient, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewPatient({ ...newPatient, patientImage: file });
  };

  const handleAddOrUpdatePatient = async (e) => {
    e.preventDefault();
  
    const isFormValid = Object.keys(newPatient).every((key) => {
      if (key === "patientImage") return true; // Skip validation for image
      return typeof newPatient[key] === "string" ? newPatient[key].trim() !== "" : newPatient[key] !== null;
    });
  
    if (!isFormValid) {
      alert("All fields are required!");
      return;
    }
  
    const db = getDatabase();
    const userId = localStorage.getItem("userId");
    
    if (editingIndex !== null) {
      await update(ref(db, `patients/${userId}/${patients[editingIndex].id}`), newPatient);
      const updatedPatients = [...patients];
      updatedPatients[editingIndex] = { id: patients[editingIndex].id, ...newPatient };
      setPatients(updatedPatients);
    } else {
      const newPatientRef = push(ref(db, `patients/${userId}`), newPatient);
      setPatients([...patients, { id: newPatientRef.key, ...newPatient }]);
    }
    setShowPopup(false);
    setEditingIndex(null);
    setNewPatient({
      name: "", age: "", gender: "", email: "", number: "", category: "",
      state: "", district: "", city: "", pincode: "", street: "", address: "", patientImage: null
    });
  };
  

  const handleEdit = (index) => {
    setNewPatient(patients[index]);
    setEditingIndex(index);
    setShowPopup(true);
  };

  const handleDelete = async (id) => {
    const userId = localStorage.getItem("userId");
    const db = getDatabase();
    await remove(ref(db, `patients/${userId}/${id}`));
    setPatients(patients.filter(patient => patient.id !== id));
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-lg w-full">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, <span className=" text-primary-blue">{firstName || "Guest"} {lastName || ""}! </span></h1>
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[{ icon: FaUsers, title: "Total Services", value: "5 completed", color: "blue" },
          { icon: FaRegListAlt, title: "Active Orders", value: "2 in progress", color: "green" },
          { icon: FaClock, title: "Avg Response Time", value: "15 minutes", color: "yellow" },
          { icon: FaMapMarkerAlt, title: "Caregiver Near You", value: "3 available", color: "red" }
        ].map(({ icon: Icon, title, value, color }, index) => (
          <div key={index} className="bg-white p-4 shadow-md rounded-lg flex items-center">
            <Icon className={`text-4xl text-${color}-500 mr-4`} />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
              <p className="text-sm text-gray-600">{value}</p>
            </div>
          </div>
        ))}
      </div>



   {/* Patient List Table */}
<div className="bg-white p-6 rounded-lg shadow-lg mt-6">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-bold text-gray-800">Patient Details</h2>
    <button className="bg-primary-blue text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition" onClick={() => setShowPopup(true)}>
      <FaUsers /> <span>Add New Patient</span>
    </button>
  </div>
  <div className="overflow-x-auto"> {/* Added this wrapper for horizontal scrolling */}
    <table className="w-full border-collapse gap-4 border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2 w-1/12">SNO</th> {/* Fixed width for first column */}
          <th className="border p-2 w-1/4">Name</th> {/* Fixed width for second column */}
          <th className="border p-2 w-1/4">Category</th> {/* Fixed width for third column */}
          <th className="border p-2 w-full">Actions</th> {/* Remaining space for the 4th column */}
        </tr>
      </thead>
      <tbody>
        {patients.map((patient, index) => (
          <tr key={index} className="border">
            <td className="border p-2">{index + 1}</td>
            <td className="border p-2">{patient.name}</td>
            <td className="border p-2">{patient.category}</td>
            <td className="border p-2 space-x-3">
              <div className="flex flex-wrap gap-2">
                <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition" onClick={() => handleEdit(index)}>
                  <FaEdit className="mr-2" /> Edit
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition" onClick={() => handleDelete(patient.id)}>
                  <FaTrash className="mr-2" /> Delete
                </button>
                <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition">
                  <FaEye className="mr-2" /> View
                </button>
                <button className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600 transition" onClick={handleFindCaregiver}>
                  <FaSearch className="mr-2" /> Find Caregiver
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


      {/* Popup Form for Adding/Editing Patient */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center md:mt-24">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow-xl rounded-lg p-6 w-full max-w-3xl max-h-[80vh] overflow-auto space-y-6" // Reduce padding and limit max height
          >
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
              {editingIndex !== null ? "Edit Patient" : "Add New Patient"}
            </h2>
            <form onSubmit={handleAddOrUpdatePatient} className="space-y-8">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Full Name"
                    className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-green-300"
                    onChange={handleInputChange}
                    value={newPatient.name}
                    required
                  />
                </div>
          <div>
            <label htmlFor="age" className="block text-gray-700 font-medium">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Enter Age"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-green-300"
              onChange={handleInputChange}
              value={newPatient.age}
              required
            />
          </div>
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-green-300"
              onChange={handleInputChange}
              value={newPatient.email}
              required
            />
          </div>
          <div>
            <label htmlFor="number" className="block text-gray-700 font-medium">Phone Number</label>
            <input
              type="tel"
              id="number"
              name="number"
              placeholder="Enter Phone Number"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-green-300"
              onChange={handleInputChange}
              value={newPatient.number}
              required
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-gray-700 font-medium">Address</label>
          <textarea
            id="address"
            name="address"
            placeholder="Enter Full Address"
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-green-300"
            rows="3"
            onChange={handleInputChange}
            value={newPatient.address}
            required
          ></textarea>
        </div>

        {/* Select Gender and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="gender" className="block text-gray-700 font-medium">Gender</label>
            <select
              id="gender"
              name="gender"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-green-300"
              onChange={handleInputChange}
              value={newPatient.gender}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="category" className="block text-gray-700 font-medium">Category</label>
            <select
              id="category"
              name="category"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-green-300"
              onChange={handleInputChange}
              value={newPatient.category}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        {/* Address Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="street" className="block text-gray-700 font-medium">Street</label>
            <input
              type="text"
              id="street"
              name="street"
              placeholder="Enter Street"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-green-300"
              onChange={handleInputChange}
              value={newPatient.street}
              required
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-gray-700 font-medium">City</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Enter City"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-green-300"
              onChange={handleInputChange}
              value={newPatient.city}
              required
            />
          </div>
          <div>
            <label htmlFor="district" className="block text-gray-700 font-medium">District</label>
            <input
              type="text"
              id="district"
              name="district"
              placeholder="Enter District"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-green-300"
              onChange={handleInputChange}
              value={newPatient.district}
              required
            />
          </div>
        </div>

        {/* Pincode and State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="pincode" className="block text-gray-700 font-medium">Pincode</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              placeholder="Enter Pincode"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-green-300"
              onChange={handleInputChange}
              value={newPatient.pincode}
              required
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-gray-700 font-medium">State</label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="Enter State"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-green-300"
              onChange={handleInputChange}
              value={newPatient.state}
              required
            />
          </div>
           {/* Image Upload */}
           <div>
                <label htmlFor="patientImage" className="block text-gray-700 font-medium">Upload Patient Image</label>
                <input
                  type="file"
                  name="patientImage"
                  className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:ring-2 focus:ring-green-300"
                  onChange={handleImageChange}
                />
              </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            className="bg-gray-500 text-white px-6 py-2 rounded"
            onClick={() => setShowPopup(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </motion.div>
  </div>
)}

    </div>
  );
};

export default UserHome;
