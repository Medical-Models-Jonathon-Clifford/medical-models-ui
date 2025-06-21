import * as React from 'react';
import { SupportBody } from '../../features/base/SupportBody';

export default async function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SupportBody>
      <h1>Support</h1>
      <div>{children}</div>
    </SupportBody>
  );
}
