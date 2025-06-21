import * as React from 'react';
import { auth } from '../../utils/auth';
import { SignOut } from '../../features/sign-out/SignOut';
import { SignIn } from '../../features/sign-in/SignIn';

export default async function SignInOut() {
  const session = await auth();

  if (!session?.user) {
    return <SignIn />;
  }

  return <SignOut />;
}
