import * as React from 'react';
import { Box, CssBaseline } from '@mui/material';
import TopAppBar from './TopAppBar';
import styles from './Base.module.scss';

export default function Base({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CssBaseline />
      <Box className={styles.base_box}>
        <TopAppBar />
        <>{children}</>
      </Box>
    </>
  );
}
