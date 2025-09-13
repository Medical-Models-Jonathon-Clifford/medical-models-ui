'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { getCompany } from '../../../client/mm-company-client';
import { CompanyDetails, ViewCompanyDetailsDto } from './CompanyDetails';

export function SupportCompanyDetails({ companyId }: { companyId: string }) {
  const [companyDetails, setCompanyDetails] = useState<
    ViewCompanyDetailsDto | undefined
  >(undefined);

  useEffect(() => {
    async function fetchCompanyDetails() {
      const companyDetailsResponse = await getCompany(companyId);
      setCompanyDetails(companyDetailsResponse.data);
    }

    fetchCompanyDetails();
  }, []);

  return <CompanyDetails companyDetails={companyDetails}></CompanyDetails>;
}
