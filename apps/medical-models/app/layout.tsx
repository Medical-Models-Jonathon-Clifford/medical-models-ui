import * as React from 'react';
import Base from '../component/base/Base';

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
      <body>
        <Base>{children}</Base>
      </body>
    </html>
  );
}
