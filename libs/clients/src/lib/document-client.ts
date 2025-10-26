import { mmAxios } from './mm-axios';
import { AxiosResponse } from 'axios';
import { Document, DocumentNode } from '@mm/types';

export function updateDocument(
  id: string,
  title: string | null,
  body: string | null,
  state: string
): Promise<AxiosResponse<Document>> {
  return mmAxios.put(`/documents/${id}`, {
    title: title,
    body: body,
    state: state,
  });
}

export function getDocument(docId: string): Promise<AxiosResponse<Document>> {
  return mmAxios.get(`/documents/${docId}`);
}

export function newDocument() {
  return mmAxios.post(`/documents/new`);
}

export function newDocumentWithParent(parentId: string) {
  return mmAxios.post(`/documents/new?parentId=${parentId}`);
}

export function getAllNavigation(): Promise<AxiosResponse<DocumentNode[]>> {
  return mmAxios.get(`/documents/all/navigation`);
}

export function postImage(form: HTMLFormElement) {
  const formData = new FormData(form);
  return mmAxios.post(`/images`, formData);
}
