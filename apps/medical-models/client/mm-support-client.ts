import { mmAxios } from './mm-axios';

export function getTotalCompanyMetrics() {
  return mmAxios.get('/support/companies/metrics');
}

export function getTotalUserMetrics() {
  return mmAxios.get('/support/users/metrics');
}

export function getTotalDocumentMetrics() {
  return mmAxios.get('/support/documents/metrics');
}

export function getTotalCommentMetrics() {
  return mmAxios.get('/support/comments/metrics');
}

export function getModelRankings() {
  return mmAxios.get('/support/models/ranking');
}
