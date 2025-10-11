import { SupportCompanyDetails } from '../../../../features/company/company-details/SupportCompanyDetails';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <SupportCompanyDetails companyId={params.id}></SupportCompanyDetails>
    </>
  );
}
