import { Typography } from '@mui/material';
import {
  getModelRankings,
  getTotalCommentMetrics,
  getTotalCompanyMetrics,
  getTotalDocumentMetrics,
  getTotalUserMetrics,
} from '../../../client/support-client';
import { DashPlaceholder } from '../../../components/dashboard/DashPlaceholder';
import { ResourceLineChart } from '../../../components/charts/ResourceLineChart';
import { ResourceBarChart } from '../../../components/charts/ResourceBarChart';
import { blockTypeToStr } from '../../../utils/block-type-adapter';
import { DashboardRow } from '../../../components/dashboard/DashboardRow';
import { DashStack } from '../../../components/dashboard/DashStack';

export async function TotalResources() {
  const companyMetrics = (await getTotalCompanyMetrics()).data;
  const userMetrics = (await getTotalUserMetrics()).data;
  const documentMetrics = (await getTotalDocumentMetrics()).data;
  const commentMetrics = (await getTotalCommentMetrics()).data;
  const modelRankings = (await getModelRankings()).data;

  const modelLabels = modelRankings
    ?.map(({ type }) => type)
    .map(blockTypeToStr);
  const modelData = modelRankings.map(({ frequency }) => frequency);

  return (
    <DashStack>
      <Typography variant="h3">Rankings</Typography>
      <DashboardRow>
        <ResourceBarChart
          title={'Most Popular Model'}
          chartTitle={'Model usage since the beginning of time'}
          label={'Usage Frequency'}
          labels={modelLabels}
          datasetData={modelData}
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
    </DashStack>
  );
}
