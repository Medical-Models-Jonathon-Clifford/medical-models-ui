import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { SaveOutlined as SaveOutlinedIcon } from '@mui/icons-material';

export function SaveBlock(props: IconButtonProps) {
  return (
    <Tooltip title="Save block">
      <IconButton aria-label="save" {...props}>
        <SaveOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
}
