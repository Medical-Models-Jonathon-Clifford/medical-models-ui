import { Box, BoxProps } from '@mui/material';

export const DrawerContainer = (props: BoxProps) => (
  <Box
    sx={{
      boxSizing: 'border-box',
      padding: '0 8px',
      maxWidth: '100%',
      width: '100%',
      height: '36px',
    }}
    {...props}
  ></Box>
);
