import React, { MouseEventHandler } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DrawerContainer } from './DrawerContainer';
import { DrawerInner } from './DrawerInner';
import {
  colorDrawerButtonHover,
  colorDrawerButtonHoverNotSelect,
} from '../../variables';

export function DrawerButton({
  onClick,
  icon,
  children,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  icon: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <DrawerContainer>
      <Button
        sx={{
          maxWidth: '100%',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '8px',
          paddingLeft: '8px',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: colorDrawerButtonHoverNotSelect,
          },
        }}
        onClick={onClick}
      >
        <DrawerInner>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              color: colorDrawerButtonHover,
            }}
          >
            {icon}
          </Box>
          <Box
            sx={{
              boxSizing: 'border-box',
              flex: 'auto',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '204px',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                margin: 0,
                width: '100%',
                textAlign: 'left',
                color: colorDrawerButtonHover,
              }}
            >
              {children}
            </Typography>
          </Box>
        </DrawerInner>
      </Button>
    </DrawerContainer>
  );
}
