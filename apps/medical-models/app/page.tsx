'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import NewModelSelection from '../component/new-model-selection/NewModelSelection';
import Recent from '../component/recent/Recent';
import { Stack } from '@mui/material';

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Stack spacing={3}>
          <NewModelSelection />
          <Recent />
        </Stack>
      </Container>
    </Box>
  );
}
