import * as React from 'react';
import Typography from '@mui/material/Typography';
import { auth } from '../../utils/auth';
import { SignOut } from '../../features/sign-out/SignOut';
import { SignIn } from '../../features/sign-in/SignIn';
import Box from '@mui/material/Box';

export default async function UserButton() {
  const session = await auth();

  if (!session?.user) {
    return <SignIn />;
  }

  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="body1" align={'center'}>
        {session.user.email}
      </Typography>
      <SignOut />
    </Box>
  );
}
