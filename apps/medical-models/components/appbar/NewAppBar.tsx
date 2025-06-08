import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import LogoutIcon from '@mui/icons-material/Logout';
import Image from 'next/image';
import Link from 'next/link';
import { ProfileIcon } from '../profile-icon/ProfileIcon';
import styles from './NewAppBar.module.scss';
import UserButton from '../user-button/UserButton';

export function NewAppBar() {
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
        <Tooltip title="Logout" placement="bottom-start">
          <Link href="/login">
            <IconButton color="inherit">
              <LogoutIcon className={styles.logout_icon} />
            </IconButton>
          </Link>
        </Tooltip>
        <UserButton />
      </Stack>
    </Box>
  );
}
