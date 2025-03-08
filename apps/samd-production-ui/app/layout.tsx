import * as React from 'react';
import Base from './Base';
import styles from './layout.module.scss';

export const metadata = {
  title: 'SaMD Production UI',
  description: 'Engine for SaMD Production',
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
      <body className={styles.body}>
        <Base>{children}</Base>
      </body>
    </html>
  );
}
