import { ViewTextProps } from '@mm/types';
import { Box, Typography } from '@mui/material';
import { BlockPaper } from '@mm/components/server';

export function ReadOnlyText({ text }: ViewTextProps) {
  return (
    <BlockPaper>
      <Box sx={{ display: 'flex', gap: '8px' }}>
        <Typography variant="body1">{text}</Typography>
      </Box>
    </BlockPaper>
  );
}
