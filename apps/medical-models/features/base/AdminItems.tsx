import { DrawerLink } from './DrawerLink';
import {
  AdminPanelSettingsOutlined as AdminPanelSettingsOutlinedIcon,
  DashboardOutlined as DashboardOutlinedIcon,
  PeopleOutlineOutlined as PeopleOutlineOutlinedIcon,
} from '@mui/icons-material';
import { Divider } from '@mui/material';
import React from 'react';

export function AdminItems() {
  return (
    <>
      <DrawerLink href="/admin" icon={<DashboardOutlinedIcon />}>
        Admin Dashboard
      </DrawerLink>
      <DrawerLink
        href="/admin/details"
        icon={<AdminPanelSettingsOutlinedIcon />}
      >
        Company Details
      </DrawerLink>
      <DrawerLink href="/admin/users" icon={<PeopleOutlineOutlinedIcon />}>
        Manage Users
      </DrawerLink>
      <Divider component="li" />
    </>
  );
}
