import { UserDetails } from '../../../../features/user/UserDetails';

export default function Page({ params }: { params: { id: string } }) {
  return <UserDetails userId={params.id}></UserDetails>;
}
