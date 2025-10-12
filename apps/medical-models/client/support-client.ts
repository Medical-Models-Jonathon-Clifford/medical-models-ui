import { mmAxios } from './mm-axios';
import {
  CompanySearchResult,
  ModelRanking,
  TotalResourceMetrics,
  UserSearchResult,
} from '../types/dashboard';
import { AxiosResponse } from 'axios';

export function getTotalCompanyMetrics(): Promise<
  AxiosResponse<TotalResourceMetrics>
> {
  return mmAxios.get('/support/companies/metrics');
}

export function getTotalUserMetrics(): Promise<
  AxiosResponse<TotalResourceMetrics>
> {
  return mmAxios.get('/support/users/metrics');
}

export function getTotalDocumentMetrics(): Promise<
  AxiosResponse<TotalResourceMetrics>
> {
  return mmAxios.get('/support/documents/metrics');
}

export function getTotalCommentMetrics(): Promise<
  AxiosResponse<TotalResourceMetrics>
> {
  return mmAxios.get('/support/comments/metrics');
}

export function getModelRankings(): Promise<AxiosResponse<ModelRanking[]>> {
  return mmAxios.get('/support/models/ranking');
}

export function searchCompanies(
  locationStateFilter: string,
  nameSearchTerm: string
): Promise<AxiosResponse<CompanySearchResult[]>> {
  return mmAxios.post('/support/companies/search', {
    locationStateFilter: locationStateFilter,
    nameSearchTerm: nameSearchTerm,
  });
}

export function searchUsers(
  nameSearchTerm: string
): Promise<AxiosResponse<UserSearchResult[]>> {
  return mmAxios.post('/support/users/search', {
    nameSearchTerm: nameSearchTerm,
  });
}
