import * as React from 'react';
import { TotalResources } from '../../features/support/total-resources/TotalResources';
import Typography from '@mui/material/Typography';

export default async function SupportDashboardPage() {
  return (
    <div>
      <Typography variant="h2">Support Dashboard</Typography>
      <div>
        <TotalResources></TotalResources>
      </div>
    </div>
  );
}
