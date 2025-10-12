'use client';

import { ReactNode } from 'react';
import { Forbidden } from '../../../../features/forbidden/Forbidden';
import { Body } from '../../../../features/base/Body';
import '../../../global.css';
import DrawerMenu from '../../../../features/base/DrawerMenu';
import { useSession } from 'next-auth/react';
import { Typography } from '@mui/material';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Body Menu={DrawerMenu}>
        <Typography>Loading…</Typography>
      </Body>
    );
  }

  if (!session.user.roles.includes('ROLE_ADMIN')) {
    return (
      <Body Menu={DrawerMenu}>
        <Forbidden />
      </Body>
    );
  }

  return (
    <Body Menu={DrawerMenu}>
      <div>{children}</div>
    </Body>
  );
}
