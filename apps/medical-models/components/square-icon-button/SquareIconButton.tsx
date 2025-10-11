import React, { MouseEventHandler } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import styles from './SquareIconButton.module.scss';

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
      className={styles.square_icon_button}
      sx={{
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
