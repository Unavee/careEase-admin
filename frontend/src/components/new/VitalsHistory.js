import React from "react";

const VitalsHistory = ({ history }) => {
  return (
    <div>
      <h2>Vitals History</h2>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Heart Rate</th>
            <th>Blood Pressure</th>
            <th>Oxygen Saturation</th>
            <th>Respiratory Rate</th>
            <th>Temperature</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, index) => (
            <tr key={index}>
              <td>{entry.timestamp}</td>
              <td>{entry.heartRate}</td>
              <td>{entry.bloodPressure}</td>
              <td>{entry.oxygenSaturation}</td>
              <td>{entry.respiratoryRate}</td>
              <td>{entry.temperature}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VitalsHistory;