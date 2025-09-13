import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NavTreeDocItem } from './NavTreeDocItem';
import { stubNavTreeDocs } from './stub-docs';
import { getAllNavigation, newDocument } from '../../client/mm-document-client';
import styles from './DrawerMenu.module.scss';
import { NewDrawer } from '../../components/drawer/NewDrawer';
import { DocumentNode } from '../../types/document';
import Divider from '@mui/material/Divider';
import { DrawerButton } from './DrawerButton';
import { useSession } from 'next-auth/react';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';

type DrawerMenuState = 'loading' | 'ready';

export default function DrawerMenu({
  open,
  width,
}: {
  open: boolean;
  width: number;
}) {
  const [drawerMenuState, setDrawerMenuState] =
    useState<DrawerMenuState>('loading');
  const [navTreeDocs, setNavTreeDocs] =
    useState<DocumentNode[]>(stubNavTreeDocs);
  const router = useRouter();
  const { data: session } = useSession();

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
    <NewDrawer width={width}>
      {open && (
        <List component="nav">
          {session?.user?.roles.includes('ROLE_ADMIN') && (
            <>
              <DrawerButton href="/admin" icon={<DashboardOutlinedIcon />}>
                Admin Dashboard
              </DrawerButton>
              <DrawerButton href="/admin/details" icon={<AdminPanelSettingsOutlinedIcon />}>
                Company Details
              </DrawerButton>
              <DrawerButton href="/admin/users" icon={<PeopleOutlineOutlinedIcon />}>
                Manage Users
              </DrawerButton>
              <Divider component="li" />
            </>
          )}
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
              <NavTreeDocItem
                key={docInfo.id}
                docInfo={docInfo}
              ></NavTreeDocItem>
            ))}
          <ListItemButton onClick={clickCreateNewDocument}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Create new document" />
          </ListItemButton>
        </List>
      )}
    </NewDrawer>
  );
}
