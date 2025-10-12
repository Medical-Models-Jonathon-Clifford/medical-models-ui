'use client';

import { ComponentType, ReactNode, useState } from 'react';
import { Box } from '@mui/material';
import MainStage from './MainStage';
import styles from './Body.module.scss';
import {
  COLLAPSED_SIDE_BAR_WIDTH,
  EXPANDED_SIDE_BAR_WIDTH,
  type SideBarState,
  SideBarToggleButton,
} from './body-side-bar';

export function Body({
  children,
  Menu,
}: {
  children: ReactNode;
  Menu: ComponentType<{ open: boolean; width: number }>;
}) {
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

  return (
    <Box className={styles.base_drawer_and_main_stage}>
      <Menu open={sideBarState === 'expanded'} width={drawerWidth}></Menu>
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
