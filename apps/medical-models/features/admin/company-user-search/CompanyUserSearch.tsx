'use client';

import * as React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import Link from 'next/link';
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
  const [nameSearchTerm, setNameSearchTerm] = useState('');
  const [showPassword, setShowPassword] = useState(true);

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

  async function fetchCompanyData() {
    setViewCompanyState('loading');
    const userResponse = await searchCompanyUsers(nameSearchTerm);
    setTotalCompanyMetrics(userResponse.data);
    setViewCompanyState('loaded');
  }

  useEffect(() => {
    fetchCompanyData();
  }, [nameSearchTerm]);

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
