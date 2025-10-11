import { UserDetails } from '../../../../../../features/user/user-details/UserDetails';

export default function Page({ params }: { params: { id: string } }) {
  return <UserDetails userId={params.id}></UserDetails>;
}
