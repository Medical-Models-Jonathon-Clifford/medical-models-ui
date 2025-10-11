import { ViewImageProps } from '../../../types/block';
import { Box, Paper } from '@mui/material';
import Image from 'next/image';

export function ReadOnlyImage({ filename }: ViewImageProps) {
  return (
    <Paper elevation={3} variant="outlined" sx={{ padding: '8px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          width: '100%',
          height: '200px',
          position: 'relative',
        }}
      >
        <Image
          fill={true}
          style={{ objectFit: 'contain' }}
          src={`/images/${filename}`}
          alt={`Image of ${filename}`}
        />
      </Box>
    </Paper>
  );
}
