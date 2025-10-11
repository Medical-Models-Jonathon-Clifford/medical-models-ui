import { ReactNode } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { AppBar } from '../../components/appbar/AppBar';
import styles from './Base.module.scss';

export default function Base({ children }: { children: ReactNode }) {
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
