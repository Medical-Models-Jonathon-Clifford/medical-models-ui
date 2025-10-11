import * as React from 'react';
import { CompanyDetails } from './CompanyDetails';
import { getCompanyDetails } from '../../../client/mm-admin-client';

export async function AdminCompanyDetails() {
  const companyDetailsResponse = await getCompanyDetails();
  const companyDetails = companyDetailsResponse.data;

  return <CompanyDetails companyDetails={companyDetails}></CompanyDetails>;
}
