import { Box } from '@mui/material';
import { NewAppBar } from '../../components/appbar/NewAppBar';
import styles from './TopAppBar.module.scss';

export default function TopAppBar() {
  return (
    <Box className={styles.top_app_bar_box}>
      <NewAppBar></NewAppBar>
    </Box>
  );
}
