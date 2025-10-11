'use client';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { ProfileIcon } from '../profile-icon/ProfileIcon';
import Tooltip from '@mui/material/Tooltip';

const READABLE_ROLES: Record<string, string> = {
  ROLE_ADMIN: 'Admin',
  ROLE_USER: 'User',
  ROLE_SUPPORT: 'Support',
};

const chooseReadableRole = (role: string): string => {
  return READABLE_ROLES[role];
};

export default function UserInfo({
  name,
  givenName,
  familyName,
  roles,
  picture,
}: {
  name: string;
  givenName: string;
  familyName: string;
  roles: string[];
  picture: string | undefined;
}) {
  return (
    <Tooltip
      title={`${name} - ${chooseReadableRole(roles[0])}`}
      placement="bottom"
    >
      <Box
        sx={{
          marginRight: '8px',
        }}
      >
        <ListItemAvatar
          sx={{
            minWidth: 'auto',
          }}
        >
          <Avatar src={picture}>
            <ProfileIcon
              givenName={givenName}
              familyName={familyName}
              size={'100%'}
            />
          </Avatar>
        </ListItemAvatar>
      </Box>
    </Tooltip>
  );
}
