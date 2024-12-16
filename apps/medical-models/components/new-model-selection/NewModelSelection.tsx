import * as React from 'react';
import Title from '../title/Title';
import { EditDielectric } from '../blocks/dielectric/DielectricPropsBodyTissues';
import { EditDrugHalfLife } from '../blocks/drug-half-life/DrugHalfLife';
import { User } from '../../models/user';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function NewModelSelection({ fakeUser, handleNewUser }: {
  fakeUser: User | null,
  handleNewUser: () => void
}) {

  return (
    <>
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 450
          }}
        >
          <Title>New Model</Title>
          <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
            <EditDielectric></EditDielectric>
            <EditDrugHalfLife></EditDrugHalfLife>
          </div>
          {/*{fakeUser &&*/}
          {/*  <>*/}
          {/*    <p>Fake user name: {fakeUser.name}</p>*/}
          {/*    <p>Fake user email: {fakeUser.email}</p>*/}
          {/*    <p>Fake user created date: {fakeUser.created_date}</p>*/}
          {/*    <p>Fake user profile picture: {fakeUser.profilePicture}</p>*/}
          {/*    <p>Fake user password: {fakeUser.password}</p>*/}
          {/*    <p>Fake user state: {fakeUser.state}</p>*/}
          {/*    <Button onClick={handleNewUser}>New User</Button>*/}
          {/*  </>*/}
          {/*}*/}
        </Paper>
      </Grid>
    </>
  );
}
