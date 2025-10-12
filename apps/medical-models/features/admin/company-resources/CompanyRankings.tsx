import { getStringFromBlockType } from '../../../utils/block-type-adapter';
import {
  getCompanyModelRankings,
  getUserRankingsForCommentCreation,
  getUserRankingsForDocumentCreation,
} from '../../../client/admin-client';
import { ModelRanking, NamedUserRanking } from '../../../types/dashboard';
import { ResourceBarChart } from '../../../components/charts/ResourceBarChart';
import { DashboardRow } from '../../../components/dashboard/DashboardRow';
import { DashPlaceholder } from '../../../components/dashboard/DashPlaceholder';
import { DashStack } from '../../../components/dashboard/DashStack';

export async function CompanyRankings() {
  const docCreationUserRankingsResponse =
    await getUserRankingsForDocumentCreation();
  const docCreationUserRankings: NamedUserRanking[] =
    docCreationUserRankingsResponse.data;
  const commentCreationUserRankingsResponse =
    await getUserRankingsForCommentCreation();
  const commentRankings: NamedUserRanking[] =
    commentCreationUserRankingsResponse.data;
  const modelRankingsResponse = await getCompanyModelRankings();
  const modelRankings: ModelRanking[] = modelRankingsResponse.data;

  const docLabels = docCreationUserRankings?.map(
    (docCreationRanking) => docCreationRanking.name
  );

  const topDocumentCreator = docCreationUserRankings
    ? docCreationUserRankings[0].name
    : undefined;

  const commentLabels = commentRankings?.map(
    (docCreationRanking) => docCreationRanking.name
  );

  const topCommentCreator = commentRankings
    ? commentRankings[0].name
    : undefined;

  const modelLabels = modelRankings
    ?.map((modelRanking) => modelRanking.type)
    .map(getStringFromBlockType);

  const topModel = modelRankings
    ? getStringFromBlockType(modelRankings[0].type)
    : undefined;

  return (
    <DashStack>
      <DashboardRow>
        <ResourceBarChart
          title={'Most Documents'}
          chartTitle={'Ranking users by documents created'}
          label={'Documents created'}
          labels={docLabels}
          datasetData={docCreationUserRankings?.map(
            (docCreationRanking) => docCreationRanking.frequency
          )}
          top={topDocumentCreator}
        ></ResourceBarChart>
        <ResourceBarChart
          title={'Most Comments'}
          chartTitle={'Ranking users by comments created'}
          label={'Comments'}
          labels={commentLabels}
          datasetData={commentRankings?.map(
            (docCreationRanking) => docCreationRanking.frequency
          )}
          top={topCommentCreator}
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
          top={topModel}
        ></ResourceBarChart>
        <DashPlaceholder />
      </DashboardRow>
    </DashStack>
  );
}
