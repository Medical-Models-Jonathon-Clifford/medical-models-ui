import React from 'react';
import { Box } from '@mui/material';
import { auth } from '../../../../auth';
import { Forbidden } from '../../../../features/forbidden/Forbidden';
import styles from './layout.module.scss';
import { Body } from '../../../../features/base/Body';
import '../../../global.css';

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
      <Body>
        <div>
          <Forbidden />
        </div>
      </Body>
    );
  }

  return (
    <Body>
      <div>{children}</div>
    </Body>
  );
}
