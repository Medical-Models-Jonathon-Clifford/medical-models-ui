import { Box } from '@mui/material';
import { Circle as CircleIcon } from '@mui/icons-material';
import React from 'react';

export function LeefIcon() {
  return (
    <Box
      sx={{
        borderRadius: '4px',
        width: '24px',
        height: '24px',
        fontSize: '8px',
        flex: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircleIcon sx={{ fontSize: '8px' }} />
    </Box>
  );
}
