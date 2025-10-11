import React from 'react';
import { List, Stack, Divider } from '@mui/material';
import {
  DashboardOutlined as DashboardOutlinedIcon,
  LocationCityOutlined as LocationCityOutlinedIcon,
  PeopleOutlineOutlined as PeopleOutlineOutlinedIcon,
} from '@mui/icons-material';
import { NewDrawer } from '../../components/drawer/NewDrawer';
import { DrawerLink } from './DrawerLink';

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
