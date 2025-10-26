import { Paper, PaperProps } from '@mui/material';

export const ChartPaper = (props: PaperProps) => (
  <Paper
    elevation={3}
    variant="outlined"
    sx={{ width: '50%', padding: '8px' }}
    {...props}
  ></Paper>
);
