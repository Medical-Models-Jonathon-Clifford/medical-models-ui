import {
  getCompanyCommentMetrics,
  getCompanyDocumentMetrics,
} from '../../../client/admin-client';
import { TotalResourceMetrics } from '../../../types/dashboard';
import { DashboardRow } from '../../../components/dashboard/DashboardRow';
import { ResourceLineChart } from '../../../components/charts/ResourceLineChart';
import { DashStack } from '../../../components/dashboard/DashStack';

export async function CompanyTrends() {
  const documentResponse = await getCompanyDocumentMetrics();
  const totalDocumentMetrics: TotalResourceMetrics = documentResponse.data;
  const commentResponse = await getCompanyCommentMetrics();
  const totalCommentMetrics: TotalResourceMetrics = commentResponse.data;

  return (
    <DashStack>
      <DashboardRow>
        <ResourceLineChart
          title={'Company Documents'}
          label={'Documents'}
          metrics={totalDocumentMetrics}
        ></ResourceLineChart>
        <ResourceLineChart
          title={'Company Comments'}
          label={'Comments'}
          metrics={totalCommentMetrics}
        ></ResourceLineChart>
      </DashboardRow>
    </DashStack>
  );
}
