'use client';

import { ReactNode } from 'react';
import { Body } from '../../features/base/Body';
import SupportMenu from '../../features/base/SupportMenu';

export default function SupportLayout({ children }: { children: ReactNode }) {
  return (
    <Body Menu={SupportMenu}>
      <div>{children}</div>
    </Body>
  );
}
