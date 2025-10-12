import {
  getCompanyCommentMetrics,
  getCompanyDocumentMetrics,
} from '../../../client/admin-client';
import { DashboardRow } from '../../../components/dashboard/DashboardRow';
import { ResourceLineChart } from '../../../components/charts/ResourceLineChart';
import { DashStack } from '../../../components/dashboard/DashStack';

export async function CompanyTrends() {
  const documentMetrics = (await getCompanyDocumentMetrics()).data;
  const commentMetrics = (await getCompanyCommentMetrics()).data;

  return (
    <DashStack>
      <DashboardRow>
        <ResourceLineChart
          title={'Company Documents'}
          label={'Documents'}
          metrics={documentMetrics}
        ></ResourceLineChart>
        <ResourceLineChart
          title={'Company Comments'}
          label={'Comments'}
          metrics={commentMetrics}
        ></ResourceLineChart>
      </DashboardRow>
    </DashStack>
  );
}
