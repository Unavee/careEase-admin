import React, { useState, useEffect } from 'react';
import { Heart, Thermometer, Droplet, Activity, History} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const PatientVitalsForm = () => {
  const [formData, setFormData] = useState({
    heartRate: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    oxygenSaturation: '',
    bloodSugar: '',
    temperature: '',
    respiratoryRate: '',
    weight: '',
    height: '',
    notes: ''
  });

  const [vitalsHistory, setVitalsHistory] = useState([]);
  const [viewMode, setViewMode] = useState('form'); // 'form' | 'chart' | 'history'
  const [saveStatus, setSaveStatus] = useState({ type: '', message: '' });

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('vitalsHistory');
    if (savedHistory) {
      setVitalsHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const timestamp = new Date().toLocaleString();
      const newEntry = { ...formData, timestamp };
      
      // Update history
      const updatedHistory = [newEntry, ...vitalsHistory];
      setVitalsHistory(updatedHistory);
      localStorage.setItem('vitalsHistory', JSON.stringify(updatedHistory));

      setSaveStatus({ type: 'success', message: 'Vitals updated successfully!' });
      setTimeout(() => setSaveStatus({ type: '', message: '' }), 3000);
      
      // Clear form
      setFormData({
        heartRate: '',
        bloodPressureSystolic: '',
        bloodPressureDiastolic: '',
        oxygenSaturation: '',
        bloodSugar: '',
        temperature: '',
        respiratoryRate: '',
        weight: '',
        height: '',
        notes: ''
      });

    } catch (error) {
      setSaveStatus({ type: 'error', message: 'Failed to update vitals. Please try again.' });
    }
  };

  const renderChart = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <LineChart className="w-5 h-5 text-blue-500" /> {/* Using Recharts component */}
      Vital Signs Trends
    </h2>
      <LineChart 
      width={800} 
      height={400} 
      data={vitalsHistory}
      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
      <XAxis 
        dataKey="timestamp" 
        tick={{ fontSize: 12 }}
        angle={-45}
        textAnchor="end"
      />
      <YAxis />
      <Tooltip 
        contentStyle={{
          backgroundColor: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '6px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      />
      <Legend 
        wrapperStyle={{
          paddingTop: '20px'
        }}
      />
      <Line 
        type="monotone" 
        dataKey="heartRate" 
        stroke="#ff7300" 
        strokeWidth={2}
        name="Heart Rate (bpm)"
        dot={{ r: 4 }}
      />
      <Line 
        type="monotone" 
        dataKey="bloodPressureSystolic" 
        stroke="#82ca9d" 
        strokeWidth={2}
        name="Systolic BP"
        dot={{ r: 4 }}
      />
      <Line 
        type="monotone" 
        dataKey="bloodPressureDiastolic" 
        stroke="#8884d8" 
        strokeWidth={2}
        name="Diastolic BP"
        dot={{ r: 4 }}
      />
      <Line 
        type="monotone" 
        dataKey="oxygenSaturation" 
        stroke="#ff0000" 
        strokeWidth={2}
        name="O2 Saturation (%)"
        dot={{ r: 4 }}
      />
    </LineChart>
    </div>
  );

  const renderHistory = () => (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <History className="w-5 h-5" />
        Vitals History
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left">Date/Time</th>
              <th className="px-4 py-2 text-left">Heart Rate</th>
              <th className="px-4 py-2 text-left">Blood Pressure</th>
              <th className="px-4 py-2 text-left">O2 Sat</th>
              <th className="px-4 py-2 text-left">Temp (°F)</th>
              <th className="px-4 py-2 text-left">Resp Rate</th>
            </tr>
          </thead>
          <tbody>
            {vitalsHistory.map((entry, index) => (
              <tr key={index} className="border-t border-gray-100">
                <td className="px-4 py-2">{entry.timestamp}</td>
                <td className="px-4 py-2">{entry.heartRate}</td>
                <td className="px-4 py-2">{entry.bloodPressureSystolic}/{entry.bloodPressureDiastolic}</td>
                <td className="px-4 py-2">{entry.oxygenSaturation}%</td>
                <td className="px-4 py-2">{entry.temperature}</td>
                <td className="px-4 py-2">{entry.respiratoryRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Activity className="h-6 w-6 text-blue-500" />
              Patient Vitals Monitoring
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => setViewMode('form')}
                className={`px-4 py-2 rounded ${viewMode === 'form' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
              >
                Data Entry
              </button>
              <button
                onClick={() => setViewMode('chart')}
                className={`px-4 py-2 rounded ${viewMode === 'chart' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
              >
                Trends
              </button>
              <button
                onClick={() => setViewMode('history')}
                className={`px-4 py-2 rounded ${viewMode === 'history' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
              >
                History
              </button>
            </div>
          </div>

          {viewMode === 'form' && (
            <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
  {/* Primary Vitals Section */}
  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
    <h2 className="text-xl font-semibold text-gray-700 mb-4">Core Vital Signs</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Heart Rate */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Heart className="h-4 w-4 text-red-500" />
          Heart Rate (bpm)
        </label>
        <input
          type="number"
          name="heartRate"
          value={formData.heartRate}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-300 outline-none"
          min="30"
          max="200"
          required
        />
      </div>

      {/* Blood Pressure */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Activity className="h-4 w-4 text-blue-500" />
          Blood Pressure (mmHg)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            name="bloodPressureSystolic"
            value={formData.bloodPressureSystolic}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-300 outline-none"
            placeholder="Systolic"
            min="50"
            max="250"
            required
          />
          <span className="text-gray-500 self-center">/</span>
          <input
            type="number"
            name="bloodPressureDiastolic"
            value={formData.bloodPressureDiastolic}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-300 outline-none"
            placeholder="Diastolic"
            min="30"
            max="150"
            required
          />
        </div>
      </div>

      {/* Oxygen Saturation */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Droplet className="h-4 w-4 text-blue-500" />
          SpO₂ (%)
        </label>
        <input
          type="number"
          name="oxygenSaturation"
          value={formData.oxygenSaturation}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-300 outline-none"
          min="70"
          max="100"
          step="0.1"
          required
        />
      </div>

      {/* Temperature */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Thermometer className="h-4 w-4 text-red-500" />
          Temp (°F)
        </label>
        <input
          type="number"
          name="temperature"
          value={formData.temperature}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-300 outline-none"
          min="95"
          max="105"
          step="0.1"
          required
        />
      </div>

      {/* Respiratory Rate */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Activity className="h-4 w-4 text-green-500" />
          Respiratory Rate
        </label>
        <input
          type="number"
          name="respiratoryRate"
          value={formData.respiratoryRate}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-300 outline-none"
          min="8"
          max="40"
          required
        />
      </div>

      {/* Blood Glucose */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Droplet className="h-4 w-4 text-red-500" />
          Blood Glucose (mg/dL)
        </label>
        <input
          type="number"
          name="bloodSugar"
          value={formData.bloodSugar}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-300 outline-none"
          min="50"
          max="400"
          required
        />
      </div>
    </div>
  </div>

  {/* Anthropometric Data */}
  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
    <h2 className="text-xl font-semibold text-gray-700">Body Measurements</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Weight (kg)</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-300 outline-none"
          min="20"
          max="200"
          step="0.1"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Height (cm)</label>
        <input
          type="number"
          name="height"
          value={formData.height}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-300 outline-none"
          min="100"
          max="250"
          required
        />
      </div>
    </div>
  </div>

  {/* Clinical Notes */}
  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
    <h2 className="text-xl font-semibold text-gray-700">Clinical Notes</h2>
    <textarea
      name="notes"
      value={formData.notes}
      onChange={handleInputChange}
      rows={4}
      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-300 outline-none"
      placeholder="Enter assessment notes, observations, or comments..."
      maxLength="500"
    />
    <p className="text-sm text-gray-500 text-right">{500 - formData.notes.length} characters remaining</p>
  </div>

  {/* Submission Feedback */}
  {saveStatus.message && (
    <div className={`p-4 rounded-md ${
      saveStatus.type === 'success' 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800'
    }`}>
      {saveStatus.message}
    </div>
  )}

  {/* Form Actions */}
  <div className="flex gap-4 justify-end">
    <button
      type="button"
      onClick={() => setFormData({
        heartRate: '',
        bloodPressureSystolic: '',
        bloodPressureDiastolic: '',
        oxygenSaturation: '',
        bloodSugar: '',
        temperature: '',
        respiratoryRate: '',
        weight: '',
        height: '',
        notes: ''
      })}
      className="px-6 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
    >
      Clear Form
    </button>
    <button
      type="submit"
      className="px-6 py-2 bg-primary-blue text-white rounded-md hover:bg-primary-green transition-colors"
    >
      Save Vitals Record
    </button>
  </div>
</form>
            </div>
          )}

          {viewMode === 'chart' && renderChart()}
          {viewMode === 'history' && renderHistory()}
        </div>
      </div>
    </div>
  );
};

export default PatientVitalsForm;