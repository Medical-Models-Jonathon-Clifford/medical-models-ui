import React, { MouseEventHandler } from 'react';
import { IconButton, Tooltip } from '@mui/material';

export const SquareIconButton = ({
  title,
  onClick,
  children,
}: {
  title?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}) => {
  const iconButton = (
    <IconButton
      sx={{
        borderRadius: '4px',
        width: '24px',
        height: '24px',
        fontSize: '8px',
        flex: 'none',
        ':hover': {
          backgroundColor: 'rgba(202,202,202,0.4)',
        },
      }}
      onClick={onClick}
    >
      {children}
    </IconButton>
  );

  if (title) {
    return <Tooltip title={title}>{iconButton}</Tooltip>;
  } else {
    return iconButton;
  }
};
