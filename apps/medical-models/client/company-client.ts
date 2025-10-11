import { mmAxios } from './mm-axios';

export function getCompany(companyId: string) {
  return mmAxios.get(`/companies/${companyId}`);
}
