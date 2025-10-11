'use client';

import { Bar } from 'react-chartjs-2';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from 'chart.js';

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

/**
 * Wrapper around the react-chartjs-2 Bar component to it can render on the client.
 */
export function BarChart({
  options,
  data,
}: {
  options: ChartOptions<'bar'>;
  data: ChartData<'bar'>;
}) {
  return <Bar options={options} data={data} />;
}
