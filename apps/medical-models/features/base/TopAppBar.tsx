import { AppBar } from '../../components/appbar/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { ProfileIcon } from '../../components/profile-icon/ProfileIcon';

export default function TopAppBar({
  toggleDrawer,
  open,
}: {
  toggleDrawer: () => void;
  open: boolean;
}) {
  return (
    <AppBar position="absolute" open={open}>
      <Toolbar sx={{ pr: '24px' /* keep right padding when drawer closed */ }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Medical Models
        </Typography>
        <IconButton color="inherit">
          <ProfileIcon size={24} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
