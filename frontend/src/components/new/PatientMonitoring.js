import React from 'react';
import { 
  Activity, 
  TrendingUp, 
  AlertCircle, 
  BarChart2 
} from 'lucide-react';

const PatientMonitoring = ({ patient }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Activity className="mr-2 text-green-500" /> Recovery Monitoring
      </h3>
      <div className="grid grid-cols-3 gap-4 text-center">
        {[
          {
            label: "Recovery Progress",
            value: `${patient.monitoringData.recoveryProgress}%`,
            icon: <TrendingUp className="mx-auto text-blue-500" />
          },
          {
            label: "Pain Level",
            value: patient.monitoringData.painLevel + "/10",
            icon: <AlertCircle className="mx-auto text-red-500" />
          },
          {
            label: "Mobility Score",
            value: patient.monitoringData.mobilityScore + "/5",
            icon: <BarChart2 className="mx-auto text-green-500" />
          }
        ].map(metric => (
          <div key={metric.label}>
            {metric.icon}
            <div className="font-bold mt-2">{metric.label}</div>
            <div className="text-xl">{metric.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientMonitoring;