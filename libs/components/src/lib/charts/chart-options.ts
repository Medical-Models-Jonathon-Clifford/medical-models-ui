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

export const createBarOptions = (chartTitle: string) => {
  return {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: chartTitle,
      },
    },
  };
};
