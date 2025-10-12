import { ReactNode } from 'react';
import { Box } from '@mui/material';

export default function MainStage({
  children,
  drawerWidth,
}: {
  children: ReactNode;
  drawerWidth: number;
}) {
  return (
    <Box
      component="main"
      sx={{
        width: `calc(100vw - ${drawerWidth}px)`,
        backgroundColor: '#fff',
        overflowY: 'auto',
        padding: '0 40px 20px 40px',
        height: '100%',
      }}
    >
      {children}
    </Box>
  );
}
