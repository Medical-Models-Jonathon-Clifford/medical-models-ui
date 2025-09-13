import List from '@mui/material/List';
import React from 'react';
import { NewDrawer } from '../../components/drawer/NewDrawer';
import { Stack } from '@mui/material';
import { DrawerLink } from './DrawerLink';
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
            <DrawerLink href="/" icon={<DashboardOutlinedIcon />}>
              Support Dashboard
            </DrawerLink>
            <DrawerLink href="/companies" icon={<LocationCityOutlinedIcon />}>
              Manage Companies
            </DrawerLink>
            <DrawerLink href="/users" icon={<PeopleOutlineOutlinedIcon />}>
              Manage All Users
            </DrawerLink>
            <Divider component="li" />
          </Stack>
        </List>
      )}
    </NewDrawer>
  );
}
