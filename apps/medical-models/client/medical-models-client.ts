import axios from 'axios';
import { MEDICAL_MODELS_SERVICE_BASE_URL } from '../app/constants';

export function updateDocument(id: string, title: string | null, body: string | null, state: string) {
  return axios.put(`${MEDICAL_MODELS_SERVICE_BASE_URL}/documents/${id}`, {
    id: id,
    title: title,
    body: body,
    state: state
  });
}

export function getDocument(docId: string) {
  return axios.get(`${MEDICAL_MODELS_SERVICE_BASE_URL}/documents/${docId}`);
}

export function newDocument() {
  return axios.post(`${MEDICAL_MODELS_SERVICE_BASE_URL}/documents/new`);
}

export function newDocumentWithParent(parentId: string) {
  return axios.post(`${MEDICAL_MODELS_SERVICE_BASE_URL}/documents/new?parentId=${parentId}`);
}

export function getAllNavigation() {
  return axios.get(`${MEDICAL_MODELS_SERVICE_BASE_URL}/documents/all/navigation`);
}

export function deleteCommentById(commentId: string) {
  return axios.delete(`${MEDICAL_MODELS_SERVICE_BASE_URL}/comments/${commentId}`);
}

export function getCommentsForDocument(documentId: string) {
  return axios.get(`${MEDICAL_MODELS_SERVICE_BASE_URL}/comments/documents/${documentId}`);
}

export function editCommentById(commentId: string, newText: string) {
  return axios.put(`${MEDICAL_MODELS_SERVICE_BASE_URL}/comments/${commentId}`, {
    body: newText
  });
}

export function saveNewComment(documentId: string, newCommentText: string) {
  return axios.post(`${MEDICAL_MODELS_SERVICE_BASE_URL}/comments`, {
    documentId: documentId,
    body: newCommentText,
    creator: '1'
  });
}

export function saveNewReplyComment(documentId: string, newCommentText: string,  parentCommentId: string) {
  return axios.post(`${MEDICAL_MODELS_SERVICE_BASE_URL}/comments`, {
    documentId: documentId,
    body: newCommentText,
    creator: '1',
    parentCommentId: parentCommentId
  });
}
