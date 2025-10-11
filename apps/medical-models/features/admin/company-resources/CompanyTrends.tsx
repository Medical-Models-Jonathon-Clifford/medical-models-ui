'use client';

import { useEffect, useState } from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
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
import {
  getCompanyCommentMetrics,
  getCompanyDocumentMetrics,
} from '../../../client/mm-admin-client';

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

type ViewDocState = 'loading' | 'loaded';

type DailyResourceCount = {
  date: string;
  newResources: number;
  runningTotal: number;
};

type TotalResourceMetrics = {
  total: number;
  dailyCounts: DailyResourceCount[];
};

export function CompanyTrends() {
  const [totalDocumentMetrics, setTotalDocumentMetrics] = useState<
    TotalResourceMetrics | undefined
  >(undefined);
  const [totalCommentMetrics, setTotalCommentMetrics] = useState<
    TotalResourceMetrics | undefined
  >(undefined);
  const [viewDocState, setViewDocState] = useState<ViewDocState>('loading');

  useEffect(() => {
    async function fetchSupportData() {
      const documentResponse = await getCompanyDocumentMetrics();
      const commentResponse = await getCompanyCommentMetrics();
      setTotalDocumentMetrics(documentResponse.data);
      setTotalCommentMetrics(commentResponse.data);
      setViewDocState('loaded');
    }

    fetchSupportData();
  }, []);

  const dailyResourceCountToDataPoint = (
    dailyCompanyCount: DailyResourceCount
  ) => {
    return {
      x: dailyCompanyCount.date,
      y: dailyCompanyCount.runningTotal,
    };
  };

  const documentDataPoints = totalDocumentMetrics?.dailyCounts?.map(
    dailyResourceCountToDataPoint
  );

  const createDocumentChartData = () => {
    return {
      datasets: [
        {
          label: 'Documents',
          data: documentDataPoints,
          borderColor: 'rgb(99,161,255)',
          backgroundColor: 'rgba(99,154,255,0.5)',
        },
      ],
    };
  };

  const commentDataPoints = totalCommentMetrics?.dailyCounts?.map(
    dailyResourceCountToDataPoint
  );

  const createCommentChartData = () => {
    return {
      datasets: [
        {
          label: 'Comments',
          data: commentDataPoints,
          borderColor: 'rgb(99,161,255)',
          backgroundColor: 'rgba(99,154,255,0.5)',
        },
      ],
    };
  };

  const growthChartOptions = {
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
  } as ChartOptions<'line'>;

  return (
    <Box sx={{ padding: '8px' }}>
      {viewDocState === 'loading' && <p>Loading...</p>}
      {viewDocState === 'loaded' && (
        <>
          <Stack direction={'column'} style={{ gap: '8px' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: '8px',
              }}
            >
              {/* Documents */}
              <Paper
                elevation={3}
                variant="outlined"
                style={{ width: '50%', padding: '8px' }}
              >
                <Typography>
                  Company Documents:{' '}
                  <span className="important_text">
                    {totalDocumentMetrics?.total}
                  </span>
                </Typography>
                <div className="chart-container" style={{ height: '300px' }}>
                  <Line
                    options={growthChartOptions}
                    data={createDocumentChartData()}
                  />
                </div>
              </Paper>
              {/* Comments */}
              <Paper
                elevation={3}
                variant="outlined"
                style={{ width: '50%', padding: '8px' }}
              >
                <Typography>
                  Company Comments:{' '}
                  <span className="important_text">
                    {totalCommentMetrics?.total}
                  </span>
                </Typography>
                <div className="chart-container" style={{ height: '300px' }}>
                  <Line
                    options={growthChartOptions}
                    data={createCommentChartData()}
                  />
                </div>
              </Paper>
            </Box>
          </Stack>
        </>
      )}
    </Box>
  );
}
