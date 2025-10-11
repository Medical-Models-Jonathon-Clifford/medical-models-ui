import React from 'react';
import { Body } from '../../../features/base/Body';
import '../../global.css';

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Body>{children}</Body>
    </>
  );
}
