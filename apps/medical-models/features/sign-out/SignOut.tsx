import { signOut } from '../../utils/auth';

export function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button>Sign Out</button>
    </form>
  );
}
