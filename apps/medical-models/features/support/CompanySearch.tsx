'use client';

import * as React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
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
import { searchCompanies } from '@mm/clients';
import {
  CompanySearchResult,
  LOADED,
  loading,
  SimplePageState,
} from '@mm/types';

export function CompanySearch() {
  const [companies, setCompanies] = useState<CompanySearchResult[] | undefined>(
    undefined
  );
  const [viewCompanyState, setViewCompanyState] =
    useState<SimplePageState>(loading);
  const [locationStateFilter, setLocationStateFilter] = useState('');
  const [nameSearchTerm, setNameSearchTerm] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setLocationStateFilter(event.target.value);
  };

  useEffect(() => {
    async function fetchCompanyData() {
      setViewCompanyState(loading);
      const companyResponse = await searchCompanies(
        locationStateFilter,
        nameSearchTerm
      );
      setCompanies(companyResponse.data);
      setViewCompanyState(LOADED);
    }
    fetchCompanyData();
  }, [locationStateFilter, nameSearchTerm]);

  const handleNameChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = event.target.value;
    setNameSearchTerm(value);
  };

  return (
    <>
      <Typography variant="h3">Company Search</Typography>
      <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
        <InputLabel htmlFor="company-name-search">Company</InputLabel>
        <OutlinedInput
          id="company-name-search"
          type={'text'}
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
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="location-state-select-input">State</InputLabel>
        <Select
          labelId="location-state-select-input"
          id="location-state-select"
          value={locationStateFilter}
          label="State"
          onChange={handleChange}
        >
          <MenuItem value={''}>
            <em>None</em>
          </MenuItem>
          {['ACT', 'NSW', 'NT', 'QLD', 'SA', 'Tas', 'Vic', 'WA'].map(
            (state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            )
          )}
        </Select>
        <FormHelperText>Filter by State of Australia</FormHelperText>
      </FormControl>
      {viewCompanyState === loading && <p>Loading...</p>}
      {viewCompanyState === LOADED && (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="Company search result table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Company Name</TableCell>
                <TableCell>State</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companies?.map((row) => (
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
