import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';

export default function MainStage({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: '#FFF',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        padding: '0 40px 20px 40px',
      }}
    >
      <Toolbar />
      {children}
    </Box>
  );
}
