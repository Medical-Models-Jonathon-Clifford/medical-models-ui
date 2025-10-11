import React, { MouseEventHandler, useEffect, useState } from 'react';
import { Box, Skeleton, List, Divider } from '@mui/material';
import {
  Add as AddIcon,
  DashboardOutlined as DashboardOutlinedIcon,
  AdminPanelSettingsOutlined as AdminPanelSettingsOutlinedIcon,
  PeopleOutlineOutlined as PeopleOutlineOutlinedIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { NavTreeDocItem } from './NavTreeDocItem';
import { stubNavTreeDocs } from './stub-docs';
import { getAllNavigation, newDocument } from '../../client/mm-document-client';
import { NewDrawer } from '../../components/drawer/NewDrawer';
import { DocumentNode } from '../../types/document';
import { DrawerLink } from './DrawerLink';
import { DrawerButton } from './DrawerButton';
import styles from './DrawerMenu.module.scss';

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
    HTMLButtonElement
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
              <DrawerLink href="/admin" icon={<DashboardOutlinedIcon />}>
                Admin Dashboard
              </DrawerLink>
              <DrawerLink
                href="/admin/details"
                icon={<AdminPanelSettingsOutlinedIcon />}
              >
                Company Details
              </DrawerLink>
              <DrawerLink
                href="/admin/users"
                icon={<PeopleOutlineOutlinedIcon />}
              >
                Manage Users
              </DrawerLink>
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
          <DrawerButton onClick={clickCreateNewDocument} icon={<AddIcon />}>
            Create new document
          </DrawerButton>
        </List>
      )}
    </NewDrawer>
  );
}
