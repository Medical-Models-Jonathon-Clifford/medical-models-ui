import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import ThemeRegistry from '../features/base/ThemeRegistry';
import { auth } from '@mm/auth';
import Base from '../features/base/Base';
import { LOGIN_URL } from '@mm/config';
import './global.css';
import { ROLE_SUPPORT } from '../constants/roles';

export const metadata = {
  title: 'Medical Models',
  description: 'Create Medical Models',
};

const Core = async ({
  support,
  user,
}: {
  support: ReactNode;
  user: ReactNode;
}) => {
  const session: Session | null = await auth();

  if (!session) {
    redirect(LOGIN_URL);
  }

  if (session && session.user?.roles.includes(ROLE_SUPPORT)) {
    return <Base>{support}</Base>;
  }

  return <Base>{user}</Base>;
};

export default async function RootLayout({
  user,
  support,
}: {
  user: ReactNode;
  support: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/favicon.png"
          type="image/png"
          sizes="<generated>"
        />
      </head>
      <body>
        <ThemeRegistry options={{ key: 'css', prepend: true }}>
          <SessionProvider>
            <Core support={support} user={user}></Core>
          </SessionProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
