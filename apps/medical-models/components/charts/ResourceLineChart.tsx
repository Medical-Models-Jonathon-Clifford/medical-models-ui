import {
  DailyResourceCount,
  TotalResourceMetrics,
} from '../../types/dashboard';
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { borderColourChart, colorBackgroundChart } from '../../variables';
import { Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { TotalCount } from './TotalCount';
import { ChartPaper } from './ChartPaper';
import { lineOptions } from './chart-options';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

function dailyToPoint(dailyCount: DailyResourceCount) {
  return {
    x: dailyCount.date,
    y: dailyCount.runningTotal,
  };
}

export function ResourceLineChart({
  title,
  label,
  metrics,
}: {
  title: string;
  label: string;
  metrics: TotalResourceMetrics | undefined;
}) {
  const lineData = {
    datasets: [
      {
        label: label,
        data: metrics?.dailyCounts.map(dailyToPoint),
        borderColor: borderColourChart,
        backgroundColor: colorBackgroundChart,
      },
    ],
  };

  return (
    <ChartPaper>
      <TotalCount title={title} total={metrics?.total} />
      <Box sx={{ height: '300px' }}>
        <Line options={lineOptions} data={lineData} />
      </Box>
    </ChartPaper>
  );
}
