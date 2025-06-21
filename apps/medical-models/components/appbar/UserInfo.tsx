'use client';

import * as React from 'react';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Popover } from '@mui/material';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import IconButton from '@mui/material/IconButton';
import { ProfileIcon } from '../profile-icon/ProfileIcon';

export default function UserInfo({
  name,
  roles,
  email,
  expires,
  picture,
}: {
  name: string;
  roles: string[];
  email: string;
  expires: string;
  picture: string | undefined;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <ListItemAvatar>
          <Avatar src={picture}>
            <ProfileIcon size={'100%'} />
          </Avatar>
        </ListItemAvatar>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>Name: {name}</Typography>
        <Typography sx={{ p: 2 }}>Roles: {roles}</Typography>
        <Typography sx={{ p: 2 }}>Email: {email}</Typography>
        <Typography sx={{ p: 2 }}>Session Expires: {expires}</Typography>
      </Popover>
    </div>
  );
}
