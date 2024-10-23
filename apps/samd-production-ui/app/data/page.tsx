'use client'

import * as React from 'react';
import styles from './page.module.scss';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HelpIcon from '@mui/icons-material/Help';
import {Stack, TextField} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Paper from "@mui/material/Paper";
import RefreshIcon from '@mui/icons-material/Refresh';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CapaTable from "./CapaTable";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import axios from 'axios';
import {useState} from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Capa() {

  const [value, setValue] = React.useState(0);
  const [age, setAge] = React.useState('');
  const [capaNumber, setCapaNumber] = useState('');

  const handleClick = async () => {
    const response = await axios.post('http://localhost:8082/capa/search', {capaNumber: capaNumber});
    console.log(response.data);
  }

  const handleDropdownChange = (event: SelectChangeEvent) => {
    console.log('Dropdown changed');
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleIcon = (event: React.MouseEvent<HTMLElement>) => {
    console.log('Icon clicked');
  }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
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
              <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                CAPA Dashboard
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleIcon}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Button color="inherit">John Smith</Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="My Open CAPAs"  />
            <Tab label="My Tasks"  />
            <Tab label="Register"  />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <h3>View CAPA by CAPA Number</h3>
          <TextField id="outlined-basic" label="Type a CAPA Number" variant="outlined" onChange={event => setCapaNumber(event.target.value)}/>
          <Button variant="contained" onClick={handleClick}>View</Button>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleIcon}
            color="inherit"
          >
            <HelpIcon />

          </IconButton>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleDropdownChange}
            >
              <MenuItem value={10}>CAPA Hub Page</MenuItem>
              <MenuItem value={20}>Other Page</MenuItem>
              <MenuItem value={30}>Other Other Page</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained">View Document</Button>
          <Paper elevation={3} >
            <h2>My Open CAPA's</h2>
            <Stack direction={'row'}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleIcon}
                color="inherit"
              >
                <RefreshIcon />

              </IconButton>
              <p>Refresh</p>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleIcon}
                color="inherit"
              >
                <FileDownloadIcon />

              </IconButton>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleIcon}
                color="inherit"
              >
                <HelpIcon />

              </IconButton>
            </Stack>
            <CapaTable></CapaTable>
          </Paper>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </ThemeProvider>
    </>
  );
}
