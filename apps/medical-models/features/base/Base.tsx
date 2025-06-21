import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
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
