import Avatar from '@mui/material/Avatar';
import styles from './ProfileIcon.module.scss';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string, size: number | string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: size,
      height: size,
    },
    children: (
      <span className={styles.avatar_initials}>{`${name.split(' ')[0][0]}${
        name.split(' ')[1][0]
      }`}</span>
    ),
  };
}

export function ProfileIcon({ size = 32 }: { size?: number | string }) {
  return <Avatar {...stringAvatar('John Smith', size)}></Avatar>;
}
