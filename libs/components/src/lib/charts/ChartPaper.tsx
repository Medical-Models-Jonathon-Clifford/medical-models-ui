import { Paper, PaperProps } from '@mui/material';

export const ChartPaper = (props: PaperProps) => (
  <Paper
    variant="outlined"
    sx={{ width: '50%', padding: '8px' }}
    {...props}
  ></Paper>
);
