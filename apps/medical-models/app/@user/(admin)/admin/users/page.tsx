import Link from 'next/link';

export default function AdminUsersPage() {
  return (
    <div>
      <h2>Manage Users</h2>
      <p>Search</p>
      <input id="search" type="text" />
      <Link href="/admin/users/new">New User</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John</td>
            <td>Admin</td>
          </tr>
          <tr>
            <td>Jane</td>
            <td>User</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
