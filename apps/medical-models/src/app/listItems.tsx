import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GrainIcon from '@mui/icons-material/Grain';
import ShareIcon from '@mui/icons-material/Share';

export const mainListItems = (
  <React.Fragment>
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
  </React.Fragment>
);
