/* eslint-disable import/no-extraneous-dependencies */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chart.js/auto';
import {
  Bar, Line,
} from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { useState } from 'react';

const labels = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'octobre', 'Novembre', 'Décembre'];
export const data = {
  labels,
  datasets: [
    {
      label: 'AWS',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 30000 })),
      backgroundColor: 'rgba(255, 99, 132, 1)',
      borderColor: 'rgba(255, 99, 132, 1)',
    },
    {
      label: 'Google cloud',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 30000 })),
      backgroundColor: 'rgba(53, 162, 235, 1)',
      borderColor: 'rgba(53, 162, 235, 1)',
    },
    {
      label: 'Azure',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 30000 })),
      backgroundColor: 'rgba(0, 0, 0, 1)',
      borderColor: 'rgba(0, 0, 0, 1)',
    },
  ],
};
const chartType = ['BARRES', 'LIGNES'];
//
//
//
function ChartContainer() {
  const [chartTypeToDisplay, setchartTypeToDisplay] = useState('BARRES');
  ChartJS.defaults.color = '#fff';
  ChartJS.defaults.font.family = 'Montserrat';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Consommation Annuelle',
      },
    },
  };
  const chartRender = () => {
    switch (chartTypeToDisplay) {
      case 'LIGNES':
        return <Line options={options} data={data} />;
      case 'BARRES':
        return <Bar options={options} data={data} />;
      default:
        return <Bar options={options} data={data} />;
    }
  };
  return (
    <div
      className="chartContainer"
    >
      <ul>
        {chartType.map((item) => (
          <li
            key={item}
            onClick={() => (setchartTypeToDisplay(item))}
            style={{
              color: chartTypeToDisplay === item ? '#fff' : 'rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              padding: '10px',
            }}
          >
            {item}
          </li>
        ))}
      </ul>
      {chartRender()}
    </div>

  );
}

export default ChartContainer;
