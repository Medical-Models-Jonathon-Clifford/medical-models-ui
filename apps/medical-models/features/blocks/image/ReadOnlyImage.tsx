import { ViewImageProps } from '@mm/types';
import { Box } from '@mui/material';
import Image from 'next/image';
import { BlockPaper } from '@mm/components/server';

export function ReadOnlyImage({ filename }: ViewImageProps) {
  return (
    <BlockPaper>
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
    </BlockPaper>
  );
}
