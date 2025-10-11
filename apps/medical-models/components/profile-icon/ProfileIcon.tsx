import { Avatar } from '@mui/material';
import styles from './ProfileIcon.module.scss';
import { stringToColor } from '../../utils/str-to-color';

function stringAvatar(
  givenName: string,
  familyName: string,
  size: number | string
) {
  return {
    sx: {
      backgroundColor: stringToColor(`${givenName} ${familyName}`),
      width: size,
      height: size,
    },
    children: (
      <span
        className={styles.avatar_initials}
      >{`${givenName[0]}${familyName[0]}`}</span>
    ),
  };
}

export function ProfileIcon({
  givenName,
  familyName,
  size = 32,
}: {
  givenName: string;
  familyName: string;
  size?: number | string;
}) {
  return <Avatar {...stringAvatar(givenName, familyName, size)}></Avatar>;
}
