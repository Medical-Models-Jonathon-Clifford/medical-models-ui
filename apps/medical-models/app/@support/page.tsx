import { Typography } from '@mui/material';
import { TotalResources } from '../../features/support/total-resources/TotalResources';

export default function SupportDashboardPage() {
  return (
    <div>
      <Typography variant="h2">Support Dashboard</Typography>
      <TotalResources></TotalResources>
    </div>
  );
}
