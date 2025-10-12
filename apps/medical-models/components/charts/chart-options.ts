import { ChartOptions } from 'chart.js';

export const lineOptions: ChartOptions<'line'> = {
  scales: {
    y: {
      min: 0,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    point: {
      pointStyle: false,
    },
  },
  maintainAspectRatio: false,
};
