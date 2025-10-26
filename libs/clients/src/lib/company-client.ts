import { mmAxios } from './mm-axios';
import { ViewCompanyDetailsDto } from '@mm/types';
import { AxiosResponse } from 'axios';

export function getCompany(
  companyId: string
): Promise<AxiosResponse<ViewCompanyDetailsDto>> {
  return mmAxios.get(`/companies/${companyId}`);
}
