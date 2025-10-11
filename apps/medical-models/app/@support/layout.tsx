import { SupportBody } from '../../features/base/SupportBody';
import { ReactNode } from 'react';

export default function SupportLayout({ children }: { children: ReactNode }) {
  return (
    <SupportBody>
      <div>{children}</div>
    </SupportBody>
  );
}
