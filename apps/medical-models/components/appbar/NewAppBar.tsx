import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import Link from 'next/link';
import { Session } from 'next-auth';
import { ProfileIcon } from '../profile-icon/ProfileIcon';
import SignInOut from '../user-button/SignInOut';
import { auth } from '../../utils/auth';
import styles from './NewAppBar.module.scss';
import UserInfo from './UserInfo';

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
        <Tooltip title="John Smith" placement="bottom-start">
          <IconButton color="inherit">
            <ProfileIcon size={24} />
          </IconButton>
        </Tooltip>
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
