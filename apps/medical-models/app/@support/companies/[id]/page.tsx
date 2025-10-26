import { getCompany } from '@mm/clients';
import { CompanyDetails } from '../../../../features/company/CompanyDetails';

export default async function Page({ params }: { params: { id: string } }) {
  const companyDetails = (await getCompany(params.id)).data;

  return <CompanyDetails companyDetails={companyDetails}></CompanyDetails>;
}
