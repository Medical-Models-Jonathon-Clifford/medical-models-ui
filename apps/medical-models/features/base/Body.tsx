'use client';

import styles from './Base.module.scss';
import DrawerMenu from './DrawerMenu';
import MainStage from './MainStage';
import Box from '@mui/material/Box';
import * as React from 'react';
import { memo, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  appBarHeight,
  borderColorLayoutLines,
  colorBackground,
  colorPrimary,
} from '../../variables';

type SideBarState = 'expanded' | 'collapsed';

const EXPANDED_SIDE_BAR_WIDTH = 340;
const COLLAPSED_SIDE_BAR_WIDTH = 20;
const TOGGLE_BUTTON_WIDTH = 24;

export function Body({ children }: { children: React.ReactNode }) {
  const [drawerWidth, setDrawerWidth] = useState(EXPANDED_SIDE_BAR_WIDTH);
  const [sideBarState, setSideBarState] = useState<SideBarState>('expanded');

  const handleClickCollapse = () => {
    setSideBarState('collapsed');
    setDrawerWidth(COLLAPSED_SIDE_BAR_WIDTH);
  };

  const handleClickExpand = () => {
    setSideBarState('expanded');
    setDrawerWidth(EXPANDED_SIDE_BAR_WIDTH);
  };

  const createToggleButton = (icon: React.ReactNode) => {
    return function ToggleButton({
      title,
      onClick,
    }: {
      title: string;
      onClick: () => void;
    }) {
      return (
        <Tooltip title={title} placement="right">
          <ListItemButton
            onClick={onClick}
            sx={{
              position: 'fixed',
              left: drawerWidth - TOGGLE_BUTTON_WIDTH / 2,
              top: '88px',
              borderColor: borderColorLayoutLines,
              backgroundColor: 'white',
              borderStyle: 'solid',
              borderWidth: '1px',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              padding: 0,
              '&:hover': {
                backgroundColor: colorPrimary,
                svg: {
                  fill: colorBackground,
                },
              },
            }}
          >
            <ListItemIcon
              sx={{ width: TOGGLE_BUTTON_WIDTH, minWidth: TOGGLE_BUTTON_WIDTH }}
            >
              {icon}
            </ListItemIcon>
          </ListItemButton>
        </Tooltip>
      );
    };
  };

  const CollapseToggleButton = memo(createToggleButton(<ChevronLeftIcon />));
  const ExpandToggleButton = memo(createToggleButton(<ChevronRightIcon />));

  return (
    <Box className={styles.base_drawer_and_main_stage}>
      <DrawerMenu
        open={sideBarState === 'expanded'}
        width={drawerWidth}
      ></DrawerMenu>
      {sideBarState === 'expanded' && (
        <CollapseToggleButton title="Collapse" onClick={handleClickCollapse} />
      )}
      {sideBarState === 'collapsed' && (
        <ExpandToggleButton title="Expand" onClick={handleClickExpand} />
      )}
      <MainStage drawerWidth={drawerWidth}>{children}</MainStage>
    </Box>
  );
}
