'use client'

import * as React from 'react';
import {useEffect, useState} from 'react';
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
import {Alert, FormControlLabel, Stack, TextField} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Paper from "@mui/material/Paper";
import RefreshIcon from '@mui/icons-material/Refresh';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CapaTable from "./CapaTable";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';
import MapIcon from '@mui/icons-material/Map';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import SimpleCapaTable from "./SimpleCapaTable";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function CustomTabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{p: 3}}>{children}</Box>}
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
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h2',
          h2: 'h2',
          h3: 'h2',
          h4: 'h2',
          h5: 'h2',
          h6: 'h2',
          subtitle1: 'h2',
          subtitle2: 'h2',
          body1: 'span',
          body2: 'span',
        },
      },
    },
  },
});

const INCLUDE_DATE_LABEL = "Include data about your current environment, like the browser and page URL. This helps us understand your feedback better.";

const capaPhases = ['Triage', 'Execution', 'Signed Off'];

export default function Capa() {

  const [value, setValue] = useState(0);
  const [capaPage, setCapaPage] = useState('');
  const [capaNumber, setCapaNumber] = useState('');
  const [open, setOpen] = useState(false);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [userAgent, setUserAgent] = useState('');
  const [showEnvironment, setShowEnvironment] = useState(false);
  const [fakeCapaName, setFakeCapaName] = useState('');
  const [fakeCapaPhase, setFakeCapaPhase] = useState('');
  const [simpleCapaData, setSimpleCapaData] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleMapModalOpen = () => setMapModalOpen(true);
  const handleMapModalClose = () => setMapModalOpen(false);

  useEffect(() => {
    setLocation(window.location.href);
    setUserAgent(window.navigator.userAgent);
    setFakeCapaName(faker.hacker.phrase);
    setFakeCapaPhase(faker.helpers.arrayElement(capaPhases));
  }, []);

  const handleClick = async () => {
    const response = await axios.post('http://localhost:8082/capa/search', {capaNumber: capaNumber});
    console.log(response.data);
  }

  const handleDropdownChange = (event: SelectChangeEvent) => {
    setCapaPage(event.target.value as string);
    console.log('Dropdown changed');
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleIcon = (event: React.MouseEvent<HTMLElement>) => {
    console.log('Icon clicked');
  }

  function handleShowEnvironmentClick() {
    setShowEnvironment((prevState) => {
      return !prevState;
    });
  }



  function handleHitDatabase() {
    console.log('Making a post request');
    console.log(capaPhases);
    console.log(faker.helpers.arrayElement(capaPhases));
    axios.post('http://localhost:8082/capa', {name: fakeCapaName, phase: fakeCapaPhase})
      .then((response) => {
        console.log(response);
        return axios.get('http://localhost:8082/capas/all')
      }).then((response) => {
        console.log(response.data);
        setSimpleCapaData(response.data);
    })
  }

  return <>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="My Open CAPAs"/>
          <Tab label="My Tasks"/>
          <Tab label="Register"/>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Button variant="contained" onClick={handleHitDatabase}>Make new CAPA</Button>
        <p>{fakeCapaName}</p>
        <p>{fakeCapaPhase}</p>
        <SimpleCapaTable someOtherData={simpleCapaData}></SimpleCapaTable>
        <h3>View CAPA by CAPA Number</h3>
        <TextField id="outlined-basic" label="Type a CAPA Number" variant="outlined"
                   onChange={event => setCapaNumber(event.target.value)}/>
        <Button variant="contained" onClick={handleClick}>View</Button>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleIcon}
          color="inherit"
        >
          <HelpIcon/>

        </IconButton>
        <FormControl fullWidth>
          <InputLabel id="capa-page-select-label">CAPA Page</InputLabel>
          <Select
            labelId="capa-page-select-label"
            id="capa-page-select"
            value={capaPage}
            label="CapaPage"
            onChange={handleDropdownChange}
          >
            <MenuItem value={"capaHubPage"}>CAPA Hub Page</MenuItem>
            <MenuItem value={"otherPage"}>Other Page</MenuItem>
            <MenuItem value={"otherOtherPage"}>Other Other Page</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained">View Document</Button>
        <Paper elevation={3}>
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
              <RefreshIcon/>

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
              <FileDownloadIcon/>

            </IconButton>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleIcon}
              color="inherit"
            >
              <HelpIcon/>

            </IconButton>
          </Stack>
          <CapaTable></CapaTable>
        </Paper>
        <Paper elevation={3}>
          <h2>My Open CAPA Summary</h2>
        </Paper>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
      <button className={styles.feedbackButton} onClick={handleOpen}>
        Provide Feedback
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            CAPA Management Tool Feedback
          </Typography>
          <Alert severity="info">
            <p>Please provide feedback below. This information will be captured in the CAPA Backlog for review by the
              CAP System Owner.</p>
            <p>Please check the box to include data about your current environment to help us understand the context
              of your feedback better.</p>
            <p>If you would like to include a screenshot with your feedback, please save it into a file (e.g. into a
              Word document) and attach it below.</p>
          </Alert>
          <TextField id="feedback-summary" label="Summary" variant="outlined" required/>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            defaultValue="Default Value"
          />
          <div>
            <label htmlFor="avatar">Attach file </label>

            <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" multiple={true}/>
          </div>
          <TextField id="feedback-name" label="Name" variant="outlined"/>
          <TextField id="feedback-email" label="Email" variant="outlined"/>
          <Box>
            <FormControlLabel
              control={<Checkbox />}
              label={INCLUDE_DATE_LABEL}
              onClick={handleShowEnvironmentClick}/>
          </Box>
          <p>What is included in the data about my current environment?</p>
          {showEnvironment && <div>
            <p>*Location*: {location}</p>
            <p>*User-Agent*: {userAgent}</p>
          </div>}
          <Button variant="contained">Submit</Button>
          <Button>Close</Button>
        </Box>
      </Modal>

      <button className={styles.mapButton} onClick={handleMapModalOpen}>
        <MapIcon/>
      </button>
      <Modal
        open={mapModalOpen}
        onClose={handleMapModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Map Modal
          </Typography>
        </Box>
      </Modal>
  </>;
}
