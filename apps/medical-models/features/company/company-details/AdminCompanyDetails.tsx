'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { CompanyDetails, ViewCompanyDetailsDto } from './CompanyDetails';
import { getCompanyDetails } from '../../../client/mm-admin-client';

export function AdminCompanyDetails() {
  const [companyDetails, setCompanyDetails] = useState<
    ViewCompanyDetailsDto | undefined
  >(undefined);

  useEffect(() => {
    async function fetchCompanyDetails() {
      const companyDetailsResponse = await getCompanyDetails();
      setCompanyDetails(companyDetailsResponse.data);
    }

    fetchCompanyDetails();
  }, []);

  return <CompanyDetails companyDetails={companyDetails}></CompanyDetails>;
}
