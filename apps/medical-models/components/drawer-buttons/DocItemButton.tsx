import { ReactNode } from 'react';
import { Button } from '@mui/material';
import { DrawerContainer } from './DrawerContainer';
import { colorDrawerButtonHoverNotSelect } from '../../variables';

export const DocItemButton = ({
  isSelected,
  paddingLeft,
  href,
  children,
}: {
  isSelected: () => boolean;
  paddingLeft: string;
  href: string;
  children: ReactNode;
}) => {
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
          '& .more_actions': {
            display: 'none',
          },
          '&:hover .more_actions': {
            display: 'block',
          },
          paddingLeft: paddingLeft,
          backgroundColor: isSelected()
            ? 'rgba(25, 118, 210, 0.1)'
            : 'transparent',
          ':hover': {
            backgroundColor: isSelected()
              ? 'rgba(25, 118, 210, 0.2)'
              : colorDrawerButtonHoverNotSelect,
          },
        }}
        href={href}
      >
        {children}
      </Button>
    </DrawerContainer>
  );
};
