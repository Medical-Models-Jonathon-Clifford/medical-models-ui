import { Drawer } from '../drawer/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import GrainIcon from '@mui/icons-material/Grain';
import ListItemText from '@mui/material/ListItemText';
import ShareIcon from '@mui/icons-material/Share';
import * as React from 'react';

export default function DrawerMenu({toggleDrawer, open}: {toggleDrawer: () => void, open: boolean}) {

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1]
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <List component="nav">
        <ListItemButton>
          <ListItemIcon>
            <GrainIcon />
          </ListItemIcon>
          <ListItemText primary="My Models" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <ShareIcon />
          </ListItemIcon>
          <ListItemText primary="Shared with Me" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
