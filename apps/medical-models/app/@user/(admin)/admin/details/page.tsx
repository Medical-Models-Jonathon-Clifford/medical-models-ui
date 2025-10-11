import { getCompanyDetails } from '../../../../../client/admin-client';
import { CompanyDetails } from '../../../../../features/company/company-details/CompanyDetails';

export default async function AdminOrganisationDetailsPage() {
  const companyDetailsResponse = await getCompanyDetails();
  const companyDetails = companyDetailsResponse.data;

  return <CompanyDetails companyDetails={companyDetails}></CompanyDetails>;
}
