import * as React from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import { Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { auth } from '../../utils/auth';
import { DEMO_ACCOUNTS } from '../../utils/demo-accounts';
import { SignOut } from '../../features/sign-out/sign-out';
import { SignIn } from '../../features/sign-in/sign-in';

const getProfilePicture = (): string => {
  return DEMO_ACCOUNTS[0].users[0].profilePicture;
};

export default async function UserButton() {
  const session = await auth();

  if (!session?.user) {
    return <SignIn />;
  }

  return (
    <div className="flex items-center gap-2">
      <Typography variant="body1">
        {session.user.email}
      </Typography>
      <SignOut />
      <Avatar src={getProfilePicture()}>
        <FolderIcon />
      </Avatar>
    </div>
  );
}
