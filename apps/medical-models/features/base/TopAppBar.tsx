import * as React from 'react';
import { NewAppBar } from '../../components/appbar/NewAppBar';
import Box from '@mui/material/Box';
import styles from './TopAppBar.module.scss';

export default function TopAppBar({
  toggleDrawer,
  open,
}: {
  toggleDrawer: () => void;
  open: boolean;
}) {
  return (
    <Box className={styles.top_app_bar_box}>
      <NewAppBar></NewAppBar>
    </Box>
  );
}
