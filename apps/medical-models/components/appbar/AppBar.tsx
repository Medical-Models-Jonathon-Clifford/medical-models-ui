import Image from 'next/image';
import Link from 'next/link';
import { Box, Typography, Stack } from '@mui/material';
import { Session } from 'next-auth';
import SignInOut from '../user-button/SignInOut';
import UserInfo from './UserInfo';
import { auth } from '../../auth';
import styles from './AppBar.module.scss';

export async function AppBar() {
  const session: Session | null = await auth();

  return (
    <Box className={styles.app_bar_box}>
      <Link
        className={styles.app_bar_link}
        href={{
          pathname: '/',
        }}
      >
        <Image
          src={`/favicon.png`}
          alt="Profile Icon"
          width={24}
          height={24}
          priority
        />
        <Typography
          variant="h6"
          sx={{
            height: '24px',
            lineHeight: 'normal',
            fontSize: '24px',
          }}
        >
          Medical Models
        </Typography>
      </Link>
      <Stack direction="row">
        <Stack direction="row" columnGap={'8px'}>
          <SignInOut />
          {session && (
            <UserInfo
              name={session.user.fullName}
              givenName={session.user.givenName}
              familyName={session.user.familyName}
              roles={session.user.roles}
              picture={session.user.picture}
            />
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
