import { Paper, PaperProps } from '@mui/material';

export const BlockPaper = (props: PaperProps) => (
  <Paper elevation={3} variant="outlined" sx={{ padding: '8px' }} {...props} />
);
