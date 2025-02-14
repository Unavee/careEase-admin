import React, { useState } from "react";

const AdditionalVitals = () => {
  const [vitals, setVitals] = useState({
    oxygenSaturation: "",
    respiratoryRate: "",
    temperature: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVitals({ ...vitals, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Vitals:", vitals);
    // Add logic to save vitals to the backend or state
  };

  return (
    <div>
      <h2>Additional Vital Signs</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Oxygen Saturation:
          <input
            type="number"
            name="oxygenSaturation"
            value={vitals.oxygenSaturation}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Respiratory Rate:
          <input
            type="number"
            name="respiratoryRate"
            value={vitals.respiratoryRate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Temperature:
          <input
            type="number"
            name="temperature"
            value={vitals.temperature}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdditionalVitals;