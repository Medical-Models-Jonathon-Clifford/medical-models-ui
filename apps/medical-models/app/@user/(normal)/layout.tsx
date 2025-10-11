'use client';

import { ReactNode } from 'react';
import { Body } from '../../../features/base/Body';
import '../../global.css';
import DrawerMenu from '../../../features/base/DrawerMenu';

export default function UserLayout({ children }: { children: ReactNode }) {
  return <Body Menu={DrawerMenu}>{children}</Body>;
}
