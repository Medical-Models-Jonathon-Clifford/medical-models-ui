import * as React from 'react';
import Title from '../../components/title/Title';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function Recent() {
  return (
    <>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 450,
          }}
        >
          <Title>Recent Models</Title>
          <div></div>
        </Paper>
      </Grid>
    </>
  );
}
