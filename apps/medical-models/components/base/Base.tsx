'use client';

import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { darkTheme } from '../../app/darkTheme';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MainStage from './MainStage';
import DrawerMenu from './DrawerMenu';
import TopAppBar from './TopAppBar';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Base({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true);

  const toggleDrawer: () => void = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <TopAppBar toggleDrawer={toggleDrawer} open={open}></TopAppBar>
        <DrawerMenu toggleDrawer={toggleDrawer} open={open}></DrawerMenu>
        <MainStage>
          {children}
        </MainStage>
      </Box>
    </ThemeProvider>
  );
}
