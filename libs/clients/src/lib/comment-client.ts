import { getSession } from 'next-auth/react';
import { mmAxios } from './mm-axios';
import { AxiosResponse } from 'axios';
import { CommentNode } from '@mm/types';

export function deleteCommentById(commentId: string) {
  return mmAxios.delete(`/comments/${commentId}`);
}

export function getCommentsForDocument(
  documentId: string
): Promise<AxiosResponse<CommentNode[]>> {
  return mmAxios.get(`/comments/documents/${documentId}`);
}

export function editCommentById(commentId: string, newText: string) {
  return mmAxios.put(`/comments/${commentId}`, {
    body: newText,
  });
}

export async function saveNewComment(
  documentId: string,
  newCommentText: string
) {
  const session = await getSession();
  return mmAxios.post(`/comments`, {
    documentId: documentId,
    body: newCommentText,
    creator: session?.user.userId,
  });
}

export async function saveNewReplyComment(
  documentId: string,
  newCommentText: string,
  parentCommentId: string
) {
  const session = await getSession();
  return mmAxios.post(`/comments`, {
    documentId: documentId,
    body: newCommentText,
    creator: session?.user.userId,
    parentCommentId: parentCommentId,
  });
}
