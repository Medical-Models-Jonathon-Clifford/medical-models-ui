import { SupportBody } from '../../features/base/SupportBody';

export default async function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SupportBody>
      <div>{children}</div>
    </SupportBody>
  );
}
