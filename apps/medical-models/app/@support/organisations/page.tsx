import Link from 'next/link';

export default async function SupportUsersPage() {
  return (
    <div>
      <h2>Support Organisations</h2>
      <Link href="/organisations/new">New Organisation</Link>
      <table>
        <tbody>
        <tr>
          <td>Downtown Doctors</td>
          <td><Link href={'/organisations/1'}>Edit</Link></td>
        </tr>
        <tr>
          <td>New Calgary Medical Centre</td>
          <td><Link href={'/organisations/1'}>Edit</Link></td>
        </tr>
        <tr>
          <td>Summer Institute</td>
          <td><Link href={'/organisations/1'}>Edit</Link></td>
        </tr>
        <tr>
          <td>Sly Stallone University Teaching Hospital</td>
          <td><Link href={'/organisations/1'}>Edit</Link></td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}
