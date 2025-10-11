import { ReactNode } from 'react';
import { Box } from '@mui/material';
import styles from './MainStage.module.scss';

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
      className={styles.main_stage_box}
      sx={{
        width: `calc(100vw - ${drawerWidth}px)`,
      }}
    >
      {children}
    </Box>
  );
}
