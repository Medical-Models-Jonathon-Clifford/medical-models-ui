'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { getStringFromBlockType } from '../../../utils/block-type-adapter';
import {
  getCompanyModelRankings, getUserRankingsForCommentCreation,
  getUserRankingsForDocumentCreation
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

type NamedUserRanking = {
  name: string;
  frequency: number;
};

type ModelRanking = {
  type: string;
  frequency: number;
};

export function CompanyRankings() {
  const [docCreationUserRankings, setDocCreationUserRankings] = useState<
    NamedUserRanking[] | undefined
  >(undefined);
  const [commentCreationUserRankings, setCommentCreationUserRankings] = useState<
    NamedUserRanking[] | undefined
  >(undefined);
  const [modelRankings, setModelRankings] = useState<
    ModelRanking[] | undefined
  >(undefined);
  const [viewDocState, setViewDocState] = useState<ViewDocState>('loading');

  useEffect(() => {
    async function fetchSupportData() {
      const docCreationUserRankingsResponse = await getUserRankingsForDocumentCreation();
      const commentCreationUserRankingsResponse = await getUserRankingsForCommentCreation();
      const modelRankingsResponse = await getCompanyModelRankings();
      setDocCreationUserRankings(docCreationUserRankingsResponse.data);
      setCommentCreationUserRankings(commentCreationUserRankingsResponse.data);
      setModelRankings(modelRankingsResponse.data);
      setViewDocState('loaded');
    }

    fetchSupportData();
  }, []);

  const userDocCreationRankingOptions = {
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
        text: 'Ranking users by documents created',
      },
    },
  };

  const userCommentCreationRankingOptions = {
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
        text: 'Ranking users by comments created',
      },
    },
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
        text: 'Model usage since the beginning of time',
      },
    },
  };

  const userDocCreationRankingLabels = docCreationUserRankings?.map(docCreationRanking => docCreationRanking.name);

  const userDocCreationRankingData = {
    labels: userDocCreationRankingLabels,
    datasets: [
      {
        label: 'Documents created',
        data: docCreationUserRankings?.map(docCreationRanking => docCreationRanking.frequency),
        borderColor: 'rgb(99,161,255)',
        backgroundColor: 'rgba(99,154,255,0.5)',
      }
    ],
  };

  const userWhoCreatedTheMostDocuments = docCreationUserRankings ? docCreationUserRankings[0].name : undefined;

  const userCommentCreationRankingLabels = commentCreationUserRankings?.map(docCreationRanking => docCreationRanking.name);

  const userCommentCreationRankingData = {
    labels: userCommentCreationRankingLabels,
    datasets: [
      {
        label: 'Comments',
        data: commentCreationUserRankings?.map(docCreationRanking => docCreationRanking.frequency),
        borderColor: 'rgb(99,161,255)',
        backgroundColor: 'rgba(99,154,255,0.5)',
      }
    ],
  };

  const userWhoCreatedTheMostComments = commentCreationUserRankings ? commentCreationUserRankings[0].name : undefined;

  const labels = modelRankings?.map(modelRanking => modelRanking.type).map(getStringFromBlockType);

  const data = {
    labels,
    datasets: [
      {
        label: 'Usage Frequency',
        data: modelRankings?.map(modelRanking => modelRanking.frequency),
        borderColor: 'rgb(99,161,255)',
        backgroundColor: 'rgba(99,154,255,0.5)',
      }
    ],
  };

  const mostPopularModel = modelRankings ? getStringFromBlockType(modelRankings[0].type) : undefined;

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
              {/* Most New Documents */}
              <Paper
                elevation={3}
                variant="outlined"
                style={{ width: '50%', padding: '8px' }}
              >
                <Typography>
                  Most Documents:{' '}
                  <Typography display="inline" fontWeight={'bold'}>
                    {userWhoCreatedTheMostDocuments}
                  </Typography>
                </Typography>
                <div className="chart-container" style={{ height: '300px' }}>
                  <Bar options={userDocCreationRankingOptions} data={userDocCreationRankingData} />
                </div>
              </Paper>
              {/* Most New Comments */}
              <Paper
                elevation={3}
                variant="outlined"
                style={{ width: '50%', padding: '8px' }}
              >
                <Typography>
                  Most Comments:{' '}
                  <Typography display="inline" fontWeight={'bold'}>
                    {userWhoCreatedTheMostComments}
                  </Typography>
                </Typography>
                <div className="chart-container" style={{ height: '300px' }}>
                  <Bar options={userCommentCreationRankingOptions} data={userCommentCreationRankingData} />
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
              {/* Model Rankings */}
              <Paper
                elevation={3}
                variant="outlined"
                style={{ width: '50%', padding: '8px' }}
              >
                <Typography>
                  Most Popular Model:{' '}
                  <Typography display="inline" fontWeight={'bold'}>
                    {mostPopularModel}
                  </Typography>
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
          </Stack>
        </>
      )}
    </Box>
  );
}
