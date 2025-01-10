import { Drawer } from '../drawer/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import { MouseEventHandler, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DocumentNode, NavTreeDocItem } from './NavTreeDocItem';
import { stubNavTreeDocs } from './stub-docs';
import axios from 'axios';


export default function DrawerMenu({ toggleDrawer, open }: { toggleDrawer: () => void, open: boolean }) {
  const [navTreeDocs, setNavTreeDocs] = useState<DocumentNode[]>(stubNavTreeDocs);
  const router = useRouter();

  useEffect(() => {
    axios.get('http://localhost:8081/documents/all/navigation')
      .then(r => {
        console.log(r.data);
        setNavTreeDocs(r.data);
      })
  }, []);

  const clickCreateNewDocument: MouseEventHandler<HTMLDivElement> = () => {
    console.log('Clicked create new document');
    axios.post('http://localhost:8081/documents/new')
      .then(r => {
        console.log(r.data);
        router.push('/document/' + r.data.id + '/edit');
      })
      .catch(e => {
        console.log(e);
      });
  }

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
        <ListItemButton onClick={() => router.push('/')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        {navTreeDocs.map((docInfo) =>
          <NavTreeDocItem key={docInfo.id} docInfo={docInfo}></NavTreeDocItem>)}
        <ListItemButton onClick={clickCreateNewDocument}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Create new document" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
