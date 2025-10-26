import { auth } from '@mm/auth';
import { SignOut } from './SignOut';
import { SignIn } from './SignIn';

export default async function SignInOut() {
  const session = await auth();

  if (!session?.user) {
    return <SignIn />;
  }

  return <SignOut />;
}
