'use client';

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import TopAppBar from './TopAppBar';
import styles from './Base.module.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Body } from './Body';

const queryClient = new QueryClient();

export default function Base({ children }: { children: React.ReactNode }) {

  return (
    <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <Box className={styles.base_box}>
          <TopAppBar/>
          <Body>{children}</Body>
        </Box>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
