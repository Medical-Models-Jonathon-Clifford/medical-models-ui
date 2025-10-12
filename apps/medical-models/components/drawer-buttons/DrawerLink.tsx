'use client';

import { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import { DocItemButton } from './DocItemButton';
import { colorDrawerButtonHover, colorPrimary } from '../../variables';
import { DrawerInner } from './DrawerInner';

export function DrawerLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: ReactNode;
  children?: ReactNode;
}) {
  const pathname = usePathname();

  const isSelected = () => pathname === href;

  return (
    <DocItemButton isSelected={isSelected} paddingLeft="8px" href={href}>
      <DrawerInner>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            color: isSelected()
              ? 'rgba(25, 118, 210, 1)'
              : 'rgba(0, 0, 0, 0.87)',
          }}
        >
          {icon}
        </Box>
        <Box
          sx={{
            width: '204px',
            boxSizing: 'border-box',
            flex: 'auto',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              margin: 0,
              width: '100%',
              textAlign: 'left',
              color: isSelected() ? colorPrimary : colorDrawerButtonHover,
            }}
          >
            {children}
          </Typography>
        </Box>
      </DrawerInner>
    </DocItemButton>
  );
}
