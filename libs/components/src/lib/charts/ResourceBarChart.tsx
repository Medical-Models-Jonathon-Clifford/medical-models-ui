import { borderColourChart, colorBackgroundChart } from '@mm/tokens';
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
}: {
  title: string;
  chartTitle: string;
  label: string;
  labels: string[] | undefined;
  datasetData: number[] | undefined;
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
      <TotalCount title={title} total={labels?.[0]} />
      <Box sx={{ height: '300px' }}>
        <BarChart options={barOptions} data={barData} />
      </Box>
    </ChartPaper>
  );
}
