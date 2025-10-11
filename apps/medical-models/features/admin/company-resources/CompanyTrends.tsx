import { Box, Paper, Stack, Typography } from '@mui/material';
import { ChartData, type ChartOptions } from 'chart.js';
import {
  getCompanyCommentMetrics,
  getCompanyDocumentMetrics,
} from '../../../client/admin-client';
import { DatePoint, LineChart } from '../../../components/charts/LineChart';
import {
  DailyResourceCount,
  TotalResourceMetrics,
} from '../../../types/dashboard';

export async function CompanyTrends() {
  const documentResponse = await getCompanyDocumentMetrics();
  const totalDocumentMetrics: TotalResourceMetrics = documentResponse.data;
  const commentResponse = await getCompanyCommentMetrics();
  const totalCommentMetrics: TotalResourceMetrics = commentResponse.data;

  const dailyResourceCountToDataPoint = (
    dailyCompanyCount: DailyResourceCount
  ): DatePoint => {
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

  const commentDataPoints: DatePoint[] = totalCommentMetrics?.dailyCounts?.map(
    dailyResourceCountToDataPoint
  );

  const createCommentChartData = (): ChartData<'line', DatePoint[]> => {
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
              <div style={{ height: '300px' }}>
                <LineChart
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
              <div style={{ height: '300px' }}>
                <LineChart
                  options={growthChartOptions}
                  data={createCommentChartData()}
                />
              </div>
            </Paper>
          </Box>
        </Stack>
      </>
    </Box>
  );
}
