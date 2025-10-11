import React from 'react';
import { Box } from '@mui/material';
import styles from './NewDrawer.module.scss';

export function NewDrawer({
  children,
  width,
}: {
  children: React.ReactNode;
  width: number;
}) {
  return (
    <Box className={styles.new_drawer_box} sx={{ width: width }}>
      {children}
    </Box>
  );
}
