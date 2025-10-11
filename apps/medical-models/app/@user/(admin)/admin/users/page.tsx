import { Typography } from '@mui/material';
import { CompanyUserSearch } from '../../../../../features/admin/company-user-search/CompanyUserSearch';

export default function AdminUsersPage() {
  return (
    <div>
      <Typography variant="h2">Manage Users</Typography>
      <CompanyUserSearch></CompanyUserSearch>
    </div>
  );
}
