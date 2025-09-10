import { signOut } from '../../auth';
import { cookies } from 'next/headers'

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
            redirect: true
          }
        );
      }}
    >
      <button>Sign Out</button>
    </form>
  );
}
