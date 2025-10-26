import { Avatar } from '@mui/material';
import styles from './ProfileIcon.module.scss';
import { stringToColor } from '@mm/utils';

export function ProfileIcon({
  givenName,
  familyName,
  size = 32,
}: {
  givenName: string;
  familyName: string;
  size?: number | string;
}) {
  return (
    <Avatar
      sx={{
        backgroundColor: stringToColor(`${givenName} ${familyName}`),
        width: size,
        height: size,
      }}>
      <span className={styles.avatar_initials}>
        {`${givenName[0]}${familyName[0]}`}
      </span>
    </Avatar>
  );
}
