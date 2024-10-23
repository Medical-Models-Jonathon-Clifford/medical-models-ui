'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import {Stack, TextField} from "@mui/material";
import {useState} from "react";
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFnsV3';
import {enUS} from 'date-fns/locale';
import {LocalizationProvider} from "@mui/x-date-pickers";
import Typography from "@mui/material/Typography";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import styles from "../../Base.module.scss";
import Button from "@mui/material/Button";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

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

type CapaPriority = 'low' | 'medium' | 'high';

export default function NewCapa() {

  const [capaName, setCapaName] = useState('');
  const [capaPriority, setCapaPriority] = useState('low');
  const [owner, setOwner] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setCapaPriority(event.target.value as string);
  };

  const handleFileUpload = (event) => {
    console.log(event.target.files);
    setUploadedFiles(Array.from(event.target.files));
  };

  return <>
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enUS}>
        <CssBaseline/>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Typography variant="h4">New CAPA</Typography>
          <Stack direction="row">
            <Stack>
              <Typography variant="body1">CAPA Name</Typography>
              <TextField id="outlined-basic" label="CAPA Name" variant="outlined"
                         onChange={event => setCapaName(event.target.value)}/>
            </Stack>
            <Stack>
              <Typography variant="body1">Date Raised</Typography>
              <DesktopDatePicker/>
            </Stack>
            <Stack>
              <Typography variant="body1">Priority</Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={capaPriority}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={'low'}>Low</MenuItem>
                  <MenuItem value={'medium'}>Medium</MenuItem>
                  <MenuItem value={'high'}>High</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Stack>
              <Typography variant="body1">Owner</Typography>
              <TextField id="owner-input" label="Owner" variant="outlined"
                         onChange={event => setOwner(event.target.value)}/>
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="body1">CAPA Description</Typography>
            <TextField id="description-input" label="Description" variant="outlined"
                       onChange={event => setDescription(event.target.value)}/>
          </Stack>
          <Stack direction="row">
            <Stack>
              <Button
                component="label"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileUpload}
                  multiple
                />
              </Button>
              <ul>
                {uploadedFiles.map((file) =>
                  <li>{file.name} - {file.type}</li>
                )}
              </ul>
            </Stack>
          </Stack>
          <Button variant="contained">Create CAPA</Button>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  </>;
}
