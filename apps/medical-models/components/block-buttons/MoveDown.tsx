import { IconButton, Tooltip } from '@mui/material';
import { ArrowDownwardOutlined as ArrowDownwardOutlinedIcon } from '@mui/icons-material';
import { MouseEventHandler } from 'react';

export function MoveDown({ onClick }: { onClick: MouseEventHandler }) {
  return (
    <Tooltip title="Move down">
      <IconButton aria-label="down" onClick={onClick}>
        <ArrowDownwardOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
}
