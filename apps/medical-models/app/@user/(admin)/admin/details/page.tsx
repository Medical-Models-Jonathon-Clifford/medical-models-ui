import { getCompanyDetails } from '@mm/clients';
import { CompanyDetails } from '../../../../../features/company/CompanyDetails';

export default async function AdminOrganisationDetailsPage() {
  const companyDetails = (await getCompanyDetails()).data;

  return <CompanyDetails companyDetails={companyDetails}></CompanyDetails>;
}
