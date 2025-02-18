import Box from '@mui/material/Box';
import * as React from 'react';
import styles from './MainStage.module.scss';

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
      className={styles.main_stage_box}
      sx={{
        width: `calc(100vw - ${drawerWidth}px)`,
      }}
    >
      {children}
    </Box>
  );
}
