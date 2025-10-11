'use client';

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import styles from './DrawerLink.module.scss';
import { usePathname } from 'next/navigation';

export function DrawerLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
}) {
  const pathname = usePathname();

  const DocItemButton = ({ children }: { children: React.ReactNode }) => {
    return (
      <Button
        className={styles.nav_tree_doc_item_button}
        sx={{
          paddingLeft: '8px',
          backgroundColor:
            pathname === href ? 'rgba(25, 118, 210, 0.1)' : 'transparent',
          ':hover': {
            backgroundColor:
              pathname === href
                ? 'rgba(25, 118, 210, 0.2)'
                : 'rgba(202,202,202,0.2)',
          },
        }}
        href={href}
      >
        {children}
      </Button>
    );
  };

  return (
    <Box className={styles.nav_tree_doc_item_box}>
      <DocItemButton>
        <Box className={styles.nav_tree_doc_item_icon_text_box}>
          <Box
            className={styles.nav_tree_doc_item_icon_box}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              color:
                pathname === href
                  ? 'rgba(25, 118, 210, 1)'
                  : 'rgba(0, 0, 0, 0.87)',
            }}
          >
            {icon}
          </Box>
          <Box
            sx={{ width: '204px' }}
            className={styles.nav_tree_doc_item_text_box}
          >
            <Typography
              variant="body1"
              className={styles.nav_tree_doc_item_text}
              sx={{
                color:
                  pathname === href
                    ? 'rgba(25, 118, 210, 1)'
                    : 'rgba(0, 0, 0, 0.87)',
              }}
            >
              {children}
            </Typography>
          </Box>
        </Box>
      </DocItemButton>
    </Box>
  );
}
