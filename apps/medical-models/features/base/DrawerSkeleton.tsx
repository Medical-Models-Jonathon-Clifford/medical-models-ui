import { Box, Skeleton } from '@mui/material';
import styles from './DrawerSkeleton.module.scss';
import React from 'react';

const Parent = () => (
  <Skeleton
    variant="text"
    animation="wave"
    className={styles.parent_skeleton}
  />
);

const Child = () => (
  <Skeleton variant="text" animation="wave" className={styles.child_skeleton} />
);

export function DrawerSkeleton() {
  return (
    <Box className={styles.loading_box}>
      <Parent />
      <Child />
      <Child />
      <Parent />
      <Child />
    </Box>
  );
}
