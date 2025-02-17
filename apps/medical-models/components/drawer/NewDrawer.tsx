import Box from '@mui/material/Box';
import React from 'react';
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
