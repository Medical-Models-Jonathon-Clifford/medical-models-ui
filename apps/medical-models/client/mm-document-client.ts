import { mmAxios } from './mm-axios';

export function updateDocument(
  id: string,
  title: string | null,
  body: string | null,
  state: string
) {
  return mmAxios.put(`/documents/${id}`, {
    id: id,
    title: title,
    body: body,
    state: state,
  });
}

export function getDocument(docId: string) {
  return mmAxios.get(`/documents/${docId}`);
}

export function newDocument() {
  return mmAxios.post(`/documents/new`);
}

export function newDocumentWithParent(parentId: string) {
  return mmAxios.post(`/documents/new?parentId=${parentId}`);
}

export function getAllNavigation() {
  return mmAxios.get(`/documents/all/navigation`);
}
