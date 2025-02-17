import Box from '@mui/material/Box';
import * as React from 'react';

export default function MainStage({
  children,
  drawerWidth,
}: {
  children: React.ReactNode;
  drawerWidth: number;
}) {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: '#FFF',
        overflow: 'auto',
        padding: '0 40px 20px 40px',
        width: `calc(100vw - ${drawerWidth}px)`,
      }}
    >
      {children}
    </Box>
  );
}
