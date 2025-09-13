'use client';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { ProfileIcon } from '../profile-icon/ProfileIcon';
import styles from './UserInfo.module.scss';
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
  roles,
  picture,
}: {
  name: string;
  roles: string[];
  picture: string | undefined;
}) {
  return (
    <Tooltip
      title={`${name} - ${chooseReadableRole(roles[0])}`}
      placement="bottom"
    >
      <Box className={styles.user_info_box}>
        <ListItemAvatar className={styles.user_info_avatar}>
          <Avatar src={picture}>
            <ProfileIcon size={'100%'} />
          </Avatar>
        </ListItemAvatar>
      </Box>
    </Tooltip>
  );
}
