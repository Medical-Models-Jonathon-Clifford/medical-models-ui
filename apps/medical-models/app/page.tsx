'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import NewModelSelection from '../components/new-model-selection/NewModelSelection';
import Recent from '../components/recent/Recent';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import { formatRFC3339 } from 'date-fns';
import { MEDICAL_MODELS_SERVICE_BASE_URL } from './constants';

import { User } from '../models/User';

const newFakeUser: User = {
  email: faker.internet.email(),
  profilePicture: '',
  name: faker.person.fullName(),
  created_date: formatRFC3339(new Date()),
  password: 'fakepassword123',
  state: 'ACTIVE'
};

export default function Dashboard() {
  const [fakeUser, setFakeUser] = useState<User | null>(null);

  const handleNewUser = () => {
    axios.post(`${MEDICAL_MODELS_SERVICE_BASE_URL}/user`, fakeUser)
      .then((response) => {
        console.log(response.data);
        return axios.get(`${MEDICAL_MODELS_SERVICE_BASE_URL}/users/${response.data.id}`);
      });
  };

  useEffect(() => {
    setFakeUser(newFakeUser);
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <NewModelSelection fakeUser={fakeUser} handleNewUser={handleNewUser} />
          <Recent />
        </Grid>
      </Container>
    </Box>
  );
}
