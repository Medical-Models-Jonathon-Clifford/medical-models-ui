import { blockTypeToStr } from '@mm/utils';
import {
  getCompanyModelRankings,
  getUserRankingsForCommentCreation,
  getUserRankingsForDocumentCreation,
} from '@mm/clients';
import {
  DashboardRow,
  DashPlaceholder,
  DashStack,
  ResourceBarChart,
} from '@mm/components/server';

export async function CompanyRankings() {
  const documentRankings = (await getUserRankingsForDocumentCreation()).data;
  const commentRankings = (await getUserRankingsForCommentCreation()).data;
  const modelRankings = (await getCompanyModelRankings()).data;

  const docLabels = documentRankings.map(({ name }) => name);
  const commentLabels = commentRankings.map(({ name }) => name);
  const modelLabels = modelRankings.map(({ type }) => type).map(blockTypeToStr);

  return (
    <DashStack>
      <DashboardRow>
        <ResourceBarChart
          title={'Most Documents'}
          chartTitle={'Ranking users by documents created'}
          label={'Documents created'}
          labels={docLabels}
          datasetData={documentRankings?.map(
            (docCreationRanking) => docCreationRanking.frequency
          )}
        ></ResourceBarChart>
        <ResourceBarChart
          title={'Most Comments'}
          chartTitle={'Ranking users by comments created'}
          label={'Comments'}
          labels={commentLabels}
          datasetData={commentRankings?.map(
            (docCreationRanking) => docCreationRanking.frequency
          )}
        ></ResourceBarChart>
      </DashboardRow>
      <DashboardRow>
        <ResourceBarChart
          title={'Most Popular Model'}
          chartTitle={'Model usage since the beginning of time'}
          label={'Usage Frequency'}
          labels={modelLabels}
          datasetData={modelRankings?.map(
            (modelRanking) => modelRanking.frequency
          )}
        ></ResourceBarChart>
        <DashPlaceholder />
      </DashboardRow>
    </DashStack>
  );
}
