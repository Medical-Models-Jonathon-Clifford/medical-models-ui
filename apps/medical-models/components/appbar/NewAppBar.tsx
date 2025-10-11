import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import Link from 'next/link';
import { Session } from 'next-auth';
import SignInOut from '../user-button/SignInOut';
import UserInfo from './UserInfo';
import { auth } from '../../auth';
import styles from './NewAppBar.module.scss';

export async function NewAppBar() {
  const session: Session | null = await auth();

  return (
    <Box className={styles.new_app_bar_box}>
      <Link
        className={styles.new_app_bar_link}
        href={{
          pathname: '/',
        }}
      >
        <Image src={`/favicon.png`} alt="Profile Icon" width={24} height={24} />
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
