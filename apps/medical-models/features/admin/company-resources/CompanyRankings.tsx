import { Box, Paper, Stack, Typography } from '@mui/material';
import { getStringFromBlockType } from '../../../utils/block-type-adapter';
import {
  getCompanyModelRankings,
  getUserRankingsForCommentCreation,
  getUserRankingsForDocumentCreation,
} from '../../../client/admin-client';
import { BarChart } from '../../../components/charts/BarChart';
import { ModelRanking, NamedUserRanking } from '../../../types/dashboard';

export async function CompanyRankings() {
  const docCreationUserRankingsResponse =
    await getUserRankingsForDocumentCreation();
  const docCreationUserRankings: NamedUserRanking[] =
    docCreationUserRankingsResponse.data;
  const commentCreationUserRankingsResponse =
    await getUserRankingsForCommentCreation();
  const commentCreationUserRankings: NamedUserRanking[] =
    commentCreationUserRankingsResponse.data;
  const modelRankingsResponse = await getCompanyModelRankings();
  const modelRankings: ModelRanking[] = modelRankingsResponse.data;

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

  const userDocCreationRankingLabels = docCreationUserRankings?.map(
    (docCreationRanking) => docCreationRanking.name
  );

  const userDocCreationRankingData = {
    labels: userDocCreationRankingLabels,
    datasets: [
      {
        label: 'Documents created',
        data: docCreationUserRankings?.map(
          (docCreationRanking) => docCreationRanking.frequency
        ),
        borderColor: 'rgb(99,161,255)',
        backgroundColor: 'rgba(99,154,255,0.5)',
      },
    ],
  };

  const userWhoCreatedTheMostDocuments = docCreationUserRankings
    ? docCreationUserRankings[0].name
    : undefined;

  const userCommentCreationRankingLabels = commentCreationUserRankings?.map(
    (docCreationRanking) => docCreationRanking.name
  );

  const userCommentCreationRankingData = {
    labels: userCommentCreationRankingLabels,
    datasets: [
      {
        label: 'Comments',
        data: commentCreationUserRankings?.map(
          (docCreationRanking) => docCreationRanking.frequency
        ),
        borderColor: 'rgb(99,161,255)',
        backgroundColor: 'rgba(99,154,255,0.5)',
      },
    ],
  };

  const userWhoCreatedTheMostComments = commentCreationUserRankings
    ? commentCreationUserRankings[0].name
    : undefined;

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
                <span className="important_text">
                  {userWhoCreatedTheMostDocuments}
                </span>
              </Typography>
              <div style={{ height: '300px' }}>
                <BarChart
                  options={userDocCreationRankingOptions}
                  data={userDocCreationRankingData}
                />
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
                <span className="important_text">
                  {userWhoCreatedTheMostComments}
                </span>
              </Typography>
              <div style={{ height: '300px' }}>
                <BarChart
                  options={userCommentCreationRankingOptions}
                  data={userCommentCreationRankingData}
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
              <div style={{ height: '300px' }}>
                <BarChart options={modelRankingOptions} data={data} />
              </div>
            </Paper>
            {/* Stack Placeholder */}
            <Box
              style={{ width: '50%', padding: '8px', height: '300px' }}
            ></Box>
          </Box>
        </Stack>
      </>
    </Box>
  );
}
