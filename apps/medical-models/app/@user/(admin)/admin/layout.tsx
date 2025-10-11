import { ReactNode } from 'react';
import { auth } from '../../../../auth';
import { Forbidden } from '../../../../features/forbidden/Forbidden';
import { Body } from '../../../../features/base/Body';
import '../../../global.css';

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user.roles.includes('ROLE_ADMIN')) {
    return (
      <Body>
        <Forbidden />
      </Body>
    );
  }

  return (
    <Body>
      <div>{children}</div>
    </Body>
  );
}
