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
        <Typography variant="h6" className={styles.new_app_bar_title_heading}>
          Medical Models
        </Typography>
      </Link>
      <Stack direction="row">
        <Stack direction="row">
          <SignInOut />
          {session && (
            <UserInfo
              name={session.user.fullName}
              roles={session.user.roles}
              email={session.user.email}
              expires={session.expires}
              picture={session.user.picture}
            />
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
