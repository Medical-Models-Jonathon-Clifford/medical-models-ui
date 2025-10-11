'use client';

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  type ChartData,
  type ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export type DatePoint = {
  x: string;
  y: number;
};

/**
 * Wrapper around the react-chartjs-2 Line component to it can render on the client.
 */
export function LineChart({
  options,
  data,
}: {
  options: ChartOptions<'line'>;
  data: ChartData<'line', DatePoint[]>;
}) {
  return <Line options={options} data={data} />;
}
