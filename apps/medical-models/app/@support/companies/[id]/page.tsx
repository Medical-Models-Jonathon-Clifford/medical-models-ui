import { getCompany } from '../../../../client/company-client';
import { CompanyDetails } from '../../../../features/company/company-details/CompanyDetails';

export default async function Page({ params }: { params: { id: string } }) {
  const companyDetails = (await getCompany(params.id)).data;

  return <CompanyDetails companyDetails={companyDetails}></CompanyDetails>;
}
