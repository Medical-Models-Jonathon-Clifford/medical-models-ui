import * as React from 'react';
import { Box, CssBaseline } from '@mui/material';
import styles from './Base.module.scss';
import { AppBar } from '../../components/appbar/AppBar';

export default function Base({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CssBaseline />
      <Box className={styles.base_box}>
        <AppBar />
        <>{children}</>
      </Box>
    </>
  );
}
