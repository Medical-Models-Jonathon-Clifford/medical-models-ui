import { ReactNode } from 'react';
import { Box } from '@mui/material';
import styles from './Drawer.module.scss';

export function Drawer({
  children,
  width,
}: {
  children: ReactNode;
  width: number;
}) {
  return (
    <Box className={styles.drawer_box} sx={{ width: width }}>
      {children}
    </Box>
  );
}
