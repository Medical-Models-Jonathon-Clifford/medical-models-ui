import { signOut } from '../../auth';
import { cookies } from 'next/headers';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  borderColorLayoutLines,
  borderColorLayoutLinesHover,
} from '../../variables';

export function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        // Delete the JSESSIONID cookie to force the authorization-server to
        // show /login page on next login. This is important for Demo usage.
        // Otherwise, it automatically logs in as the previous user.
        cookies().delete('JSESSIONID');
        await signOut({
          redirectTo: '/',
          redirect: true,
        });
      }}
    >
      <Button
        type="submit"
        startIcon={<LogoutIcon />}
        variant="outlined"
        sx={{
          color: 'rgba(0, 0, 0, 0.87)',
          textTransform: 'none',
          borderColor: borderColorLayoutLines,
          padding: '4px 12px',
          '&:hover': {
            backgroundColor: 'rgba(202,202,202,0.2)',
            borderColor: borderColorLayoutLinesHover,
          },
        }}
      >
        Sign Out
      </Button>
    </form>
  );
}
