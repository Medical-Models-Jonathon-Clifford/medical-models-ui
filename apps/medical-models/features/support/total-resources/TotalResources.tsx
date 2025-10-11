'use client';

import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
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
import { Bar, Line } from 'react-chartjs-2';
import { Paper } from '@mui/material';
import {
  getModelRankings,
  getTotalCommentMetrics,
  getTotalCompanyMetrics,
  getTotalDocumentMetrics,
  getTotalUserMetrics,
} from '../../../client/mm-support-client';
import { Stack } from '@mui/material';
import { Typography } from '@mui/material';
import { getStringFromBlockType } from '../../../utils/block-type-adapter';
import {
  DailyResourceCount,
  ModelRanking,
  TotalResourceMetrics,
} from '../../../types/dashboard';

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

export function TotalResources() {
  const [totalCompanyMetrics, setTotalCompanyMetrics] = useState<
    TotalResourceMetrics | undefined
  >(undefined);
  const [totalUserMetrics, setTotalUserMetrics] = useState<
    TotalResourceMetrics | undefined
  >(undefined);
  const [totalDocumentMetrics, setTotalDocumentMetrics] = useState<
    TotalResourceMetrics | undefined
  >(undefined);
  const [totalCommentMetrics, setTotalCommentMetrics] = useState<
    TotalResourceMetrics | undefined
  >(undefined);
  const [modelRankings, setModelRankings] = useState<
    ModelRanking[] | undefined
  >(undefined);
  const [viewDocState, setViewDocState] = useState<ViewDocState>('loading');

  useEffect(() => {
    async function fetchSupportData() {
      const companyResponse = await getTotalCompanyMetrics();
      const userResponse = await getTotalUserMetrics();
      const documentResponse = await getTotalDocumentMetrics();
      const commentResponse = await getTotalCommentMetrics();
      const modelRankingsResponse = await getModelRankings();
      setTotalCompanyMetrics(companyResponse.data);
      setTotalUserMetrics(userResponse.data);
      setTotalDocumentMetrics(documentResponse.data);
      setTotalCommentMetrics(commentResponse.data);
      setModelRankings(modelRankingsResponse.data);
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

  const companyGrowthDataPoints = totalCompanyMetrics?.dailyCounts?.map(
    dailyResourceCountToDataPoint
  );

  const createCompanyChartData = () => {
    return {
      datasets: [
        {
          label: 'Companies',
          data: companyGrowthDataPoints,
          borderColor: 'rgb(99,161,255)',
          backgroundColor: 'rgba(99,154,255,0.5)',
        },
      ],
    };
  };

  const userDataPoints = totalUserMetrics?.dailyCounts?.map(
    dailyResourceCountToDataPoint
  );

  const createUserChartData = () => {
    return {
      datasets: [
        {
          label: 'Users',
          data: userDataPoints,
          borderColor: 'rgb(99,161,255)',
          backgroundColor: 'rgba(99,154,255,0.5)',
        },
      ],
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
        text: 'Model usage since the beginning of time',
      },
    },
  };

  const labels = modelRankings
    ?.map((modelRanking) => modelRanking.type)
    .map(getStringFromBlockType);

  const data = {
    labels,
    datasets: [
      {
        label: 'Usage Frequency',
        data: modelRankings?.map((modelRanking) => modelRanking.frequency),
        borderColor: 'rgb(99,161,255)',
        backgroundColor: 'rgba(99,154,255,0.5)',
      },
    ],
  };

  const mostPopularModel = modelRankings
    ? getStringFromBlockType(modelRankings[0].type)
    : undefined;

  return (
    <Box sx={{ padding: '8px' }}>
      {viewDocState === 'loading' && <p>Loading...</p>}
      {viewDocState === 'loaded' && (
        <>
          <Stack direction={'column'} style={{ gap: '8px' }}>
            <Typography variant="h3">Rankings</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: '8px',
              }}
            >
              {/* Model Rankings */}
              <Paper
                elevation={3}
                variant="outlined"
                style={{ width: '50%', padding: '8px' }}
              >
                <Typography>
                  Most Popular Model:{' '}
                  <span className="important_text">{mostPopularModel}</span>
                </Typography>
                <div className="chart-container" style={{ height: '300px' }}>
                  <Bar options={modelRankingOptions} data={data} />
                </div>
              </Paper>
              {/* Stack Placeholder */}
              <Box style={{ width: '50%', padding: '8px' }}>
                <div
                  className="chart-container"
                  style={{ height: '300px' }}
                ></div>
              </Box>
            </Box>
            <Typography variant="h3">Trends</Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: '8px',
              }}
            >
              {/* Companies */}
              <Paper
                elevation={3}
                variant="outlined"
                style={{ width: '50%', padding: '8px' }}
              >
                <Typography>
                  Total Companies:{' '}
                  <span className="important_text">
                    {totalCompanyMetrics?.total}
                  </span>
                </Typography>
                <div className="chart-container" style={{ height: '300px' }}>
                  <Line
                    options={growthChartOptions}
                    data={createCompanyChartData()}
                  />
                </div>
              </Paper>
              {/* Users */}
              <Paper
                elevation={3}
                variant="outlined"
                style={{ width: '50%', padding: '8px' }}
              >
                <Typography>
                  Total Users:{' '}
                  <span className="important_text">
                    {totalUserMetrics?.total}
                  </span>
                </Typography>
                <div className="chart-container" style={{ height: '300px' }}>
                  <Line
                    options={growthChartOptions}
                    data={createUserChartData()}
                  />
                </div>
              </Paper>
            </Box>
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
                  Total Documents:{' '}
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
                  Total Comments:{' '}
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
