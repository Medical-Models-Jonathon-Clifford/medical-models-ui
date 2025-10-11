import { Body } from '../../../features/base/Body';

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
