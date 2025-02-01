import { zipToPoint } from '../../../adapter/chart-adapters';

export function chartOptions(title: string) {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        type: 'logarithmic',
      },
    },
    elements: {
      point: {
        pointStyle: false,
      },
    },
    maintainAspectRatio: false,
  };
}

export function chartPermittivityData(
  frequencies: number[],
  epsilonReal: number[]
) {
  return {
    datasets: [
      {
        label: 'Permittivity',
        data: zipToPoint(frequencies, epsilonReal),
        borderColor: 'rgb(99,161,255)',
        backgroundColor: 'rgba(99,154,255,0.5)',
      },
    ],
  };
}

export function chartConductivityData(
  frequencies: number[],
  conductivity: number[]
) {
  return {
    datasets: [
      {
        label: 'Conductivity',
        data: zipToPoint(frequencies, conductivity),
        borderColor: 'rgb(99,161,255)',
        backgroundColor: 'rgba(99,154,255,0.5)',
      },
    ],
  };
}
