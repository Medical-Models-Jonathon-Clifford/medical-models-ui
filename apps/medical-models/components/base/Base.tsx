'use client';

import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MainStage from './MainStage';
import DrawerMenu from './DrawerMenu';
import TopAppBar from './TopAppBar';
import { useState } from 'react';

const defaultTheme = createTheme();

export default function Base({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  const toggleDrawer: () => void = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
