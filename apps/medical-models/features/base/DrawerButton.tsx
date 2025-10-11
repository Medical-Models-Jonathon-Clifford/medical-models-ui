import React, { MouseEventHandler } from 'react';
import { Box, Button, Typography } from '@mui/material';
import styles from './DrawerButton.module.scss';

export function DrawerButton({
  onClick,
  icon,
  children,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  icon: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <Box className={styles.nav_tree_doc_item_box}>
      <Button className={styles.nav_tree_doc_item_button} onClick={onClick}>
        <Box className={styles.nav_tree_doc_item_icon_text_box}>
          <Box className={styles.nav_tree_doc_item_icon_box}>{icon}</Box>
          <Box className={styles.nav_tree_doc_item_text_box}>
            <Typography
              variant="body1"
              className={styles.nav_tree_doc_item_text}
            >
              {children}
            </Typography>
          </Box>
        </Box>
      </Button>
    </Box>
  );
}
