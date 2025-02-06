import { Drawer } from '../drawer/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import { MouseEventHandler, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DocumentNode, NavTreeDocItem } from './NavTreeDocItem';
import { stubNavTreeDocs } from './stub-docs';
import { getAllNavigation, newDocument } from '../../client/mm-document-client';
import { Box, Skeleton } from '@mui/material';
import styles from './DrawerMenu.module.scss';

type DrawerMenuState = 'loading' | 'ready';

export default function DrawerMenu({
  toggleDrawer,
  open,
}: {
  toggleDrawer: () => void;
  open: boolean;
}) {
  const [drawerMenuState, setDrawerMenuState] =
    useState<DrawerMenuState>('loading');
  const [navTreeDocs, setNavTreeDocs] =
    useState<DocumentNode[]>(stubNavTreeDocs);
  const router = useRouter();

  useEffect(() => {
    async function fetchAllNavigation() {
      const response = await getAllNavigation();
      setNavTreeDocs(response.data);
      setDrawerMenuState('ready');
    }

    fetchAllNavigation();
  }, []);

  const clickCreateNewDocument: MouseEventHandler<
    HTMLDivElement
  > = async () => {
    try {
      const r = await newDocument();
      router.push('/document/' + r.data.id + '/edit');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <List component="nav">
        <ListItemButton onClick={() => router.push('/')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        {drawerMenuState === 'loading' && (
          <Box className={styles.loading_box}>
            <Skeleton
              variant="text"
              animation="wave"
              className={styles.parent_skeleton}
            />
            <Skeleton
              variant="text"
              animation="wave"
              className={styles.child_skeleton}
            />
            <Skeleton
              variant="text"
              animation="wave"
              className={styles.child_skeleton}
            />
            <Skeleton
              variant="text"
              animation="wave"
              className={styles.parent_skeleton}
            />
            <Skeleton
              variant="text"
              animation="wave"
              className={styles.child_skeleton}
            />
          </Box>
        )}
        {drawerMenuState === 'ready' &&
          navTreeDocs.map((docInfo) => (
            <NavTreeDocItem key={docInfo.id} docInfo={docInfo}></NavTreeDocItem>
          ))}
        <ListItemButton onClick={clickCreateNewDocument}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Create new document" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
