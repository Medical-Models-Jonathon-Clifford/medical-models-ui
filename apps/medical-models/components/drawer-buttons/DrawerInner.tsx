import { Box, BoxProps } from '@mui/material';

export const DrawerInner = (props: BoxProps) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      flex: 'auto',
      gap: '8px',
    }}
    {...props}
  ></Box>
);
