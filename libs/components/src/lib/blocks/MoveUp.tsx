import { IconButton, Tooltip } from '@mui/material';
import { ArrowUpwardOutlined as ArrowUpwardOutlinedIcon } from '@mui/icons-material';
import { MouseEventHandler } from 'react';

export function MoveUp({ onClick }: { onClick: MouseEventHandler }) {
  return (
    <Tooltip title="Move up">
      <IconButton aria-label="up" onClick={onClick}>
        <ArrowUpwardOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
}
