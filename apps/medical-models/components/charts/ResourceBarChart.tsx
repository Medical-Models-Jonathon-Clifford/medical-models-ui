import { borderColourChart, colorBackgroundChart } from '../../variables';
import { Box } from '@mui/material';
import { ChartData } from 'chart.js';
import { TotalCount } from './TotalCount';
import { ChartPaper } from './ChartPaper';
import { createBarOptions } from './chart-options';
import { BarChart } from './BarChart';

export function ResourceBarChart({
  title,
  chartTitle,
  label,
  labels,
  datasetData,
  top,
}: {
  title: string;
  chartTitle: string;
  label: string;
  labels: string[] | undefined;
  datasetData: number[] | undefined;
  top: string | undefined;
}) {
  const barData: ChartData<'bar', number[] | undefined> = {
    labels,
    datasets: [
      {
        label: label,
        data: datasetData,
        borderColor: borderColourChart,
        backgroundColor: colorBackgroundChart,
      },
    ],
  };

  const barOptions = createBarOptions(chartTitle);

  return (
    <ChartPaper>
      <TotalCount title={title} total={top} />
      <Box sx={{ height: '300px' }}>
        <BarChart options={barOptions} data={barData} />
      </Box>
    </ChartPaper>
  );
}
