import { Drug } from './drugs';
import { zipToPoint } from '../../../adapters/chart-adapters';

export function options(halfLife: number) {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Concentration Over Time'
      }
    },
    scales: {
      x: {
        type: 'linear',
        min: 0,
        max: halfLife * 5
      }
    },
    elements: {
      point: {
        pointStyle: false
      }
    }
  };
}

export function halfLifeData(timePoints: number[], concentrations: number[], drug: Drug, dose: number) {
  return {
    datasets: [
      {
        label: 'Concentration',
        data: zipToPoint(timePoints, concentrations),
        borderColor: 'rgb(99,161,255)',
        backgroundColor: 'rgba(99,154,255,0.5)'
      },
      {
        label: '50% Concentration',
        data: [
          { x: 0, y: dose / 2 },
          { x: drug.halfLife * 5, y: dose / 2 }
        ],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ]
  };
}
