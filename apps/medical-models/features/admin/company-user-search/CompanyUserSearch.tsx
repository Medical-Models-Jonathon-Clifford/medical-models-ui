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
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { searchCompanyUsers } from '../../../client/mm-admin-client';

type ViewCompanyState = 'loading' | 'loaded';

type UserSearchResult = {
  id: string;
  name: string;
  email: string;
};

export function CompanyUserSearch() {
  const [totalCompanyMetrics, setTotalCompanyMetrics] = useState<
    UserSearchResult[] | undefined
  >(undefined);
  const [viewCompanyState, setViewCompanyState] =
    useState<ViewCompanyState>('loading');
  const [locationStateFilter, setLocationStateFilter] = React.useState('');
  const [nameSearchTerm, setNameSearchTerm] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange = (event: SelectChangeEvent) => {
    setLocationStateFilter(event.target.value);
  };

  async function fetchCompanyData() {
    setViewCompanyState('loading');
    const userResponse = await searchCompanyUsers(nameSearchTerm);
    setTotalCompanyMetrics(userResponse.data);
    setViewCompanyState('loaded');
  }

  useEffect(() => {
    fetchCompanyData();
  }, [locationStateFilter, nameSearchTerm]);

  const handleNameChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = event.target.value;
    console.log('name change: %o', value);
    setNameSearchTerm(value);
  };

  return (
    <>
      <Typography variant="h3">User Search</Typography>
      <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-search">Name</InputLabel>
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
      {viewCompanyState === 'loading' && <p>Loading...</p>}
      {viewCompanyState === 'loaded' && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {totalCompanyMetrics?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link href={`/admin/users/${row.id}`}>{row.name}</Link>
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
