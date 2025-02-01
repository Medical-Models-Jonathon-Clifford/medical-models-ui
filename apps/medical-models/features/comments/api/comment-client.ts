import { mmAxios } from '../../../client/mm-axios';

export function deleteCommentById(commentId: string) {
  return mmAxios.delete(`/comments/${commentId}`);
}

export function getCommentsForDocument(documentId: string) {
  return mmAxios.get(`/comments/documents/${documentId}`);
}

export function editCommentById(commentId: string, newText: string) {
  return mmAxios.put(`/comments/${commentId}`, {
    body: newText,
  });
}

export function saveNewComment(documentId: string, newCommentText: string) {
  return mmAxios.post(`/comments`, {
    documentId: documentId,
    body: newCommentText,
    creator: '1',
  });
}

export function saveNewReplyComment(
  documentId: string,
  newCommentText: string,
  parentCommentId: string
) {
  return mmAxios.post(`/comments`, {
    documentId: documentId,
    body: newCommentText,
    creator: '1',
    parentCommentId: parentCommentId,
  });
}
