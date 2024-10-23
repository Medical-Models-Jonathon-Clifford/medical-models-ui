'use client'

import * as React from "react";
import {ThemeProvider} from "@mui/material/styles";
import {darkTheme} from "./darkTheme";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import styles from './Base.module.scss';

export default function Base({children,}: { children: React.ReactNode }) {
  const handleIcon = (event: React.MouseEvent<HTMLElement>) => {
    console.log('Icon clicked');
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Box sx={{flexGrow: 1, margin: 0, padding: 0}}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{mr: 2}}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" component="div" >
              CAPA Dashboard
            </Typography>
            <Button href={"/capa/new"} variant="contained" className={styles.newPatientButton}>New CAPA</Button>
            <Box sx={{flexGrow: 1}}></Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleIcon}
              color="inherit"
            >
              <AccountCircle/>
            </IconButton>
            <Button color="inherit">John Smith</Button>
          </Toolbar>
        </AppBar>
      </Box>
      {children}
    </ThemeProvider>
  )
}
