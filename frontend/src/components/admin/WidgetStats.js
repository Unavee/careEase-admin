import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FaInfoCircle } from 'react-icons/fa';
import { Tooltip as ReactTooltip } from "react-tooltip";
import  TrafficSale from "./Traffic";

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);

const generateChartData = () => {
  const labels = Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`);
  return {
    labels,
    datasets: [
      {
        label: "Performance",
        data: labels.map(() => Math.floor(Math.random() * 1000) + 100),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
      },
    ],
  };
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { display: false },
    y: { display: false }
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      mode: "index",
      intersect: false,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      titleFont: { size: 12 },
      bodyFont: { size: 14 },
      padding: 10,
      borderWidth: 1,
      borderColor: "#fff",
      cornerRadius: 4,
      displayColors: false,
      callbacks: {
        label: function (tooltipItem) {
          return `Value: ${tooltipItem.raw}`;
        }
      }
    }
  }
};

const Widget = ({ title, value, changePercentage }) => {
  const isPositive = changePercentage.includes('↑');
  

  return (
    <div className="p-5 bg-gradient-to-br from-blue-100/60 to-teal-200/40
 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-blue-800 text-sm flex items-center gap-1">
            {title}
            <FaInfoCircle
              data-tooltip-id={`tooltip-${title}`}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            />
            <ReactTooltip id={`tooltip-${title}`} place="top" content={`This is the ${title} metric.`} />
          </p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <span className={`text-sm font-medium flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {changePercentage}
        </span>
      </div>
      <div className="h-24">
        <Line data={generateChartData()} options={chartOptions} />
      </div>
    </div>
  );
};

export default function WidgetStats() {
  const widgetData = [
    { title: "CareGiver", value: Math.floor(Math.random() * 10000) + 5000 },
    { title: "Patients", value: Math.floor(Math.random() * 20000) + 10000 },
    { title: "Hospitals", value: Math.floor(Math.random() * 500) + 100 },
    { title: "New Agency", value: Math.floor(Math.random() * 1000) + 200 }
  ];

  return (
    <div className="p-6 bg-gray-50 mt-2 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {widgetData.map((data, i) => {
          const randomChange = (Math.random() * 20).toFixed(1);
          const isIncrease = Math.random() > 0.5;
          const changePercentage = `${randomChange}% ${isIncrease ? '↑' : '↓'}`;

          return (
            <Widget
              key={i}
              title={data.title}
              value={`${data.value.toLocaleString()}`}
              changePercentage={changePercentage}
            />
          );
        })}
      </div>

      <TrafficSale/>
     
    </div>
  );
}
