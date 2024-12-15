import { ViewTextProps } from '../../../models/blocks';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export function ViewText({ text }: ViewTextProps) {
  return (
    <Paper elevation={3} variant="outlined" sx={{ padding: '8px' }}>
      <Box sx={{ display: 'flex', gap: '8px' }}>
        <Typography variant="body1">{text}</Typography>
      </Box>
    </Paper>
  );
}
