'use client';

import { ComponentType, ReactNode, useState } from 'react';
import { Box } from '@mui/material';
import MainStage from './MainStage';
import {
  COLLAPSED_SIDE_BAR_WIDTH,
  EXPANDED_SIDE_BAR_WIDTH,
  SideBarToggleButton,
} from './SideBarToggleButton';
import { appBarHeight } from '@mm/tokens';
import { COLLAPSED, EXPANDED, SideBarState } from '@mm/types';

export function Body({
  children,
  Menu,
}: {
  children: ReactNode;
  Menu: ComponentType<{ open: boolean; width: number }>;
}) {
  const [drawerWidth, setDrawerWidth] = useState(EXPANDED_SIDE_BAR_WIDTH);
  const [sideBarState, setSideBarState] = useState<SideBarState>(EXPANDED);

  const handleClickCollapse = () => {
    setSideBarState(COLLAPSED);
    setDrawerWidth(COLLAPSED_SIDE_BAR_WIDTH);
  };

  const handleClickExpand = () => {
    setSideBarState(EXPANDED);
    setDrawerWidth(EXPANDED_SIDE_BAR_WIDTH);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        top: appBarHeight,
        height: `calc(100vh - ${appBarHeight})`,
      }}
    >
      <Menu open={sideBarState === EXPANDED} width={drawerWidth}></Menu>
      <SideBarToggleButton
        drawerWidth={drawerWidth}
        sideBarState={sideBarState}
        onClickCollapse={handleClickCollapse}
        onClickExpand={handleClickExpand}
      />
      <MainStage drawerWidth={drawerWidth}>{children}</MainStage>
    </Box>
  );
}
