import { IconButton, Tooltip } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { MouseEventHandler } from 'react';

export function DeleteBlock({ onClick }: { onClick: MouseEventHandler }) {
  return (
    <Tooltip title="Delete block">
      <IconButton aria-label="delete" onClick={onClick}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}
