import { mmAxios } from './mm-axios';

export function getUserRankingsForDocumentCreation() {
  return mmAxios.get('/admin/users/documents/ranking');
}

export function getUserRankingsForCommentCreation() {
  return mmAxios.get('/admin/users/comments/ranking');
}

export function getCompanyModelRankings() {
  return mmAxios.get('/admin/company/models/ranking');
}

export function getCompanyDocumentMetrics() {
  return mmAxios.get('/admin/company/documents/metrics');
}

export function getCompanyCommentMetrics() {
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
