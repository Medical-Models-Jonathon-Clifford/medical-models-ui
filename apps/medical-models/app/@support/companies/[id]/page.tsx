import { getCompany } from '../../../../client/company-client';
import { CompanyDetails } from '../../../../features/company/company-details/CompanyDetails';

export default async function Page({ params }: { params: { id: string } }) {
  const companyDetailsResponse = await getCompany(params.id);
  const companyDetails = companyDetailsResponse.data;

  return <CompanyDetails companyDetails={companyDetails}></CompanyDetails>;
}
