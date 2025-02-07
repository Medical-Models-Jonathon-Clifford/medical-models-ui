import * as React from 'react';
import Title from '../../components/title/Title';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function NewModelSelection() {
  return (
    <>
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 450,
          }}
        >
          <Title>Create New Document</Title>
        </Paper>
      </Grid>
    </>
  );
}
