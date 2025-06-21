import * as React from 'react';
import { AdminBody } from '../../../../features/base/AdminBody';
import { Box } from '@mui/material';
import { auth } from '../../../../utils/auth';
import { Forbidden } from '../../../../features/forbidden/Forbidden';
import styles from './layout.module.scss';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return (
      <Box className={styles.base_drawer_and_main_stage}>
        <h1>Not authenticated</h1>
      </Box>
    );
  }

  if (!session.user.roles.includes('ROLE_ADMIN')) {
    return (
      <Box className={styles.base_drawer_and_main_stage}>
        <Forbidden />
      </Box>
    );
  }

  return (
    <AdminBody>
      <h1>Admin</h1>
      <div>{children}</div>
    </AdminBody>
  );
}
