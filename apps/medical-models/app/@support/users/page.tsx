import { Typography } from '@mui/material';
import { UserSearch } from '../../../features/support/user-search/UserSearch';

export default async function SupportUsersPage() {
  return (
    <div>
      <Typography variant="h2">Manage All Users</Typography>
      <UserSearch></UserSearch>
    </div>
  );
}
