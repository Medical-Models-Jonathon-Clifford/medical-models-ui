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
import { searchUsers } from '../../../client/mm-support-client';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

type ViewCompanyState = 'loading' | 'loaded';

type UserSearchResult = {
  id: string;
  name: string;
  email: string;
};

export function UserSearch() {
  const [totalUserMetrics, setTotalUserMetrics] = useState<
    UserSearchResult[] | undefined
  >(undefined);
  const [viewCompanyState, setViewCompanyState] =
    useState<ViewCompanyState>('loading');
  const [nameSearchTerm, setNameSearchTerm] = React.useState('');

  async function fetchUserData() {
    setViewCompanyState('loading');
    const userResponse = await searchUsers(nameSearchTerm);
    setTotalUserMetrics(userResponse.data);
    setViewCompanyState('loaded');
  }

  useEffect(() => {
    fetchUserData();
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
        <InputLabel htmlFor="name-search-input">Name</InputLabel>
        <OutlinedInput
          id="name-search-input"
          type="text"
          onChange={handleNameChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
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
          <Table sx={{ minWidth: 650 }} aria-label="User search results table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {totalUserMetrics?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link href={`/users/${row.id}`}>{row.name}</Link>
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
