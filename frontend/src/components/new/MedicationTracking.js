import React from 'react';
import { Pill } from 'lucide-react';

const MedicationTracking = ({ patient }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Pill className="mr-2 text-purple-500" /> Medication Schedule
      </h3>
      <div className="space-y-2">
        {patient.medications.map(med => (
          <div 
            key={med.name} 
            className="flex justify-between items-center p-2 border-b"
          >
            <div>
              <div className="font-semibold">{med.name}</div>
              <div className="text-sm text-gray-600">{med.dosage}</div>
            </div>
            <div className="text-sm text-gray-500">{med.frequency}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicationTracking;