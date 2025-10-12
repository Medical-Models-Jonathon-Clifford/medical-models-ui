'use client';

import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import {
  getModelRankings,
  getTotalCommentMetrics,
  getTotalCompanyMetrics,
  getTotalDocumentMetrics,
  getTotalUserMetrics,
} from '../../../client/support-client';
import { ModelRanking, TotalResourceMetrics } from '../../../types/dashboard';
import { LOADED, loading, SimplePageState } from '../../../types/states';
import { DashPlaceholder } from '../../../components/dashboard/DashPlaceholder';
import { ResourceLineChart } from '../../../components/charts/ResourceLineChart';
import { ResourceBarChart } from '../../../components/charts/ResourceBarChart';
import { getStringFromBlockType } from '../../../utils/block-type-adapter';
import { DashboardRow } from '../../../components/dashboard/DashboardRow';

export function TotalResources() {
  const [companyMetrics, setCompanyMetrics] = useState<
    TotalResourceMetrics | undefined
  >(undefined);
  const [userMetrics, setUserMetrics] = useState<
    TotalResourceMetrics | undefined
  >(undefined);
  const [documentMetrics, setDocumentMetrics] = useState<
    TotalResourceMetrics | undefined
  >(undefined);
  const [commentMetrics, setCommentMetrics] = useState<
    TotalResourceMetrics | undefined
  >(undefined);
  const [modelRankings, setModelRankings] = useState<
    ModelRanking[] | undefined
  >(undefined);
  const [viewDocState, setViewDocState] = useState<SimplePageState>(loading);

  useEffect(() => {
    async function fetchSupportData() {
      const companyResponse = await getTotalCompanyMetrics();
      const userResponse = await getTotalUserMetrics();
      const documentResponse = await getTotalDocumentMetrics();
      const commentResponse = await getTotalCommentMetrics();
      const modelRankingsResponse = await getModelRankings();
      setCompanyMetrics(companyResponse.data);
      setUserMetrics(userResponse.data);
      setDocumentMetrics(documentResponse.data);
      setCommentMetrics(commentResponse.data);
      setModelRankings(modelRankingsResponse.data);
      setViewDocState(LOADED);
    }

    fetchSupportData();
  }, []);

  const popularModelLabels = modelRankings
    ?.map((ranking) => ranking.type)
    .map(getStringFromBlockType);

  return (
    <Box sx={{ padding: '8px' }}>
      {viewDocState === loading && <p>Loading...</p>}
      {viewDocState === LOADED && (
        <Stack direction={'column'} style={{ gap: '8px' }}>
          <Typography variant="h3">Rankings</Typography>
          <DashboardRow>
            <ResourceBarChart
              title={'Most Popular Model'}
              chartTitle={'Model usage since the beginning of time'}
              label={'Usage Frequency'}
              labels={popularModelLabels}
              datasetData={modelRankings?.map(
                (modelRanking) => modelRanking.frequency
              )}
              top={
                modelRankings
                  ? getStringFromBlockType(modelRankings[0].type)
                  : undefined
              }
            ></ResourceBarChart>
            <DashPlaceholder />
          </DashboardRow>
          <Typography variant="h3">Trends</Typography>
          <DashboardRow>
            <ResourceLineChart
              title={'Total Companies'}
              label={'Companies'}
              metrics={companyMetrics}
            ></ResourceLineChart>
            <ResourceLineChart
              title={'Total Users'}
              label={'Users'}
              metrics={userMetrics}
            ></ResourceLineChart>
          </DashboardRow>
          <DashboardRow>
            <ResourceLineChart
              title={'Total Documents'}
              label={'Documents'}
              metrics={documentMetrics}
            ></ResourceLineChart>
            <ResourceLineChart
              title={'Total Comments'}
              label={'Comments'}
              metrics={commentMetrics}
            ></ResourceLineChart>
          </DashboardRow>
        </Stack>
      )}
    </Box>
  );
}
