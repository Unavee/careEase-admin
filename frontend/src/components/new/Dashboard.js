import React, { useState } from 'react';
import Sidebar from './Sidebar';
// import VitalsMonitoring from './VitalsMonitoring';
// import MedicationTracking from './MedicationTracking';
// import PatientMonitoring from './PatientMonitoring';
import { patientData } from './patientData';
import AppointmentDashboard from './AppointmentDashboard';
import { Route, Routes } from "react-router-dom";
import CarePatientDetails from './CarePatientDetails';
import PatientVitalsForm from './PatientVitalsForm';
import CaretakerProfile from './CaretakerProfile';

const Dashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState(patientData[0]);

  return (
    <div className="flex h-screen bg-gray-100 mt-24">
      <Sidebar />
      <div className="p-6 flex-1 overflow-y-auto">
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <VitalsMonitoring patient={selectedPatient} />
          <MedicationTracking patient={selectedPatient} />
          <PatientMonitoring patient={selectedPatient} />
        </div> */}
        <Routes>
          <Route path="/" element={<AppointmentDashboard />} /> 
          <Route path="/patients" element={<CarePatientDetails/>} /> 
          <Route path="/addvitals" element={<PatientVitalsForm/>} /> 
          <Route path="/careProfile" element={<CaretakerProfile/>} /> 

        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;