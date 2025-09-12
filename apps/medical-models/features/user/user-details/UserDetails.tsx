'use client';

import Box from '@mui/material/Box';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { getUserDetails } from '../../../client/mm-user-client';

export type ViewUserDetails = {
  id: string;
  name: string;
  email: string;
  pictureFilename: string;
};

export function UserDetails({ userId }: { userId: string }) {
  const [userDetails, setUserDetails] = useState<
    ViewUserDetails | undefined
  >(undefined);

  useEffect(() => {
    async function fetchCompanyDetails() {
      const userDetailsResponse = await getUserDetails(userId);
      setUserDetails(userDetailsResponse.data);
    }

    fetchCompanyDetails();
  }, []);

  return (
    <Box>
      {userDetails && userDetails.pictureFilename && (
        <Box>
          <Typography variant="h2">{userDetails?.name}</Typography>
          <Stack direction="row" style={{gap: '16px'}}>
            <Stack direction="column">
              <Typography variant="body1">
                Name:{' '}
                <Typography display="inline" fontWeight={'bold'}>
                  {userDetails?.name}
                </Typography>
              </Typography>
              <Typography variant="body1">
                Email:{' '}
                <Typography display="inline" fontWeight={'bold'}>
                  {userDetails?.email}
                </Typography>
              </Typography>
            </Stack>
            <Box
              style={{
                width: 200,
                height: 200,
                borderWidth: 1,
                borderStyle: 'solid',
              }}
            >
              <img
                width={198}
                height={198}
                src={`/users/picture/${userDetails?.pictureFilename}`}
                alt={'Company logo'}
              />
            </Box>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
