import { IconButton, Tooltip } from '@mui/material';
import { EditOutlined as EditOutlinedIcon } from '@mui/icons-material';
import { MouseEventHandler } from 'react';

export function EditBlock({ onClick }: { onClick: MouseEventHandler }) {
  return (
    <Tooltip title="Edit block">
      <IconButton aria-label="edit" onClick={onClick}>
        <EditOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
}
