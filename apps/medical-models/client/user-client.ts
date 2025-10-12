import { mmAxios } from './mm-axios';
import { ViewUserDetails } from '../features/user/user-details/UserDetails';
import { AxiosResponse } from 'axios';

export function getUserDetails(
  userId: string
): Promise<AxiosResponse<ViewUserDetails>> {
  return mmAxios.get(`/users/${userId}/details`);
}
