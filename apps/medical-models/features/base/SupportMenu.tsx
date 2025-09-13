import List from '@mui/material/List';
import React from 'react';
import { NewDrawer } from '../../components/drawer/NewDrawer';
import { Stack } from '@mui/material';
import { DrawerButton } from './DrawerButton';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import Divider from '@mui/material/Divider';

export default function SupportMenu({
  open,
  width,
}: {
  open: boolean;
  width: number;
}) {
  return (
    <NewDrawer width={width}>
      {open && (
        <List component="nav">
          <Stack direction="column">
            <DrawerButton href="/" icon={<DashboardOutlinedIcon />}>
              Support Dashboard
            </DrawerButton>
            <DrawerButton href="/companies" icon={<LocationCityOutlinedIcon />}>
              Manage Companies
            </DrawerButton>
            <DrawerButton href="/users" icon={<PeopleOutlineOutlinedIcon />}>
              Manage All Users
            </DrawerButton>
            <Divider component="li" />
          </Stack>
        </List>
      )}
    </NewDrawer>
  );
}
