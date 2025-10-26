import { mmAxios } from './mm-axios';
import { AxiosResponse } from 'axios';
import { ViewUserDetails } from '@mm/types';

export function getUserDetails(
  userId: string
): Promise<AxiosResponse<ViewUserDetails>> {
  return mmAxios.get(`/users/${userId}/details`);
}
