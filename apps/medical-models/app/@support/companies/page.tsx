import { Typography } from '@mui/material';
import { CompanySearch } from '../../../features/support/CompanySearch';

export default function SupportUsersPage() {
  return (
    <div>
      <Typography variant="h2">Manage All Companies</Typography>
      <CompanySearch></CompanySearch>
    </div>
  );
}
