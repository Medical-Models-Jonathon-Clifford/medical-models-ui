import Box from '@mui/material/Box';
import styles from './NewAppBar.module.scss';
import { ProfileIcon } from '../profile-icon/ProfileIcon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import favicon from '../../public/favicon.png';
import Image from 'next/image';
import Link from 'next/link';
import { Tooltip } from '@mui/material';

export function NewAppBar() {
  return (
    <Box className={styles.new_app_bar_box}>
      <Link
        className={styles.new_app_bar_link}
        href={{
          pathname: '/',
        }}
      >
        <Image src={favicon} alt="Profile Icon" width={24} height={24} />
        <Typography variant="h6" className={styles.new_app_bar_title_heading}>
          Medical Models
        </Typography>
      </Link>
      <Tooltip title="John Smith" placement="bottom-start">
        <IconButton color="inherit">
          <ProfileIcon size={24} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
