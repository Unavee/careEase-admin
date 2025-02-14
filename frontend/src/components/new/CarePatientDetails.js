import React from "react";
import { Link } from "react-router-dom"; 
const CarePatientDetails = () => {
  const patients = [
    { id: 1, name: "John Doe", age: 45, category: "General" },
    { id: 2, name: "Jane Smith", age: 38, category: "Pediatrics" },
    { id: 3, name: "Michael Brown", age: 50, category: "Cardiology" },
  ];

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Patient Details</h2>
      <div className="overflow-auto">
        <table className="w-full min-w-[600px] border border-gray-200">
          <thead>
            <tr className="bg-primary-blue text-white">
              <th className="p-4">ID</th>
              <th className="p-4">Patient Name</th>
              <th className="p-4">Age</th>
              <th className="p-4">Category</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-b border-gray-200 text-center">
                <td className="p-4 text-gray-800 font-semibold">{patient.id}</td>
                <td className="p-4 text-gray-800 font-semibold">{patient.name}</td>
                <td className="p-4 text-gray-800 font-semibold">{patient.age}</td>
                <td className="p-4 text-gray-800 font-semibold">{patient.category}</td>
                <td className="p-4">
                  <div className="flex gap-2 justify-center">
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700 bg-transparent hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      View
                    </button>
                    <Link
                to="/caredashboard/addvitals"
                className="px-4 py-2 border border-transparent rounded-md text-sm font-semibold text-white bg-primary-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Add Vitals
              </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarePatientDetails;
