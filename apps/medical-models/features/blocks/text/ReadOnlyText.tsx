import { ViewTextProps } from '../../../types/block';
import { Box, Paper, Typography } from '@mui/material';
import * as React from 'react';

export function ReadOnlyText({ text }: ViewTextProps) {
  return (
    <Paper elevation={3} variant="outlined" sx={{ padding: '8px' }}>
      <Box sx={{ display: 'flex', gap: '8px' }}>
        <Typography variant="body1">{text}</Typography>
      </Box>
    </Paper>
  );
}
