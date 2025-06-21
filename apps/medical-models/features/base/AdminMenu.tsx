import List from '@mui/material/List';
import React from 'react';
import styles from './DrawerMenu.module.scss';
import { NewDrawer } from '../../components/drawer/NewDrawer';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';

const INITIAL_BUTTON_PADDING = 8;
const EXTRA_PADDING_PER_LEVEL = 15;

export default function AdminMenu({
  open,
  width,
}: {
  open: boolean;
  width: number;
}) {
  function getPaddingLeft() {
    return `${INITIAL_BUTTON_PADDING + EXTRA_PADDING_PER_LEVEL}px`;
  }

  const DocItemButton = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => {
    return (
      <Button
        className={styles.nav_tree_doc_item_button}
        sx={{
          paddingLeft: getPaddingLeft(),
          backgroundColor: 'rgba(25, 118, 210, 0.1)',
          ':hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.2)',
          },
        }}
        href={href}
      >
        {children}
      </Button>
    );
  };

  return (
    <NewDrawer width={width}>
      {open && (
        <List component="nav">
          <Stack direction="column">
            <Link href="/">Home</Link>
            <DocItemButton href="/admin/details">
              Organisation Details
            </DocItemButton>
            <DocItemButton href="/admin/users">Users</DocItemButton>
          </Stack>
        </List>
      )}
    </NewDrawer>
  );
}
