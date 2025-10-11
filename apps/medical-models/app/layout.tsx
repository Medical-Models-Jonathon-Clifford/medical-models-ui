import * as React from 'react';
import { redirect } from 'next/navigation';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import ThemeRegistry from '../features/base/ThemeRegistry';
import Providers from './providers';
import { auth } from '../auth';
import Base from '../features/base/Base';
import './global.css';

export const metadata = {
  title: 'Medical Models',
  description: 'Create Medical Models',
};

const Core = async ({
  support,
  user,
}: {
  support: React.ReactNode;
  user: React.ReactNode;
  admin: React.ReactNode;
  children: React.ReactNode;
}) => {
  const session: Session | null = await auth();

  if (!session) {
    redirect('/api/auth/signin');
  }

  if (session && session.user?.roles.includes('ROLE_SUPPORT')) {
    return <Base>{support}</Base>;
  }

  return <Base>{user}</Base>;
};

export default async function RootLayout({
  user,
  support,
  children,
}: {
  user: React.ReactNode;
  support: React.ReactNode;
  children: React.ReactNode;
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
            <Providers>
              <Core support={support} admin={undefined} user={user}>
                {children}
              </Core>
            </Providers>
          </SessionProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
