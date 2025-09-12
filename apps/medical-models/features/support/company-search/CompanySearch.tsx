'use client';

import * as React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { searchCompanies } from '../../../client/mm-support-client';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

type ViewCompanyState = 'loading' | 'loaded';

type CompanySearchResult = {
  id: string;
  name: string;
  locationState: string;
}

export function CompanySearch() {
  const [totalCompanyMetrics, setTotalCompanyMetrics] = useState<
    CompanySearchResult[] | undefined
  >(undefined);
  const [viewCompanyState, setViewCompanyState] = useState<ViewCompanyState>('loading');
  const [locationStateFilter, setLocationStateFilter] = React.useState('');
  const [nameSearchTerm, setNameSearchTerm] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleChange = (event: SelectChangeEvent) => {
    setLocationStateFilter(event.target.value);
  };

  async function fetchCompanyData() {
    setViewCompanyState('loading');
    const companyResponse = await searchCompanies(locationStateFilter, nameSearchTerm);
    setTotalCompanyMetrics(companyResponse.data);
    setViewCompanyState('loaded');
  }

  useEffect(() => {
    fetchCompanyData();
  }, [locationStateFilter, nameSearchTerm]);

  const handleNameChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const value = event.target.value;
    console.log('name change: %o', value);
    setNameSearchTerm(value);
  }

  return (
    <>
      <Typography variant="h3">Company Search</Typography>
      <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-search">Company</InputLabel>
        <OutlinedInput
          id="outlined-adornment-search"
          type={'text'}
          onChange={handleNameChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? 'hide the password' : 'display the password'
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          label="Search"
        />
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={locationStateFilter}
          label="State"
          onChange={handleChange}
        >
          <MenuItem value={''}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={'ACT'}>ACT</MenuItem>
          <MenuItem value={'NSW'}>NSW</MenuItem>
          <MenuItem value={'NT'}>NT</MenuItem>
          <MenuItem value={'QLD'}>QLD</MenuItem>
          <MenuItem value={'SA'}>SA</MenuItem>
          <MenuItem value={'Tas'}>Tas</MenuItem>
          <MenuItem value={'Vic'}>Vic</MenuItem>
          <MenuItem value={'WA'}>WA</MenuItem>
        </Select>
        <FormHelperText>Filter by State of Australia</FormHelperText>
      </FormControl>
      {viewCompanyState === 'loading' && <p>Loading...</p>}
      {viewCompanyState === 'loaded' && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Company Name</TableCell>
                <TableCell>State</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {totalCompanyMetrics?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link href={`/companies/${row.id}`}>{row.name}</Link>
                  </TableCell>
                  <TableCell>{row.locationState}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
