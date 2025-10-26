import React from 'react';
import { List } from '@mui/material';
import { useSession } from 'next-auth/react';
import { Drawer } from '@mm/components/server';
import { AdminItems } from './AdminItems';
import { ROLE_ADMIN } from '../../constants/roles';
import { DocumentTree } from './DocumentTree';

export default function DrawerMenu({
  open,
  width,
}: {
  open: boolean;
  width: number;
}) {
  const { data: session } = useSession();

  const isAdmin = session?.user?.roles.includes(ROLE_ADMIN);

  return (
    <Drawer width={width}>
      {open && (
        <List component="nav">
          {isAdmin && <AdminItems />}
          <DocumentTree></DocumentTree>
        </List>
      )}
    </Drawer>
  );
}
