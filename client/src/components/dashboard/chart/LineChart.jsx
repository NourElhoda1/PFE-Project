import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  const data = {
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        label: 'Mobile Apps',
        data: [100, 200, 150, 220, 300, 250, 350],
        backgroundColor: 'rgba(16, 138, 0, 1)',
        borderColor: 'rgba(16, 138, 0, 1)',
        borderWidth: 1,
        fill: true,
      },
      {
        label: 'Websites',
        data: [90, 150, 100, 140, 200, 180, 300],
        backgroundColor: 'rgba(19, 84, 78, 1)',
        borderColor: 'rgba(19, 84, 78, 1)',
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
