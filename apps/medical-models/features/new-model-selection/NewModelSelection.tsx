import Title from '../../components/title/Title';
import { Grid, Paper } from '@mui/material';

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
