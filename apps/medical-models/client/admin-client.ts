import { mmAxios } from './mm-axios';
import { AxiosResponse } from 'axios';
import {
  ModelRanking,
  NamedUserRanking,
  TotalResourceMetrics,
} from '../types/dashboard';

export function getUserRankingsForDocumentCreation(): Promise<
  AxiosResponse<NamedUserRanking[]>
> {
  return mmAxios.get('/admin/users/documents/ranking');
}

export function getUserRankingsForCommentCreation(): Promise<
  AxiosResponse<NamedUserRanking[]>
> {
  return mmAxios.get('/admin/users/comments/ranking');
}

export function getCompanyModelRankings(): Promise<
  AxiosResponse<ModelRanking[]>
> {
  return mmAxios.get('/admin/company/models/ranking');
}

export function getCompanyDocumentMetrics(): Promise<
  AxiosResponse<TotalResourceMetrics>
> {
  return mmAxios.get('/admin/company/documents/metrics');
}

export function getCompanyCommentMetrics(): Promise<
  AxiosResponse<TotalResourceMetrics>
> {
  return mmAxios.get('/admin/company/comments/metrics');
}

export function searchCompanyUsers(nameSearchTerm: string) {
  return mmAxios.post('/admin/companies/users/search', {
    nameSearchTerm: nameSearchTerm,
  });
}

export function getCompanyDetails() {
  return mmAxios.get('/admin/company/details');
}
