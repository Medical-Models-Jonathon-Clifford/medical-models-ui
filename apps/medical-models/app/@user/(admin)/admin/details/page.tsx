import { getCompanyDetails } from '../../../../../client/admin-client';
import { CompanyDetails } from '../../../../../features/company/company-details/CompanyDetails';

export default async function AdminOrganisationDetailsPage() {
  const companyDetails = (await getCompanyDetails()).data;

  return <CompanyDetails companyDetails={companyDetails}></CompanyDetails>;
}
