import * as React from 'react';
import Base from '../../features/base/Base';
import ThemeRegistry from '../../features/base/ThemeRegistry';
import Providers from '../providers';
import Posts from './posts/posts';

export const metadata = {
  title: 'Medical Models',
  description: 'Create Medical Models',
};

export default function RootLayout({
  children,
}: {
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
          <Providers>
            <Base>{children}</Base>
          </Providers>
        </ThemeRegistry>
      </body>
    </html>
  );
}
