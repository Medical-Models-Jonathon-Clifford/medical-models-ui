import { CompanyRankings } from '../../../../features/admin/company-resources/CompanyRankings';
import Typography from '@mui/material/Typography';
import { CompanyTrends } from '../../../../features/admin/company-resources/CompanyTrends';

export default function AdminPage() {
  return (
    <div>
      <Typography variant="h2">Admin Dashboard</Typography>
      <div>
        <Typography variant="h3">Rankings</Typography>
        <div>
          <CompanyRankings></CompanyRankings>
        </div>
      </div>
      <div>
        <Typography variant="h3">Trends</Typography>
        <CompanyTrends></CompanyTrends>
      </div>
    </div>
  );
}
