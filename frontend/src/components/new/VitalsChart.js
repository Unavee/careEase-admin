import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const VitalsChart = ({ data }) => {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="timestamp" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="heartRate" stroke="#8884d8" />
      <Line type="monotone" dataKey="bloodPressure" stroke="#82ca9d" />
    </LineChart>
  );
};

export default VitalsChart;