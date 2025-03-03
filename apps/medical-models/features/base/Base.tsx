'use client';

import * as React from 'react';
import { memo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MainStage from './MainStage';
import DrawerMenu from './DrawerMenu';
import TopAppBar from './TopAppBar';
import { lightTheme } from './light-theme';
import styles from './Base.module.scss';
import { useParams } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type SideBarState = 'expanded' | 'collapsed';

const EXPANDED_SIDE_BAR_WIDTH = 340;
const COLLAPSED_SIDE_BAR_WIDTH = 20;
const TOGGLE_BUTTON_WIDTH = 24;

const queryClient = new QueryClient();

export default function Base({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const [drawerWidth, setDrawerWidth] = useState(EXPANDED_SIDE_BAR_WIDTH);
  const [sideBarState, setSideBarState] = useState<SideBarState>('expanded');
  const params = useParams();

  const toggleDrawer: () => void = () => {
    setOpen(!open);
  };

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
            className={styles.base_collapse_icon}
            sx={{
              left: drawerWidth - TOGGLE_BUTTON_WIDTH / 2,
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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Box className={styles.base_box}>
          <TopAppBar toggleDrawer={toggleDrawer} open={open}></TopAppBar>
          <Box className={styles.base_drawer_and_main_stage}>
            <DrawerMenu
              toggleDrawer={toggleDrawer}
              open={sideBarState === 'expanded'}
              width={drawerWidth}
              selectedDocId={String(params.id)}
            ></DrawerMenu>
            {sideBarState === 'expanded' && (
              <CollapseToggleButton
                title="Collapse"
                onClick={handleClickCollapse}
              />
            )}
            {sideBarState === 'collapsed' && (
              <ExpandToggleButton title="Expand" onClick={handleClickExpand} />
            )}
            <MainStage drawerWidth={drawerWidth}>{children}</MainStage>
          </Box>
        </Box>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
