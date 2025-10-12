import {
  DailyResourceCount,
  TotalResourceMetrics,
} from '../../types/dashboard';
import { type ChartData } from 'chart.js';
import { borderColourChart, colorBackgroundChart } from '../../variables';
import { Box } from '@mui/material';
import { TotalCount } from './TotalCount';
import { ChartPaper } from './ChartPaper';
import { lineOptions } from './chart-options';
import { DatePoint, LineChart } from './LineChart';

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
  const lineData: ChartData<'line', DatePoint[] | undefined> = {
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
        <LineChart options={lineOptions} data={lineData} />
      </Box>
    </ChartPaper>
  );
}
