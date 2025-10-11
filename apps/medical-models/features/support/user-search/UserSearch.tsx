'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import Link from 'next/link';
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
import { searchUsers } from '../../../client/support-client';
import { SimplePageState } from '../../../types/states';

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
    useState<SimplePageState>('loading');
  const [nameSearchTerm, setNameSearchTerm] = useState('');

  useEffect(() => {
    async function fetchUserData() {
      setViewCompanyState('loading');
      const userResponse = await searchUsers(nameSearchTerm);
      setTotalUserMetrics(userResponse.data);
      setViewCompanyState('loaded');
    }
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
