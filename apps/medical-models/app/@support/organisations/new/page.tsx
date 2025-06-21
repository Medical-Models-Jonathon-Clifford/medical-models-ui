import Button from '@mui/material/Button';
import { Stack } from '@mui/material';

export default async function SupportUsersPage() {
  return (
    <div>
      <h2>Create New Organisation</h2>
      <p>Name</p>
      <Stack direction="column" alignItems="flex-start" spacing={2}>
        <input type="text" />
        <Button variant="contained">Create</Button>
      </Stack>
    </div>
  );
}
