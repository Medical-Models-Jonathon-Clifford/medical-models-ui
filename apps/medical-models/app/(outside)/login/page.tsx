import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { auth } from '../../../utils/auth';
import UserButton from '../../../components/user-button/UserButton';
import Image from 'next/image';
import Typography from '@mui/material/Typography';

export default async function Login() {
  const session = await auth();

  return (
    <Box sx={{ display: 'flex' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h2" align={'center'}>
              Who will you treat today?
            </Typography>
            <UserButton />
            <pre className="whitespace-pre-wrap break-all px-4 py-6">
              {JSON.stringify(session, null, 2)}
            </pre>
            <Image
              src="/doctor-bioimpedance-1.png"
              width={500}
              height={500}
              alt="Doctor having his mind blown by how awesome this application is."
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
