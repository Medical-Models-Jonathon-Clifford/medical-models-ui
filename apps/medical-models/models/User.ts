export type User = {
  email: string;
  profilePicture: string;
  name: string;
  created_date: string;
  password: string;
  state: 'ACTIVE' | 'LOCKED' | 'ARCHIVED';
}
