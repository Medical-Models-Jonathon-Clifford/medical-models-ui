import { Box, BoxProps } from '@mui/material';
import styles from './Drawer.module.scss';

type DrawerProps = BoxProps & {
  width: number;
};

export function Drawer({ width, ...props }: DrawerProps) {
  return (
    <Box
      className={styles.drawer_box}
      sx={{
        width: width,
      }}
      {...props}
    ></Box>
  );
}
