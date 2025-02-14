import React from 'react';
import { HeartPulse } from 'lucide-react';

const VitalsMonitoring = ({ patient }) => {
  const { vitalSigns } = patient;
  
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <HeartPulse className="mr-2 text-blue-500" /> Vital Signs
      </h3>
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Heart Rate",
            value: `${vitalSigns.heartRate.value} ${vitalSigns.heartRate.unit}`,
            trend: vitalSigns.heartRate.trend
          },
          {
            label: "Blood Pressure",
            value: `${vitalSigns.bloodPressure.systolic}/${vitalSigns.bloodPressure.diastolic}`,
            trend: vitalSigns.bloodPressure.trend
          },
          {
            label: "O2 Saturation",
            value: `${vitalSigns.oxygenSaturation.value} ${vitalSigns.oxygenSaturation.unit}`,
            trend: vitalSigns.oxygenSaturation.trend
          }
        ].map(vital => (
          <div key={vital.label} className="text-center">
            <div className="font-bold">{vital.label}</div>
            <div className="text-xl">{vital.value}</div>
            <div className={`text-sm ${
              vital.trend === "improving" ? "text-green-500" : 
              vital.trend === "declining" ? "text-red-500" : "text-gray-500"
            }`}>
              {vital.trend}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VitalsMonitoring;