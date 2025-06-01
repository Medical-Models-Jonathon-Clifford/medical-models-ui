import { signOut } from '../../utils/auth';

export function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button className="w-full p-0">Sign Out</button>
    </form>
  );
}
