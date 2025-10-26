import {
  getCompanyCommentMetrics,
  getCompanyDocumentMetrics,
} from '@mm/clients';
import {
  DashboardRow,
  DashStack,
  ResourceLineChart,
} from '@mm/components/server';

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
