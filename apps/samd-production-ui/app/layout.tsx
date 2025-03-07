import * as React from 'react';
import Base from './Base';
import styles from './layout.module.scss';

export const metadata = {
  title: 'Brutalist',
  description: 'A dashboard for everything',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={styles.body}>
      <Base>{children}</Base>
      </body>
    </html>
  )
}
