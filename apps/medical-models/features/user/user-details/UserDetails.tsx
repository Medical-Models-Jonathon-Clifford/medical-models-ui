import Image from 'next/image';
import { Box, Stack, Typography } from '@mui/material';
import { getUserDetails } from '../../../client/mm-user-client';

export type ViewUserDetails = {
  id: string;
  name: string;
  email: string;
  pictureFilename: string;
};

export async function UserDetails({ userId }: { userId: string }) {
  const userDetailsResponse = await getUserDetails(userId);
  const userDetails: ViewUserDetails = userDetailsResponse.data;

  return (
    <Box>
      {userDetails && userDetails.pictureFilename && (
        <Box>
          <Typography variant="h2">{userDetails?.name}</Typography>
          <Stack direction="row" style={{ gap: '16px' }}>
            <Stack direction="column">
              <Typography variant="body1">
                Name:{' '}
                <span className="important_text">{userDetails?.name}</span>
              </Typography>
              <Typography variant="body1">
                Email:{' '}
                <span className="important_text">{userDetails?.email}</span>
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
              <Image
                width={198}
                height={198}
                src={`/users/picture/${userDetails?.pictureFilename}`}
                alt={'Company logo'}
                priority
              />
            </Box>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
