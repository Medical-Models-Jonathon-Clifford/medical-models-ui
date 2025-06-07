import * as React from 'react';
import Base from '../../features/base/Base';
import ThemeRegistry from '../../features/base/ThemeRegistry';

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
      <ThemeRegistry options={{key: 'css', prepend: true}}>
        <Base>{children}</Base>
      </ThemeRegistry>
      </body>
    </html>
  );
}
