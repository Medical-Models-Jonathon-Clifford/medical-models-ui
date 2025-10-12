import { ModelRanking } from '../../types/dashboard';
import { getStringFromBlockType } from '../../utils/block-type-adapter';
import { borderColourChart, colorBackgroundChart } from '../../variables';
import { Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { TotalCount } from './TotalCount';
import { ChartPaper } from './ChartPaper';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip);

export function ResourceBarChart({
  title,
  chartTitle,
  label,
  rankings,
}: {
  title: string;
  chartTitle: string;
  label: string;
  rankings: ModelRanking[] | undefined;
}) {
  const labels = rankings
    ?.map((ranking) => ranking.type)
    .map(getStringFromBlockType);

  const data = {
    labels,
    datasets: [
      {
        label: label,
        data: rankings?.map((modelRanking) => modelRanking.frequency),
        borderColor: borderColourChart,
        backgroundColor: colorBackgroundChart,
      },
    ],
  };

  const modelRankingOptions = {
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

  const mostPopularModel = rankings
    ? getStringFromBlockType(rankings[0].type)
    : undefined;

  return (
    <ChartPaper>
      <TotalCount title={title} total={mostPopularModel} />
      <Box sx={{ height: '300px' }}>
        <Bar options={modelRankingOptions} data={data} />
      </Box>
    </ChartPaper>
  );
}
