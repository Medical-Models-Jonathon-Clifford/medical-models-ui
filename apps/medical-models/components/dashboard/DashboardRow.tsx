import { Box, BoxProps } from '@mui/material';

export const DashboardRow = (props: BoxProps) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: '8px',
    }}
    {...props}
  ></Box>
);
