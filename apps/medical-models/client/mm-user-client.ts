import { mmAxios } from './mm-axios';

export function getUserDetails(userId: string) {
  return mmAxios.get(`/users/${userId}/details`);
}
