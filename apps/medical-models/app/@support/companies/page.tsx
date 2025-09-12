import Typography from '@mui/material/Typography';
import { CompanySearch } from '../../../features/support/company-search/CompanySearch';

export default async function SupportUsersPage() {
  return (
    <div>
      <Typography variant="h2">Manage All Companies</Typography>
      <CompanySearch></CompanySearch>
    </div>
  );
}
