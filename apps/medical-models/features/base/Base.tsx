import { ReactNode } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { AppBar } from '../../components/appbar/AppBar';

export default function Base({ children }: { children: ReactNode }) {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar />
        <>{children}</>
      </Box>
    </>
  );
}
